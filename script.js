document.addEventListener("DOMContentLoaded", ()=>{

const rate = 16605;

const accounts = {
    "BINANCE": { uid: "1179095398", usn: "FNOVA" },
    "OKX": { uid: "775966960717997987", usn: "FNOVA" },
    "GATE IO": { uid: "47713970", usn: "FNOVA" },
    "TOKOCRYPTO": { uid: "5156565", usn: "FNOVA" },
    "MEXC": { uid: "06341119", usn: "FNOVA" },
    "BYBIT": { uid: "549353357", usn: "FNOVA" },
    "BITGET": { uid: "3931932762", usn: "FNOVA" }
};

// ELEMENT
const usdtInput = document.getElementById("usdt");
const exchange = document.getElementById("exchange");

const hasil = document.getElementById("hasil");
const feeEl = document.getElementById("fee");
const uidEl = document.getElementById("uid");
const usnEl = document.getElementById("usn");
const kirim = document.getElementById("kirim");

const btn = document.getElementById("btn");

// SAFETY CHECK
if(!usdtInput || !exchange || !hasil){
    console.error("ELEMENT TIDAK DITEMUKAN");
    return;
}

// FORMAT
function format(n){
    return Math.round(n).toLocaleString("id-ID");
}

// FEE
function getFee(usdt){
    if(!usdt || usdt <= 0) return 0;
    let block = Math.ceil(usdt / 3);
    return 2000 + ((block - 1) * 250);
}

// UPDATE
function update(){
    const usdt = parseFloat(usdtInput.value);

    if(!usdt || usdt <= 0){
        hasil.innerText = "Rp 0";
        feeEl.innerText = "0";
        kirim.innerText = "0";
        return;
    }

    const kotor = usdt * rate;
    const fee = getFee(usdt);
    const bersih = kotor - fee;

    hasil.innerText = "Rp " + format(bersih);
    feeEl.innerText = format(fee);
    kirim.innerText = usdt;
}

// EVENT INPUT
usdtInput.addEventListener("input", update);

// EVENT EXCHANGE
exchange.addEventListener("change", ()=>{
    const ex = exchange.value;

    if(accounts[ex]){
        uidEl.innerText = accounts[ex].uid;
        if(usnEl) usnEl.innerText = accounts[ex].usn;
    } else {
        uidEl.innerText = "-";
        if(usnEl) usnEl.innerText = "-";
    }
});

// BUTTON
btn.addEventListener("click", ()=>{
    const usdt = usdtInput.value;
    const ex = exchange.value;

    if(!usdt || !ex){
        alert("Isi nominal & pilih exchange dulu");
        return;
    }

    const detail =
`Exchange: ${ex}
Nominal: ${usdt} USDT
Hasil: ${hasil.innerText}
Fee: Rp ${feeEl.innerText}`;

    navigator.clipboard.writeText(detail);
    window.open("https://m.me/100077369057743", "_blank");
});

});
    navigator.clipboard.writeText(detail);

    window.open("https://m.me/100077369057743", "_blank");

});

});Exchange: ${ex}
Nominal: ${usdt} USDT
Fee: Rp ${feeEl.innerText}
IDR Bersih: ${bersihEl.innerText}`;

    navigator.clipboard.writeText(detail);
    window.open("https://m.me/100077369057743", "_blank");

});

});
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


