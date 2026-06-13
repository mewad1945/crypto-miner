let miner = null;
let MinerClass = null;

function log(msg) {
    const logs = document.getElementById('logs');
    if (logs) {
        logs.innerHTML += `<div>> ${msg}</div>`;
        logs.scrollTop = logs.scrollHeight;
    }
    console.log(msg);
}

function checkReady() {
    const lib = window.Module || window.XMRig || window.XMRigMiner || null;

    if (lib) {
        MinerClass = lib.XMRigMiner || lib;
        
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        log("Minern är redo!");
        return MinerClass;
    } else {
        console.log("Söker efter bibliotek...");
        setTimeout(checkReady, 1000);
        return null;
    }
}

window.onload = () => {
    const interval = setInterval(() => {
        if (checkReady()) clearInterval(interval);
    }, 1000);
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

        // FIX: Kolla om MinerClass är en funktion (klass) eller ett objekt
        if (typeof MinerClass === 'function') {
            miner = new MinerClass(config);
        } else {
            // Om det är ett objekt, anta att den har en init- eller create-metod 
            // eller att MinerClass i sig är instansen
            miner = MinerClass;
        }

        miner.start();
        document.getElementById('status').innerText = "Status: Aktiv";
        log("Mining startad!");
    } catch (e) {
        log("FEL: " + e.message);
        console.error(e);
    }
});
