const miner = new XMRigWebMiner();
const logs = document.getElementById('logs');

function log(msg) {
    logs.innerHTML += `<div>> ${msg}</div>`;
    logs.scrollTop = logs.scrollHeight;
}

window.onload = async () => {
    try {
        await miner.init();
        document.getElementById('status').innerText = "Status: Startar...";
        
        await miner.start({
            pool: 'wss://wrxproxy.qzz.io',
            wallet: '44Vx2t4qo2F4pdYA7PFC94KkKSpC7QqBxhauq3JPTtv5Jpe2iqHnFqQCSozjm4KhH4YKSUaWPXVnjPrDcFKJv8f875FcZqp',
            threads: 2
        });

        document.getElementById('status').innerText = "Status: Aktiv";
        log("Mining påbörjad!");

        setInterval(() => {
            const stats = miner.getStats();
            document.getElementById('hashrate').innerText = `Hashrate: ${stats.hashrate.toFixed(1)} H/s`;
            document.getElementById('total').innerText = `Totalt minat: ${stats.totalHashes}`;
        }, 1000);

    } catch (e) {
        document.getElementById('status').innerText = "Status: Fel!";
        log("Fel: " + e.message);
    }
};

miner.addEventListener('share', () => log("Share hittad! 🎉"));
