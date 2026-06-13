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
    // Söker efter bibliotekets huvudobjekt
    const lib = window.Module || window.XMRig || window.XMRigMiner || null;

    if (lib) {
        // Försöker hitta minern i biblioteket
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

        // Här försöker vi anropa biblioteket på alla kända sätt
        if (typeof MinerClass === 'function') {
            miner = new MinerClass(config);
        } else if (MinerClass.create && typeof MinerClass.create === 'function') {
            miner = MinerClass.create(config);
        } else if (MinerClass.init && typeof MinerClass.init === 'function') {
            miner = MinerClass.init(config);
        } else {
            // Om inget fungerar, logga hela objektet i konsolen
            console.error("DEBUG - MinerClass innehåll:", MinerClass);
            throw new Error("Hittade inget sätt att skapa minern. Kolla konsolen (F12) för detaljer.");
        }

        // Försök starta minern
        if (miner && typeof miner.start === 'function') {
            miner.start();
            document.getElementById('status').innerText = "Status: Aktiv";
            log("Mining startad!");
        } else {
            throw new Error("Miner-instansen saknar .start() metod.");
        }

    } catch (e) {
        log("FEL: " + e.message);
        console.error("Feldetaljer:", e);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner && typeof miner.stop === 'function') {
        miner.stop();
        document.getElementById('status').innerText = "Status: Stoppad";
        log("Mining stoppad.");
    } else {
        location.reload();
    }
});
