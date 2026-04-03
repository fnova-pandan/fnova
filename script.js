document.addEventListener("DOMContentLoaded", ()=>{

// ==========================
// CONFIG
// ==========================
const rate = 16600;

const accounts = {
"BINANCE":"1179095398",
"OKX":"775966960717997987",
"GATE IO":"47713970",
"TOKOCRYPTO":"5156565",
"MEXC":"06341119",
"BYBIT":"549353357",
"BITGET":"3931932762"
};

// ==========================
// ELEMENT
// ==========================
const usdtInput = document.getElementById("usdt");
const exchange = document.getElementById("exchange");
const hasil = document.getElementById("hasil");
const uidEl = document.getElementById("uid");

// (optional kalau masih ada di HTML, kalau tidak ada aman)
const feeEl = document.getElementById("fee");
const kirim = document.getElementById("kirim");

// ==========================
// FORMAT
// ==========================
function format(n){
return Math.round(n).toLocaleString("id-ID");
}

// ==========================
// FEE (sesuai logic kamu)
// ==========================
function getFee(usdt){
if(!usdt || usdt <= 0) return 0;
let block = Math.ceil(usdt/2);
return 1200 + (block-1)*300;
}

// ==========================
// ANIMASI COUNT UP
// ==========================
function animateValue(start, end, duration){
let startTime = null;

function step(timestamp){
if(!startTime) startTime = timestamp;

let progress = timestamp - startTime;
let percent = Math.min(progress / duration, 1);

let value = Math.floor(start + (end - start) * percent);

hasil.innerText = "Rp " + format(value);

if(progress < duration){
requestAnimationFrame(step);
}
}

requestAnimationFrame(step);
}

// ==========================
// UPDATE
// ==========================
function update(){
let usdt = parseFloat(usdtInput.value);

if(!usdt){
hasil.innerText="Rp 0";
if(feeEl) feeEl.innerText="0";
if(kirim) kirim.innerText="0";
return;
}

let kotor = usdt * rate;
let fee = getFee(usdt);
let bersih = kotor - fee;

// ambil nilai lama untuk animasi
let current = parseInt(hasil.innerText.replace(/\D/g,'')) || 0;

// jalankan animasi
animateValue(current, bersih, 400);

// optional update
if(feeEl) feeEl.innerText = format(fee);
if(kirim) kirim.innerText = usdt;
}

// ==========================
// EVENTS (ANTI BUG HP)
// ==========================
usdtInput.addEventListener("input", update);
usdtInput.addEventListener("keyup", update);
usdtInput.addEventListener("change", update);

// ==========================
// EXCHANGE UID
// ==========================
exchange.addEventListener("change", ()=>{
uidEl.innerText = accounts[exchange.value] || "-";
});

// ==========================
// BUTTON
// ==========================
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
Hasil: ${hasil.innerText}`;

navigator.clipboard.writeText(detail);

window.open("https://m.me/100077369057743","_blank");

});

});
