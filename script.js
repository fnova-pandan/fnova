document.addEventListener("DOMContentLoaded", ()=>{

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
let block = Math.ceil(usdt/2);
return 1200 + (block-1)*300;
}

function update(){
let usdt = parseFloat(usdtInput.value);

if(!usdt){
hasil.innerText="Rp 0";
feeEl.innerText="0";
kirim.innerText="0";
return;
}

let kotor = usdt * rate;
let fee = getFee(usdt);
let bersih = kotor - fee;

hasil.innerText = "Rp " + format(bersih);
feeEl.innerText = format(fee);
kirim.innerText = usdt;
}

// FIX EVENT HP
usdtInput.addEventListener("input", update);
usdtInput.addEventListener("keyup", update);
usdtInput.addEventListener("change", update);

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

});
