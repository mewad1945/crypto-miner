let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    if (logs) logs.innerHTML += `<div>> ${msg}</div>`;
    console.log(msg);
}

// När sidan laddas är biblioteket tillgängligt som klassen XMRigMiner
window.onload = () => {
    if (typeof XMRigMiner !== 'undefined') {
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        log("Minern är redo!");
    } else {
        log("FEL: XMRigMiner hittades inte. Kontrollera att xmrig-wasm.js är korrekt.");
    }
};

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Startar...");
        
        // Här skapar vi instansen enligt dokumentationen
        miner = new XMRigMiner({
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            threads: 4
        });

        miner.start();
        document.getElementById('status').innerText = "Status: Aktiv";
        log("Mining startad!");
    } catch (e) {
        log("FEL: " + e.message);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner) {
        miner.stop();
        log("Stoppad.");
    }
});
