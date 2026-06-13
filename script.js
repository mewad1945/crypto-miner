let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    logs.innerHTML += `<div>> ${msg}</div>`;
    logs.scrollTop = logs.scrollHeight;
}

// Vänta på att XMRig-objektet ska bli tillgängligt
function init() {
    if (typeof XMRigMiner !== 'undefined') {
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        log("System redo.");
    } else {
        setTimeout(init, 500);
    }
}
init();

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Startar miner...");
        miner = new XMRigMiner({
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            worker_file: 'xmrig-worker.js', // Viktigt!
            threads: 4
        });

        miner.start();
        document.getElementById('status').innerText = "Status: Aktiv";
        log("Mining påbörjad!");
    } catch (e) {
        log("Fel: " + e.message);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner) {
        miner.stop();
        miner = null;
        document.getElementById('status').innerText = "Status: Stoppad";
        log("Mining stoppad.");
    }
});
