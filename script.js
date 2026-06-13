const WALLET = "44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp";

let miner = null;
let statsInterval = null;

async function updateStatsFromPool() {
    try {
        const res = await fetch(`https://api.supportxmr.com/miner/${WALLET}/stats`);
        const data = await res.json();
        document.getElementById('total-mined').innerText = (data.amtDue / 1e12).toFixed(6);
        document.getElementById('shares').innerText = data.totalHashes;
    } catch (e) {}
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (miner) return;

    document.getElementById('status').innerText = "Aktiv";
    miner = new Miner('pool.supportxmr.com:443', WALLET, ''); 
    miner.start();

    statsInterval = setInterval(() => {
        document.getElementById('hashrate').innerText = miner.getHashRate().toFixed(2);
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
    logs.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logs.scrollTop = logs.scrollHeight;
}
