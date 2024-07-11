import { createFloatingText } from './createFloatingText.js';
import { buildingConfig } from './buildingConfig.js';

let intervals = {};

for (let key in buildingConfig) {
    initializeBuilding(buildingConfig[key]);
}

document.getElementById('building1').addEventListener('click', (event) => {
    applyBuilding(event.clientX, event.clientY, buildingConfig.building1);
});

document.getElementById('building2').addEventListener('click', (event) => {
    applyBuilding(event.clientX, event.clientY, buildingConfig.building2);
});

document.getElementById('building3').addEventListener('click', (event) => {
    applyBuilding(event.clientX, event.clientY, buildingConfig.building3);
});

document.getElementById('building4').addEventListener('click', (event) => {
    applyBuilding(event.clientX, event.clientY, buildingConfig.building4);
});

export function initializeBuilding(buildingConfig) {
    console.log(`\n\nCriando ${buildingConfig.name}\n`);

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem(`${buildingConfig.name}Price`)) || buildingConfig.initialPrice;
    let qtd = parseInt(localStorage.getItem(`${buildingConfig.name}Qtd`)) || 0;

    buildingConfig.nameDisplay.innerText = buildingConfig.name;
    buildingConfig.priceDisplay.innerText = price;
    buildingConfig.qtdDisplay.innerText = qtd;

    console.log("Melancias: " + melancias + "\nPreço: " + price + "\nQuantidade: " + qtd);
}

export function applyBuilding(x, y, buildingConfig) {
    console.log(`\n\nComprando ${buildingConfig.name}\n`);

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem(`${buildingConfig.name}Price`)) || buildingConfig.initialPrice;
    let qtd = parseInt(localStorage.getItem(`${buildingConfig.name}Qtd`)) || 0;
    let contador = document.getElementById('contador');

    if (melancias >= price) {
        localStorage.setItem("melancias", (melancias -= price));
        contador.innerText = parseInt(localStorage.getItem("melancias"));
        price = Math.ceil(price * buildingConfig.priceMultiplier);
        buildingConfig.priceDisplay.innerText = price;
        buildingConfig.qtdDisplay.innerText = ++qtd;
        localStorage.setItem(`${buildingConfig.name}Price`, price);
        localStorage.setItem(`${buildingConfig.name}Qtd`, qtd);

        console.log("Melancias: " + melancias + "\nPreço: " + price + "\nQuantidade: " + qtd);

        if (intervals[buildingConfig.name]) {
            clearInterval(intervals[buildingConfig.name]);
        }

        let vel = (1000 / (buildingConfig.productionRate / qtd)).toFixed(2);

        intervals[buildingConfig.name] = setInterval(() => {
            melancias = parseInt(localStorage.getItem("melancias"));
            localStorage.setItem("melancias", (melancias + qtd));
            contador.innerText = parseInt(localStorage.getItem("melancias"));
        }, buildingConfig.productionRate);

        buildingConfig.velDisplay.innerText = vel;

    } else {
        createFloatingText(x, y, "Faltam " + (price - melancias) + " melancias para comprar " + buildingConfig.name, "red");
    }
}