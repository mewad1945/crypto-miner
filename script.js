const SECRET = "DittHemligaLosenord123";
const WALLET = "44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp";

let miner = null;

document.getElementById('startBtn').addEventListener('click', async () => {
    if (document.getElementById('pass').value !== SECRET) return alert("Fel lösenord!");
    if (miner) return;

    log("Laddar miner-modul...");
    
    // Vi hämtar miner-koden som text och skapar en Blob (lokal fil i minnet)
    try {
        const response = await fetch('https://monero-ocean.github.io/xmrig-proxy/web-miner/miner.js');
        const code = await response.text();
        const blob = new Blob([code], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);

        miner = new Worker(workerUrl);

        miner.postMessage({
            action: 'start',
            pool: 'pool.supportxmr.com:443',
            wallet: WALLET,
            threads: navigator.hardwareConcurrency || 4
        });

        miner.onmessage = (e) => {
            if (e.data.type === 'hashrate') {
                document.getElementById('hashrate').innerText = e.data.value.toFixed(2);
            }
        };

        document.getElementById('status').innerText = "Aktiv";
        log("Mining igång!");
    } catch (err) {
        log("Fel: Kunde inte ladda minern. " + err.message);
    }
});

document.getElementById('stopBtn').addEventListener('click', () => {
    if (miner) {
        miner.terminate();
        miner = null;
        document.getElementById('status').innerText = "Stoppad";
        log("Mining stoppad.");
    }
});

function log(msg) {
    const logDiv = document.getElementById('logs');
    logDiv.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}
