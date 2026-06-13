console.log("SCRIPT: Laddar...");

window.addEventListener('minerReady', () => {
    console.log("SCRIPT: Event mottaget!");
    document.getElementById('status').innerText = "Status: Redo";
    document.getElementById('startBtn').disabled = false;
});

document.getElementById('startBtn').addEventListener('click', () => {
    console.log("SCRIPT: Start-knapp klickad");
    try {
        if (typeof Module.start === 'function') {
            Module.start({
                pool: 'wss://wrxproxy.qzz.io',
                wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
                worker: 'web-miner-1',
                threads: 4
            });
            document.getElementById('status').innerText = "Status: Aktiv";
        } else {
            console.error("DEBUG: Module innehåll:", Module);
            alert("Ingen start-funktion. Kolla konsolen!");
        }
    } catch (e) {
        console.error("FEL:", e);
    }
});
