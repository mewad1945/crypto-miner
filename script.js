let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    const time = new Date().toLocaleTimeString();
    logs.innerHTML += `<div>[${time}] ${msg}</div>`;
    logs.scrollTop = logs.scrollHeight;
}

// Kontrollera om webbläsaren stödjer SharedArrayBuffer
if (typeof SharedArrayBuffer === 'undefined') {
    log("KRITISKT FEL: Webbläsaren/Hosting saknar 'Cross-Origin Isolation'.");
}

function init() {
    if (typeof XMRigMiner !== 'undefined') {
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        log("Minern laddad och redo.");
    } else {
        setTimeout(init, 1000);
    }
}
init();

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Initierar XMRig...");
        miner = new XMRigMiner({
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            worker_file: 'xmrig-worker.js',
            threads: navigator.hardwareConcurrency || 4
        });

        miner.start();
        document.getElementById('status').innerText = "Status: Aktiv";
        log("Mining påbörjad!");
    } catch (e) {
        log("FEL vid start: " + e.message);
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
