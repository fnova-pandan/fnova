const SPREAD = 0.015;

const exchanges = {
    BINANCE: { uid: "1179095398", usn: "FNOVA" },
    OKX: { uid: "775966960717997987", usn: "FNOVA" },
    "GATE IO": { uid: "47713970", usn: "FNOVA" },
    DSB: { uid: "DSB-UID", usn: "FNOVA" }
};

let liveRate = 0;

async function fetchRate() {
    try {
        const res = await fetch(
            "https://api.allorigins.win/raw?url=https://api.binance.com/api/v3/ticker/price?symbol=USDTIDR"
        );
        const data = await res.json();
        liveRate = parseFloat(data.price);
    } catch {
        liveRate = 15800;
    }
}

fetchRate();
setInterval(fetchRate, 10000);

function getFeePercent(idr) {
    let steps = Math.floor(idr / 100000);
    let fee = 6.5 - (steps * 0.5);
    if (fee < 2) fee = 2;
    return fee;
}

function updateExchange() {
    const ex = document.getElementById("exchange").value;
    const box = document.getElementById("accountBox");

    if (!ex || !exchanges[ex]) {
        box.innerHTML = `<div class="account-box">UID: -<br>USN: -</div>`;
        return;
    }

    box.innerHTML = `
        <div class="account-box">
            UID: ${exchanges[ex].uid}<br>
            USN: ${exchanges[ex].usn}
        </div>
    `;
}

function calculate() {
    const usdt = parseFloat(document.getElementById("usdt").value);
    if (!usdt || liveRate === 0) {
        document.getElementById("idrGross").innerText = "0";
        document.getElementById("fee").innerText = "0";
        document.getElementById("idrNet").innerText = "0";
        return;
    }

    const sellRate = liveRate * (1 + SPREAD);
    const gross = usdt * sellRate;

    const feePercent = getFeePercent(gross);
    const fee = gross * (feePercent / 100);
    const net = gross - fee;

    document.getElementById("idrGross").innerText = formatIDR(gross);
    document.getElementById("fee").innerText = formatIDR(fee);
    document.getElementById("idrNet").innerText = formatIDR(net);
}

function formatIDR(num) {
    return Math.floor(num).toLocaleString("id-ID");
}
