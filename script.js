const rate = 16580; // ubah ini kalau mau update kurs

const accounts = {
    "BINANCE": { uid:"1179095398", usn:"FNOVA" },
    "OKX": { uid:"775966960717997987", usn:"FNOVA" },
    "GATE IO": { uid:"47713970", usn:"FNOVA" }
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
    const usdt = parseFloat(usdtInput.value);
    if(!usdt || usdt <= 0){
        document.getElementById("kotor").innerText = "0";
        document.getElementById("fee").innerText = "0";
        document.getElementById("bersih").innerText = "0";
        return;
    }

    const kotor = usdt * rate;
    const feePercent = getFeePercent(kotor);
    const fee = kotor * feePercent / 100;
    const bersih = kotor - fee;

    document.getElementById("kotor").innerText = format(kotor);
    document.getElementById("fee").innerText = format(fee);
    document.getElementById("bersih").innerText = format(bersih);
}

usdtInput.addEventListener("input", update);

exchange.addEventListener("change", ()=>{
    const ex = exchange.value;
    if(accounts[ex]){
        document.getElementById("uid").innerText = accounts[ex].uid;
        document.getElementById("usn").innerText = accounts[ex].usn;
    }
});

document.getElementById("btn").addEventListener("click", ()=>{
    const usdt = usdtInput.value;
    const ex = exchange.value;
    const kotor = document.getElementById("kotor").innerText;
    const fee = document.getElementById("fee").innerText;
    const bersih = document.getElementById("bersih").innerText;

    if(!usdt || !ex){
        alert("Isi nominal dan pilih exchange dulu");
        return;
    }

    const msg = 
`Halo FNOVAA CV 👋

Saya sudah transfer USDT 💸

📌 Detail Transaksi:
🏦 Exchange: ${ex}
💲 Nominal: ${usdt} USDT

💰 IDR Kotor: Rp ${kotor}
🧾 Fee: Rp ${fee}
✅ IDR Bersih: Rp ${bersih}

Mohon dicek ya 🙏`;

    const url = "https://m.me/100077369057743?text=" + encodeURIComponent(msg);
    window.open(url, "_blank");
});
