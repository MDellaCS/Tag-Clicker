let intervals = {};

export function initializeUpgrade(upgradeConfig) {
    console.log(`\n\nCriando ${upgradeConfig.name}\n`);

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem(`${upgradeConfig.name}Price`)) || upgradeConfig.initialPrice;
    let qtd = parseInt(localStorage.getItem(`${upgradeConfig.name}Qtd`)) || 0;

    upgradeConfig.nameDisplay.innerText = upgradeConfig.name;
    upgradeConfig.priceDisplay.innerText = price;
    upgradeConfig.qtdDisplay.innerText = qtd;

    console.log("Melancias: " + melancias + "\nPreço: " + price + "\nQuantidade: " + qtd);
}

export function applyUpgrade(upgradeConfig) {
    console.log(`\n\nComprando ${upgradeConfig.name}\n`);

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem(`${upgradeConfig.name}Price`)) || upgradeConfig.initialPrice;
    let qtd = parseInt(localStorage.getItem(`${upgradeConfig.name}Qtd`)) || 0;
    let contador = document.getElementById('contador');

    if (melancias >= price) {
        localStorage.setItem("melancias", (melancias -= price));
        contador.innerText = parseInt(localStorage.getItem("melancias"));
        price = Math.ceil(price * upgradeConfig.priceMultiplier);
        upgradeConfig.priceDisplay.innerText = price;
        upgradeConfig.qtdDisplay.innerText = ++qtd;
        localStorage.setItem(`${upgradeConfig.name}Price`, price);
        localStorage.setItem(`${upgradeConfig.name}Qtd`, qtd);

        console.log("Melancias: " + melancias + "\nPreço: " + price + "\nQuantidade: " + qtd);

        if (intervals[upgradeConfig.name]) {
            clearInterval(intervals[upgradeConfig.name]);
        }

        let vel = (1000 / (upgradeConfig.productionRate / qtd)).toFixed(2);

        intervals[upgradeConfig.name] = setInterval(() => {
            melancias = parseInt(localStorage.getItem("melancias"));
            localStorage.setItem("melancias", (melancias + qtd));
            contador.innerText = parseInt(localStorage.getItem("melancias"));
        }, upgradeConfig.productionRate);

        upgradeConfig.velDisplay.innerText = vel;

    } else {
        console.log(`Melancias insuficientes para ${upgradeConfig.name}`);
    }
}