let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    if (logs) {
        logs.innerHTML += `<div>> ${msg}</div>`;
        logs.scrollTop = logs.scrollHeight;
    }
    console.log(msg);
}

// Vänta på att Module-objektet från xmrig-wasm.js ska bli redo
function checkReady() {
    // Biblioteket registrerar sig oftast som "Module"
    if (typeof Module !== 'undefined' && Module.XMRigMiner) {
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        log("Minern är redo!");
    } else {
        console.log("Väntar på att biblioteket ska laddas...");
        setTimeout(checkReady, 1000);
    }
}

// Starta kontrollen
window.onload = checkReady;

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Initierar...");
        
        // Skapa minern via Module
        miner = new Module.XMRigMiner({
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            threads: 4
        });

        miner.start();
        document.getElementById('status').innerText = "Status: Aktiv";
        log("Mining startad!");
    } catch (e) {
        log("FEL vid start: " + e.message);
        console.error(e);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner) {
        miner.stop();
        document.getElementById('status').innerText = "Status: Stoppad";
        log("Mining stoppad.");
    }
});
