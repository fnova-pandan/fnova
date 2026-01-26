const SPREAD = 0.99; // 1% spread (harga market dikali ini)

const exchanges = {
    BINANCE: { uid: "1179095398", usn: "FNOVA" },
    OKX: { uid: "775966960717997987", usn: "FNOVA" },
    GATE: { uid: "47713970", usn: "FNOVA" }
};

let liveRate = 0;

// Ambil kurs USDT live via proxy (anti CORS)
async function fetchRate(){
    try{
        const res = await fetch("https://api.allorigins.win/raw?url=https://api.binance.com/api/v3/ticker/price?symbol=USDTIDR");
        const data = await res.json();
        liveRate = parseFloat(data.price);
    }catch{
        liveRate = 15800; // fallback aman
    }
}

fetchRate();
setInterval(fetchRate,15000);

// Hitung fee %
function feePercent(idr){
    let p = 6 - Math.floor(idr/100000)*0.5;
    if(p < 2) p = 2;
    return p;
}

function format(n){
    return Math.floor(n).toLocaleString("id-ID");
}

// Update akun
document.getElementById("exchange").addEventListener("change",()=>{
    const ex = document.getElementById("exchange").value;
    const box = document.getElementById("accountBox");
    if(!ex) box.innerHTML = "UID: -<br>USN: -";
    else box.innerHTML = `UID: ${exchanges[ex].uid}<br>USN: ${exchanges[ex].usn}`;
});

// Hitung otomatis
document.getElementById("usdt").addEventListener("input",calculate);

function calculate(){
    const usdt = parseFloat(document.getElementById("usdt").value)||0;
    if(!usdt || !liveRate) return;

    const sellRate = liveRate * SPREAD;
    const gross = usdt * sellRate;
    const fee = gross * (feePercent(gross)/100);
    const net = gross - fee;

    document.getElementById("idrGross").innerText = format(gross);
    document.getElementById("fee").innerText = format(fee);
    document.getElementById("idrNet").innerText = format(net);
}

// Tombol chat
document.getElementById("orderBtn").onclick=()=>{
    window.open("https://www.facebook.com/share/1Brms3TNxm/");
};
