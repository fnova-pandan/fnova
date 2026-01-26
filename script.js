const accounts = {
    binance: { uid: "1179095398", usn: "FNOVA" },
    okx: { uid: "775966960717997987", usn: "FNOVA" },
    gate: { uid: "47713970", usn: "FNOVA" }
};

let marketRate = 0;

async function fetchRate() {
    try {
        const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=USDTIDR");
        const data = await res.json();
        marketRate = parseFloat(data.price);
    } catch {
        marketRate = 15800;
    }
}

fetchRate();
setInterval(fetchRate, 30000);

function calculate() {
    const usdt = parseFloat(document.getElementById("usdt").value || 0);
    if (!marketRate) return;

    let idr = usdt * marketRate;

    let feePercent = 6.5 - (idr / 100000 * 0.5);
    if (feePercent < 2) feePercent = 2; // batas minimum 2%

    let fee = idr * (feePercent / 100);
    let net = idr - fee;

    document.getElementById("idr").innerText = Math.floor(idr).toLocaleString();
    document.getElementById("tax").innerText = Math.floor(fee).toLocaleString();
    document.getElementById("net").innerText = Math.floor(net).toLocaleString();
}

document.getElementById("usdt").addEventListener("input", calculate);

document.getElementById("exchange").addEventListener("change", function () {
    const acc = accounts[this.value];
    if (acc) {
        document.getElementById("account").innerHTML =
            `<div class="acc-box">
                <div>UID: ${acc.uid}</div>
                <div>USN: ${acc.usn}</div>
             </div>`;
    } else {
        document.getElementById("account").innerHTML = "";
    }
});

document.getElementById("order").addEventListener("click", function () {
    window.open("https://www.facebook.com/share/1Brms3TNxm/");
});