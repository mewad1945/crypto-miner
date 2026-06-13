let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    if (logs) {
        logs.innerHTML += `<div>> ${msg}</div>`;
        logs.scrollTop = logs.scrollHeight;
    }
    console.log(msg); // Logga även i konsolen för att se vad som händer
}

// En mer robust kontroll för att se om biblioteket laddats
function checkMinerReady() {
    console.log("Kontrollerar om XMRigMiner finns...");
    
    // Vi kollar både i global scope och i window-objektet
    if (typeof XMRigMiner !== 'undefined') {
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        log("Minern är laddad och redo!");
    } else {
        // Om den inte finns, logga varför (kanske är det under ett annat namn?)
        console.log("XMRigMiner hittades inte ännu, försöker igen...");
        setTimeout(checkMinerReady, 1000);
    }
}

// Starta kontrollen när sidan laddats
window.onload = checkMinerReady;

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Initierar...");
        miner = new XMRigMiner({
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            worker_file: 'xmrig-worker.js',
            threads: 4
        });

        miner.start();
        document.getElementById('status').innerText = "Status: Aktiv";
        log("Mining startad!");
    } catch (e) {
        log("FEL: " + e.message);
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
