const rate = 16566; // Live-ish rate, bisa kamu ganti manual

const accounts = {
    binance:{ uid:"1179095398", usn:"FNOVA" },
    okx:{ uid:"775966960717997987", usn:"FNOVA" },
    gate:{ uid:"47713970", usn:"FNOVA" }
};

const usdtInput = document.getElementById("usdt");
const exchange = document.getElementById("exchange");

function format(n){
    return Math.round(n).toLocaleString("id-ID");
}

function getFeePercent(idr){
    if(idr < 50000) return 10;

    let blocks = Math.floor((idr - 50000) / 50000);
    let fee = 8 - (blocks * 0.55);

    if(fee < 2) fee = 2;
    return fee;
}

function update(){
    let usdt = parseFloat(usdtInput.value);
    if(isNaN(usdt) || usdt <= 0){
        document.getElementById("kotor").innerText = 0;
        document.getElementById("fee").innerText = 0;
        document.getElementById("bersih").innerText = 0;
        return;
    }

    let idrKotor = usdt * rate;
    let feePercent = getFeePercent(idrKotor);
    let fee = idrKotor * feePercent / 100;
    let bersih = idrKotor - fee;

    document.getElementById("kotor").innerText = format(idrKotor);
    document.getElementById("fee").innerText = format(fee);
    document.getElementById("bersih").innerText = format(bersih);
}

usdtInput.addEventListener("input", update);

exchange.addEventListener("change", ()=>{
    let v = exchange.value;
    if(accounts[v]){
        document.getElementById("uid").innerText = accounts[v].uid;
        document.getElementById("usn").innerText = accounts[v].usn;
    }
});
