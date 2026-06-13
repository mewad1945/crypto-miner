console.log("SCRIPT: Script.js har laddats!");

document.addEventListener('DOMContentLoaded', () => {
    console.log("SCRIPT: DOM är redo.");
    const statusDiv = document.getElementById('status');
    const startBtn = document.getElementById('startBtn');

    window.addEventListener('moduleReady', () => {
        console.log("SCRIPT: Mottog moduleReady event!");
        statusDiv.innerText = "Status: Redo";
        startBtn.disabled = false;
    });

    startBtn.addEventListener('click', () => {
        console.log("SCRIPT: Knapp klickad!");
        try {
            if (typeof Module.start === 'function') {
                Module.start({
                    pool: 'wss://wrxproxy.qzz.io',
                    wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
                    worker: 'web-miner-1',
                    threads: 4
                });
                statusDiv.innerText = "Status: Aktiv";
            } else {
                console.error("FEL: Module.start saknas!");
                alert("Kunde inte starta: Ingen start-funktion hittades.");
            }
        } catch (e) {
            console.error("FEL:", e);
        }
    });
});
