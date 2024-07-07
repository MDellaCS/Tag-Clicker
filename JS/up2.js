export function initializeUpgrade2(priceDisplay, qtdDisplay) {

    console.log("\n\nCriando Up2\n");

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem("price2")) || 50;
    let qtd = parseInt(localStorage.getItem("qtd2")) || 0;

    priceDisplay.innerText = price;
    qtdDisplay.innerText = qtd;

    console.log("Melancias: " + melancias + "\nPreço: " + price + "\nQuantidade: " + qtd);
}

let upgrade2IntervalId;

export function applyUpgrade2(priceDisplay, qtdDisplay) {
    console.log("\n\nComprando Up2\n");

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem("price2")) || 50;
    let qtd = parseInt(localStorage.getItem("qtd2")) || 0;
    let contador = document.getElementById('contador');


    if (melancias >= price) {
        localStorage.setItem("melancias", (melancias -= price));
        contador.innerText = parseInt(localStorage.getItem("melancias"));
        price = Math.ceil(price * 1.2);
        priceDisplay.innerText = price;
        qtdDisplay.innerText = ++qtd;
        localStorage.setItem("price2", price);
        localStorage.setItem("qtd2", qtd);

        console.log("Melancias: " + melancias + "\nPreço: " + price + "\nQuantidade: " + qtd);

        if (upgrade2IntervalId) {
            clearInterval(upgrade2IntervalId);
        }

        upgrade2IntervalId = setInterval(() => {
            melancias = parseInt(localStorage.getItem("melancias"));
            localStorage.setItem("melancias", (melancias + 1));
            contador.innerText = parseInt(localStorage.getItem("melancias"));
        }, 3000 / qtd);

    } else {
        console.log("Melancias insuficientes para Up2");
    }
}