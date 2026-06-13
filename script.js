let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    if (logs) {
        logs.innerHTML += `<div>> ${msg}</div>`;
        logs.scrollTop = logs.scrollHeight;
    }
    console.log(msg);
}

// Vi letar efter biblioteket under alla möjliga namn
function checkReady() {
    // Prova olika namn som biblioteket kan ha registrerat sig som
    const lib = window.Module || window.XMRig || window.XMRigMiner || null;

    if (lib) {
        // Om lib är ett objekt, hitta minern
        const MinerClass = lib.XMRigMiner || lib;
        
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

let MinerClass = null;
window.onload = () => {
    const interval = setInterval(() => {
        MinerClass = checkReady();
        if (MinerClass) clearInterval(interval);
    }, 1000);
};

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Initierar...");
        // Använd den klass vi hittade
        miner = new MinerClass({
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
    }
});
