let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    logs.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logs.scrollTop = logs.scrollHeight;
}

// Kontrollera om webbläsaren stödjer kraven för RandomX
if (typeof SharedArrayBuffer === 'undefined') {
    log("KRITISKT FEL: Din webbläsare stödjer inte SharedArrayBuffer.");
    log("Detta krävs för RandomX-mining.");
}

function checkLoaded() {
    if (typeof XMRigMiner !== 'undefined') {
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        log("Minern laddad.");
    } else {
        log("Väntar på bibliotek...");
        setTimeout(checkLoaded, 1000);
    }
}
checkLoaded();

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Initierar...");
        miner = new XMRigMiner({
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            threads: navigator.hardwareConcurrency || 4
        });

        miner.start();
        document.getElementById('status').innerText = "Status: Aktiv";
        log("Mining startad med " + (navigator.hardwareConcurrency || 4) + " trådar.");
    } catch (err) {
        log("FEL vid start: " + err.message);
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
