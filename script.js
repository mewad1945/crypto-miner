let miner = null;

document.getElementById('startBtn').addEventListener('click', () => {
    if (miner) return;

    // Se till att XMRigMiner är laddat
    if (typeof XMRigMiner === 'undefined') {
        alert("Minern har inte laddat färdigt ännu.");
        return;
    }

    document.getElementById('status').innerText = "Status: Startar...";

    // Konfiguration enligt projektets dokumentation
    miner = new XMRigMiner({
        pool: 'wss://wrxproxy.qzz.io', // Proxy krävs för WebSocket
        wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
        worker: 'web-miner-1',
        threads: navigator.hardwareConcurrency || 4
    });

    miner.start();
    document.getElementById('status').innerText = "Status: Aktiv";
    log("Mining igång!");
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner) {
        miner.stop();
        miner = null;
        document.getElementById('status').innerText = "Status: Avstängd";
        log("Mining stoppad.");
    }
});

function log(msg) {
    document.getElementById('logs').innerText += `\n${new Date().toLocaleTimeString()} - ${msg}`;
}
