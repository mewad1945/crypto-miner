document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const statusDiv = document.getElementById('status');
    const logsDiv = document.getElementById('logs');

    function log(msg) {
        logsDiv.innerHTML += `<div>> ${msg}</div>`;
        logsDiv.scrollTop = logsDiv.scrollHeight;
        console.log(msg);
    }

    // Vänta på att Module ska bli tillgängligt
    const checkInterval = setInterval(() => {
        if (typeof Module !== 'undefined' && Module.XMRigMiner) {
            statusDiv.innerText = "Status: Redo";
            startBtn.disabled = false;
            log("Bibliotek laddat!");
            clearInterval(checkInterval);
        } else {
            console.log("Söker efter bibliotek...");
        }
    }, 1000);

    startBtn.addEventListener('click', () => {
        try {
            log("Initierar...");
            const miner = new Module.XMRigMiner({
                pool: 'wss://wrxproxy.qzz.io',
                wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
                worker: 'web-miner-1',
                threads: 4
            });
            miner.start();
            statusDiv.innerText = "Status: Aktiv";
            log("Mining startad!");
        } catch (e) {
            log("FEL: " + e.message);
        }
    });

    stopBtn.addEventListener('click', () => {
        location.reload(); // Enkelt sätt att stoppa
    });
});
