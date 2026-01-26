// ===============================
// FNOVAA CV – LIVE RATE ENGINE
// ===============================

const SPREAD = 0.015; // 1.5% profit kamu

const exchanges = {
    BINANCE: { uid: "1179095398", usn: "FNOVA" },
    OKX: { uid: "775966960717997987", usn: "FNOVA" },
    "GATE IO": { uid: "47713970", usn: "FNOVA" },
    DSB: { uid: "DSB-UID", usn: "FNOVA" }
};

let liveRate = 0;

// ===============================
// Ambil kurs USDT live dari Binance
// ===============================
async function fetchRate() {
    try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=USDTIDR");
        const data = await res.json();
        liveRate = parseFloat(data.price);
    } catch (e) {
        liveRate = 15800; // fallback jika API mati
    }
}

fetchRate();
setInterval(fetchRate, 10000);

// ===============================
// Hitung fee dinamis
// ===============================
function getFeePercent(idr) {
    let steps = Math.floor(idr / 100000);
    let fee = 6.5 - (steps * 0.5);
    if (fee < 2) fee = 2;
    return fee;
}

// ===============================
// Update Exchange UID
// ===============================
function updateExchange() {
    const ex = document.getElementById("exchange").value;
    const box = document.getElementById("accountBox");

    if (!ex || !exchanges[ex]) {
        box.innerHTML = "";
        return;
    }

    box.innerHTML = `
        <div class="account-box">
            <div>UID: ${exchanges[ex].uid}</div>
            <div>USN: ${exchanges[ex].usn}</div>
        </div>
    `;
}

// ===============================
// Hitung konversi
// ===============================
function calculate() {
    const usdt = parseFloat(document.getElementById("usdt").value);
    if (!usdt || usdt <= 0) {
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
    document.getElementById("fee").innerText = formatIDR(fee) + ` (${feePercent.toFixed(1)}%)`;
    document.getElementById("idrNet").innerText = formatIDR(net);
}

// ===============================
// Format rupiah
// ===============================
function formatIDR(num) {
    return Math.floor(num).toLocaleString("id-ID");
}
