console.log("SCRIPT: Laddar...");

// Debug: Efter 3 sekunder, visa oss vad Module innehåller
setTimeout(() => {
    console.log("DEBUG: Module innehåll efter 3s:", window.Module);
    if (typeof window.Module.start === 'function') {
        console.log("SUCCES: Module.start hittades trots att eventet inte kördes!");
        document.getElementById('status').innerText = "Status: Redo (Manuell)";
        document.getElementById('startBtn').disabled = false;
    } else {
        console.log("FEL: Module saknar fortfarande .start() - är xmrig-wasm.js korrekt?");
    }
}, 3000);

document.getElementById('startBtn').addEventListener('click', () => {
    window.Module.start({
        pool: 'wss://wrxproxy.qzz.io',
        wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
        worker: 'web-miner-1',
        threads: 4
    });
});
