const WALLET = "44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp";

let miner = null;
let statsInterval = null;

// Pool-statistik hämtning
async function updateStatsFromPool() {
    try {
        const res = await fetch(`https://api.supportxmr.com/miner/${WALLET}/stats`);
        const data = await res.json();
        document.getElementById('total-mined').innerText = (data.amtDue / 1e12).toFixed(6);
        document.getElementById('shares').innerText = data.totalHashes;
    } catch (e) {
        console.log("Kunde inte hämta pool-statistik");
    }
}

document.getElementById('startBtn').addEventListener('click', () => {
    // Kontrollera om Miner-klassen finns (laddats från biblioteket)
    if (typeof Miner === 'undefined') {
        log("Fel: Minern laddar fortfarande...");
        return;
    }

    if (miner) return;

    document.getElementById('status').innerText = "Aktiv";
    
    // Starta minern
    miner = new Miner('pool.supportxmr.com:443', WALLET, ''); 
    miner.start();

    // Uppdatera hashrate varannan sekund
    statsInterval = setInterval(() => {
        const hr = miner.getHashRate();
        document.getElementById('hashrate').innerText = hr ? hr.toFixed(2) : "0";
    }, 2000);
    
    updateStatsFromPool();
    setInterval(updateStatsFromPool, 60000);
    log("Mining startad.");
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner) {
        miner.stop();
        miner = null;
        clearInterval(statsInterval);
        document.getElementById('status').innerText = "Stoppad";
        document.getElementById('hashrate').innerText = "0";
        log("Mining stoppad.");
    }
});

function log(msg) {
    const logs = document.getElementById('logs');
    const time = new Date().toLocaleTimeString();
    logs.innerHTML += `<div>[${time}] ${msg}</div>`;
    logs.scrollTop = logs.scrollHeight;
}
