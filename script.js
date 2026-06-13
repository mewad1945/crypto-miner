let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    if (logs) {
        logs.innerHTML += `<div>> ${msg}</div>`;
        logs.scrollTop = logs.scrollHeight;
    }
    console.log(msg);
}

function checkReady() {
    // Vänta tills WASM-runtime är helt initierad
    if (window.isMinerReady && typeof Module !== 'undefined') {
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        log("Minern är redo!");
        return true;
    }
    return false;
}

window.onload = () => {
    const interval = setInterval(() => {
        if (checkReady()) clearInterval(interval);
    }, 500);
};

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Initierar...");
        
        const config = {
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            worker_file: 'xmrig-worker.js',
            threads: 4
        };

        // I de flesta xmrig-wasm versioner är Module själva minern
        miner = Module; 
        
        // Starta med config
        if (typeof miner.start === 'function') {
            miner.start(config);
            document.getElementById('status').innerText = "Status: Aktiv";
            log("Mining startad!");
        } else {
            throw new Error("Module saknar .start() metod.");
        }

    } catch (e) {
        log("FEL: " + e.message);
        console.error("Feldetaljer:", e);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    location.reload();
});
