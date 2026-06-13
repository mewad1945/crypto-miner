// Vi väntar på att sidan laddas
window.onload = async () => {
    console.log("SCRIPT: Initialiserar XMRigModule...");

    if (typeof XMRigModule === 'undefined') {
        console.error("FEL: XMRigModule hittades inte. Är filen xmrig-wasm.js laddad?");
        return;
    }

    try {
        // Vi skapar konfigurationen för minern
        const minerConfig = {
            onRuntimeInitialized: () => {
                console.log("Wasm Runtime redo!");
                document.getElementById('status').innerText = "Status: Redo";
                document.getElementById('startBtn').disabled = false;
            }
        };

        // Här anropar vi factory-funktionen från xmrig-wasm.js
        window.minerInstance = await XMRigModule(minerConfig);
        console.log("Minern har skapats!");

    } catch (err) {
        console.error("Kunde inte starta minern:", err);
    }
};

document.getElementById('startBtn').addEventListener('click', () => {
    if (window.minerInstance && typeof window.minerInstance.start === 'function') {
        window.minerInstance.start({
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            worker: 'web-miner-1',
            threads: 4
        });
        document.getElementById('status').innerText = "Status: Aktiv";
        console.log("Mining startad!");
    } else {
        console.error("Minern är inte redo än.");
    }
});
