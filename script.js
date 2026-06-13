let miner = null;

function log(msg) {
    const logs = document.getElementById('logs');
    if (logs) {
        logs.innerHTML += `<div>> ${msg}</div>`;
        logs.scrollTop = logs.scrollHeight;
    }
    console.log(msg);
}

// Vi väntar på att window.isMinerReady ska bli true
function checkReady() {
    if (window.isMinerReady && typeof Module !== 'undefined') {
        document.getElementById('status').innerText = "Status: Redo";
        document.getElementById('startBtn').disabled = false;
        return true;
    }
    return false;
}

const interval = setInterval(() => {
    if (checkReady()) {
        log("Minern är redo!");
        clearInterval(interval);
    } else {
        console.log("Söker efter bibliotek...");
    }
}, 1000);

document.getElementById('startBtn').addEventListener('click', () => {
    try {
        log("Initierar...");
        
        // Många Wasm-miners kräver att man anropar huvudobjektet direkt
        // Om Module har en start-metod kör vi den, annars kollar vi om den skapat en klass
        if (typeof Module.start === 'function') {
            Module.start({
                pool: 'wss://wrxproxy.qzz.io',
                wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
                worker: 'web-miner-1',
                threads: 4
            });
            log("Mining startad!");
        } else if (typeof window.XMRigMiner === 'function') {
            miner = new window.XMRigMiner({
                pool: 'wss://wrxproxy.qzz.io',
                wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
                worker: 'web-miner-1',
                threads: 4
            });
            miner.start();
            log("Mining startad!");
        } else {
            console.error("DEBUG - Module innehåll:", Module);
            throw new Error("Ingen start-metod hittades i Module.");
        }
        document.getElementById('status').innerText = "Status: Aktiv";
    } catch (e) {
        log("FEL: " + e.message);
        console.error("Feldetaljer:", e);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    location.reload();
});
