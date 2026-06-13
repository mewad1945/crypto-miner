const statusDiv = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const logsDiv = document.getElementById('logs');

function log(msg) {
    if (logsDiv) {
        logsDiv.innerHTML += `<div>> ${msg}</div>`;
        logsDiv.scrollTop = logsDiv.scrollHeight;
    }
    console.log(msg);
}

// Vänta på signalen från init-module.js
window.addEventListener('minerReady', () => {
    statusDiv.innerText = "Status: Redo";
    startBtn.disabled = false;
    log("Minern är redo!");
});

startBtn.addEventListener('click', () => {
    try {
        log("Initierar...");
        
        const config = {
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            threads: 4
        };

        // xmrig-wasm använder oftast Module.start direkt
        if (typeof Module.start === 'function') {
            Module.start(config);
            statusDiv.innerText = "Status: Aktiv";
            log("Mining startad!");
        } else {
            console.error("DEBUG - Module:", Module);
            throw new Error("Biblioteket laddades, men hittade ingen .start()-funktion.");
        }
    } catch (e) {
        log("FEL: " + e.message);
        console.error("Feldetaljer:", e);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    location.reload(); // Enklaste sättet att stoppa en Wasm-miner är att ladda om sidan
});
