document.addEventListener("DOMContentLoaded", ()=>{

// CONFIG
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

// ELEMENT
const usdtInput = document.getElementById("usdt");
const exchange = document.getElementById("exchange");
const hasil = document.getElementById("hasil");
const uidEl = document.getElementById("uid");

// FORMAT
function format(n){
return Math.round(n).toLocaleString("id-ID");
}

// FEE
function getFee(usdt){
if(!usdt || usdt <= 0) return 0;
let block = Math.ceil(usdt/2);
return 1350 + (block-1)*300;
}

// ANIMASI
let lastValue = 0;

function animateValue(end){
let start = lastValue;
let duration = 400;
let startTime = null;

function step(timestamp){
if(!startTime) startTime = timestamp;

let progress = timestamp - startTime;
let percent = Math.min(progress / duration, 1);

let value = Math.floor(start + (end - start) * percent);

hasil.innerText = "Rp " + format(value);

if(progress < duration){
requestAnimationFrame(step);
} else {
lastValue = end;
}
}

requestAnimationFrame(step);
}

// UPDATE
function update(){
let usdt = parseFloat(usdtInput.value);

if(!usdt){
hasil.innerText = "Rp 0";
lastValue = 0;
return;
}

let kotor = usdt * rate;
let fee = getFee(usdt);
let bersih = kotor - fee;

animateValue(bersih);
}

// EVENTS
usdtInput.addEventListener("input", update);
usdtInput.addEventListener("keyup", update);
usdtInput.addEventListener("change", update);

// UID
exchange.addEventListener("change", ()=>{
uidEl.innerText = accounts[exchange.value] || "-";
});

// BUTTON (SIMPLE & STABLE)
document.getElementById("btn").addEventListener("click", ()=>{

let usdt = usdtInput.value;
let ex = exchange.value;

if(!usdt || !ex){
alert("Isi nominal & pilih exchange dulu");
return;
}

window.location.href = "https://m.me/100077369057743";

});

});
