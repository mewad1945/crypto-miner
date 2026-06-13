document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const statusDiv = document.getElementById('status');
    const logsDiv = document.getElementById('logs');

    function log(msg) {
        if (logsDiv) {
            logsDiv.innerHTML += `<div>> ${msg}</div>`;
            logsDiv.scrollTop = logsDiv.scrollHeight;
        }
        console.log(msg);
    }

    // Vänta på att vår init-fil ska signalera att motorn är redo
    window.addEventListener('moduleReady', () => {
        statusDiv.innerText = "Status: Redo";
        startBtn.disabled = false;
        log("Bibliotek laddat och redo!");
    });

    startBtn.addEventListener('click', () => {
        try {
            log("Initierar...");
            
            // Försök starta minern via Module
            // Många xmrig-wasm versioner använder antingen Module.start() 
            // eller att de skapar en global XMRig-klass när Module är redo.
            
            const config = {
                pool: 'wss://wrxproxy.qzz.io',
                wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
                worker: 'web-miner-1',
                threads: 4
            };

            if (typeof Module.start === 'function') {
                Module.start(config);
            } else if (typeof window.XMRigMiner === 'function') {
                const miner = new window.XMRigMiner(config);
                miner.start();
            } else {
                throw new Error("Hittade ingen start-metod. Kontrollera filen xmrig-wasm.js.");
            }

            statusDiv.innerText = "Status: Aktiv";
            log("Mining startad!");
        } catch (e) {
            log("FEL: " + e.message);
            console.error(e);
        }
    });

    document.getElementById('stopBtn').addEventListener('click', () => {
        location.reload();
    });
});
