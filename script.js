const SECRET = "DittHemligaLosenord123"; // KOM IHÅG ATT ÄNDRA DETTA!
const WALLET = "44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp";

let miner = null;

// Funktion för att uppdatera statistik från poolen
async function updateStatsFromPool() {
    try {
        const response = await fetch(`https://api.supportxmr.com/miner/${WALLET}/stats`);
        const data = await response.json();
        // Uppdatera värden på sidan
        document.getElementById('total-mined').innerText = (data.amtDue / 1000000000000).toFixed(6);
        document.getElementById('shares').innerText = data.totalHashes;
    } catch (e) {
        console.log("Kunde inte hämta pool-statistik, försöker igen senare.");
    }
}

// Start-knapp logik
document.getElementById('startBtn').addEventListener('click', () => {
    const passwordInput = document.getElementById('pass').value;
    
    if (passwordInput !== SECRET) {
        alert("Fel lösenord!");
        return;
    }

    if (miner) {
        log("Minern körs redan.");
        return;
    }

    startMining();
});

// Stopp-knapp logik
document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner) {
        miner.terminate();
        miner = null;
        document.getElementById('status').innerText = "Stoppad";
        document.getElementById('hashrate').innerText = "0";
        log("Mining stoppad.");
    }
});

function startMining() {
    document.getElementById('status').innerText = "Startar...";
    log("Ansluter till pool...");

    // Vi använder en beprövad miner-worker
    // Om du får fel i konsolen (F12), testa att byta ut URL:en nedan
    miner = new Worker('https://monero-ocean.github.io/xmrig-proxy/web-miner/miner.js');

    miner.postMessage({
        action: 'start',
        pool: 'pool.supportxmr.com:443', // Port 443 är mer tillförlitlig än 3333
        wallet: WALLET,
        threads: navigator.hardwareConcurrency || 4
    });

    miner.onmessage = (e) => {
        if (e.data.type === 'hashrate') {
            document.getElementById('hashrate').innerText = e.data.value.toFixed(2);
        } else if (e.data.type === 'message') {
            log(e.data.message);
        }
    };

    document.getElementById('status').innerText = "Aktiv";
    log("Mining igång!");
    
    // Starta hämtning av pool-statistik
    updateStatsFromPool();
    setInterval(updateStatsFromPool, 60000); 
}

function log(msg) {
    const logDiv = document.getElementById('logs');
    const timestamp = new Date().toLocaleTimeString();
    logDiv.innerHTML += `<div>[${timestamp}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}
