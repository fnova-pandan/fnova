// ==========================
// CONFIG
// ==========================
const rate = 16600;

const accounts = {
    "BINANCE": { uid: "1179095398", usn: "FNOVA" },
    "OKX": { uid: "775966960717997987", usn: "FNOVA" },
    "GATE IO": { uid: "47713970", usn: "FNOVA" },
    "TOKOCRYPTO": { uid: "5156565", usn: "FNOVA" },
    "MEXC": { uid: "06341119", usn: "FNOVA" },
    "BYBIT": { uid: "549353357", usn: "FNOVA" },
    "BITGET": { uid: "3931932762", usn: "FNOVA" }
};

// ==========================
// ELEMENT
// ==========================
const usdtInput = document.getElementById("usdt");
const exchange = document.getElementById("exchange");

const bersihEl = document.getElementById("bersih");
const feeEl = document.getElementById("fee");
const uidEl = document.getElementById("uid");
const usnEl = document.getElementById("usn");
const usdtText = document.getElementById("usdtText");

const btn = document.getElementById("btn");

// ==========================
// FORMAT
// ==========================
function format(n){
    return Math.round(n).toLocaleString("id-ID");
}

// ==========================
// FEE SYSTEM (250 per 3 USDT)
// ==========================
function getFee(usdt){

    if(!usdt || usdt <= 0) return 0;

    let block = Math.ceil(usdt / 3);

    let fee = 2000 + ((block - 1) * 250);

    return fee;
}

// ==========================
// CALCULATE
// ==========================
function update(){

    const usdt = parseFloat(usdtInput.value);

    if(!usdt || usdt <= 0){
        bersihEl.innerText = "0";
        feeEl.innerText = "0";
        usdtText.innerText = "0";
        return;
    }

    const kotor = usdt * rate;
    const fee = getFee(usdt);
    const bersih = kotor - fee;

    bersihEl.innerText = format(bersih);
    feeEl.innerText = format(fee);
    usdtText.innerText = usdt;
}

// ==========================
// EVENTS
// ==========================
usdtInput.addEventListener("input", update);

exchange.addEventListener("change", ()=>{

    const ex = exchange.value;

    if(accounts[ex]){
        uidEl.innerText = accounts[ex].uid;
        usnEl.innerText = accounts[ex].usn;
    } else {
        uidEl.innerText = "-";
        usnEl.innerText = "-";
    }

});

// ==========================
// BUTTON → COPY DETAIL + OPEN FB
// ==========================
btn.addEventListener("click", ()=>{

    const usdt = usdtInput.value;
    const ex = exchange.value;

    if(!usdt || !ex){
        alert("Isi nominal & pilih exchange dulu");
        return;
    }

    const fee = feeEl.innerText;
    const bersih = bersihEl.innerText;

    const detail =
`Halo FNOVAA CV 👋

Saya sudah transfer USDT 💸

📌 Detail:
🏦 Exchange: ${ex}
💲 Nominal: ${usdt} USDT
🧾 Fee: Rp ${fee}
✅ IDR Bersih: Rp ${bersih}

Mohon dicek ya 🙏`;

    navigator.clipboard.writeText(detail);

    window.open("https://m.me/100077369057743", "_blank");

});    const detail =
`Halo FNOVAA CV 👋

Saya sudah transfer USDT

Exchange: ${ex}
Nominal: ${usdt} USDT
Fee: Rp ${fee}
IDR Bersih: Rp ${bersih}`;

    navigator.clipboard.writeText(detail);

    window.open("https://m.me/100077369057743", "_blank");

});


