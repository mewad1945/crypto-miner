const SECRET = "DittHemligaLosenord123"; // ÄNDRA DETTA
const WALLET = "44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp";

let miner = null;

// Hämta statistik från poolen
async function updateStatsFromPool() {
    try {
        const response = await fetch(`https://api.supportxmr.com/miner/${WALLET}/stats`);
        const data = await response.json();
        document.getElementById('total-mined').innerText = (data.amtDue / 1000000000000).toFixed(6);
        document.getElementById('shares').innerText = data.totalHashes;
    } catch (e) { console.log("Statistik ej tillgänglig"); }
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (document.getElementById('pass').value !== SECRET) return alert("Fel lösenord!");
    if (miner) return;
    
    document.getElementById('status').innerText = "Aktiv";
    log("Initierar...");

    miner = new Worker('https://cdn.jsdelivr.net/npm/xmrig-wasm/dist/miner.js');
    miner.postMessage({
        action: 'start',
        pool: 'pool.supportxmr.com:3333',
        wallet: WALLET,
        threads: navigator.hardwareConcurrency || 4
    });

    miner.onmessage = (e) => {
        if (e.data.type === 'hashrate') document.getElementById('hashrate').innerText = e.data.value.toFixed(2);
    };

    updateStatsFromPool();
    setInterval(updateStatsFromPool, 60000); // Uppdatera varje minut
    log("Mining igång på " + (navigator.hardwareConcurrency || 4) + " trådar.");
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner) {
        miner.terminate();
        miner = null;
        document.getElementById('status').innerText = "Stoppad";
        log("Mining stoppad.");
    }
});

function log(msg) {
    const logDiv = document.getElementById('logs');
    logDiv.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}
