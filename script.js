alert("JS KELOAD");
document.addEventListener("DOMContentLoaded", ()=>{

const rate = 16550;

const accounts = {
"BINANCE":"1179095398",
"OKX":"775966960717997987",
"GATE IO":"47713970",
"TOKOCRYPTO":"5156565",
"MEXC":"06341119",
"BYBIT":"549353357",
"BITGET":"3931932762"
};

const usdtInput = document.getElementById("usdt");
const exchange = document.getElementById("exchange");
const hasil = document.getElementById("hasil");
const feeEl = document.getElementById("fee");
const uidEl = document.getElementById("uid");
const kirim = document.getElementById("kirim");

function format(n){
return Math.round(n).toLocaleString("id-ID");
}

function getFee(usdt){
let block = Math.ceil(usdt/3);
return 2000 + (block-1)*250;
}

// 🔥 UPDATE (NO ANIMATION → BIAR PASTI JALAN DULU)
function update(){
let usdt = parseFloat(usdtInput.value);

if(!usdt){
hasil.innerText = "Rp 0";
feeEl.innerText = "0";
kirim.innerText = "0";
return;
}

let kotor = usdt * rate;
let fee = getFee(usdt);
let bersih = kotor - fee;

hasil.innerText = "Rp " + format(bersih);
feeEl.innerText = format(fee);
kirim.innerText = usdt;
}

usdt.addEventListener("input", update);
usdt.addEventListener("keyup", update);
usdt.addEventListener("change", update);

exchange.addEventListener("change", ()=>{
uidEl.innerText = accounts[exchange.value] || "-";
});

document.getElementById("btn").addEventListener("click", ()=>{

let usdt = usdtInput.value;
let ex = exchange.value;

if(!usdt || !ex){
alert("Isi nominal & pilih exchange dulu");
return;
}

let detail =
`Exchange: ${ex}
Nominal: ${usdt} USDT
Hasil: ${hasil.innerText}
Fee: Rp ${feeEl.innerText}`;

navigator.clipboard.writeText(detail);
window.open("https://m.me/100077369057743","_blank");

});

});IDR Bersih: ${bersihEl.innerText}`;

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


