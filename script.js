const rate = 16500;

const accounts = {
    "BINANCE": { uid: "1179095398", usn: "FNOVA" },
    "OKX": { uid: "775966960717997987", usn: "FNOVA" },
    "GATE IO": { uid: "47713970", usn: "FNOVA" }
};

const usdtInput = document.getElementById("usdt");
const exchange = document.getElementById("exchange");
const kotorEl = document.getElementById("kotor");
const feeEl = document.getElementById("fee");
const bersihEl = document.getElementById("bersih");
const uidEl = document.getElementById("uid");
const usnEl = document.getElementById("usn");
const btn = document.getElementById("btn");

function format(n){
    return Math.round(n).toLocaleString("id-ID");
}

// Fee kelipatan 3 USDT
function getFee(usdt){
    if(usdt <= 3) return 2000;

    let tier = Math.floor((usdt - 1) / 3);
    return 2000 + (tier * 500);
}

function update(){
    const usdt = parseFloat(usdtInput.value);

    if(!usdt || usdt <= 0){
        kotorEl.innerText = "0";
        feeEl.innerText = "0";
        bersihEl.innerText = "0";
        return;
    }

    const kotor = usdt * rate;
    const fee = getFee(usdt);
    const bersih = kotor - fee;

    kotorEl.innerText = format(kotor);
    feeEl.innerText = format(fee);
    bersihEl.innerText = format(bersih);
}

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

btn.addEventListener("click", ()=>{
    const usdt = usdtInput.value;
    const ex = exchange.value;

    if(!usdt || !ex){
        alert("Isi nominal dan pilih exchange dulu");
        return;
    }

    const detail =
`Exchange: ${ex}
Nominal: ${usdt} USDT
IDR Kotor: Rp ${kotorEl.innerText}
Fee: Rp ${feeEl.innerText}
IDR Bersih: Rp ${bersihEl.innerText}`;

    const ok = confirm("Detail transaksi:\n\n" + detail + "\n\nKlik OK untuk copy & buka Messenger.");

    if(!ok) return;

    const temp = document.createElement("textarea");
    temp.value = detail;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);

    window.open("https://m.me/100077369057743", "_blank");
});
