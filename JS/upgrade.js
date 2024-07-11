import { createFloatingText } from './createFloatingText.js';
import { upgradeConfig } from './upgradeConfig.js';

for (let key in upgradeConfig) {
    initializeUpgrade(upgradeConfig[key]);
}

document.getElementById('upgrade1').addEventListener('click', (event) => {
    applyUpgrade(event.clientX, event.clientY, upgradeConfig.upgrade1);
});

document.getElementById('upgrade2').addEventListener('click', (event) => {
    applyUpgrade(event.clientX, event.clientY, upgradeConfig.upgrade2);
});

document.getElementById('upgrade3').addEventListener('click', (event) => {
    applyUpgrade(event.clientX, event.clientY, upgradeConfig.upgrade3);
});

document.getElementById('upgrade4').addEventListener('click', (event) => {
    applyUpgrade(event.clientX, event.clientY, upgradeConfig.upgrade4);
});

export function initializeUpgrade(upgradeConfig) {
    console.log(`\n\nCriando ${upgradeConfig.name}\n`);

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = upgradeConfig.price;

    console.log("Melancias: " + melancias + "\nPreço: " + price);
}

export function applyUpgrade(x, y, upgradeConfig) {
    console.log(`\n\nComprando ${upgradeConfig.name}\n`);

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = upgradeConfig.price;
    let contador = document.getElementById('contador');
    let upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};

    if (melancias >= price) {
        localStorage.setItem("melancias", (melancias -= price));
        contador.innerText = parseInt(localStorage.getItem("melancias"));

        upgradesPurchased[upgradeConfig.name] = (upgradesPurchased[upgradeConfig.name] || 0) + 1;
        localStorage.setItem("upgradesPurchased", JSON.stringify(upgradesPurchased));

        createFloatingText(x, y, "Comprou " + upgradeConfig.name, "green");

    } else {
        createFloatingText(x, y, "Faltam " + (price - melancias) + " melancias para comprar " + upgradeConfig.name, "red");
    }
}