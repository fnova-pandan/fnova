let liveRate = 0;

const accounts = {
    binance:{uid:"1179095398",usn:"FNOVA"},
    okx:{uid:"775966960717997987",usn:"FNOVA"},
    gate:{uid:"47713970",usn:"FNOVA"}
};

async function fetchRate(){
    try{
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=idr");
        const data = await res.json();
        liveRate = data.tether.idr;
    }catch{
        liveRate = 15800;
    }
}

fetchRate();

document.getElementById("usdt").addEventListener("input",hitung);
document.getElementById("exchange").addEventListener("change",updateAcc);

function updateAcc(){
    const ex = exchange.value;
    if(accounts[ex]){
        uid.textContent = accounts[ex].uid;
        usn.textContent = accounts[ex].usn;
    }
}

function hitung(){
    const usdt = parseFloat(usdtInput.value || 0);
    if(liveRate === 0) return;

    let kotor = usdt * liveRate;

    kotor = kotor * 0.99; // spread 1%

    let feePercent = 6 - Math.floor(kotor / 100000) * 0.5;
    if(feePercent < 2) feePercent = 2;

    let fee = kotor * (feePercent / 100);
    let bersih = kotor - fee;

    kotorEl.textContent = Math.round(kotor).toLocaleString("id-ID");
    feeEl.textContent = Math.round(fee).toLocaleString("id-ID");
    bersihEl.textContent = Math.round(bersih).toLocaleString("id-ID");
}

const usdtInput = document.getElementById("usdt");
const kotorEl = document.getElementById("kotor");
const feeEl = document.getElementById("fee");
const bersihEl = document.getElementById("bersih");
const exchange = document.getElementById("exchange");
const uid = document.getElementById("uid");
const usn = document.getElementById("usn");

function goChat(){
    window.open("https://www.facebook.com/share/1Brms3TNxm/");
}
