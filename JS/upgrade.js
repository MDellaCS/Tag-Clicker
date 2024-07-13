import { createFloatingText } from './createFloatingText.js';
import { upgradeConfig } from './upgradeConfig.js';

export function loadUpgrades() {
    const upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};  

    for (let key in upgradeConfig) {
        const upgrade = upgradeConfig[key];

        if (!upgradesPurchased[upgrade.name]) {
            initializeUpgrade(upgrade);

            document.getElementById(key).addEventListener('click', (event) => {
                applyUpgrade(event.clientX, event.clientY, upgrade, key);
            });
        }
    }
}

export function initializeUpgrade(upgradeConfig) {
    console.log(`\n\nCriando ${upgradeConfig.name}\n`);

    upgradeConfig.nameDisplay.innerText = upgradeConfig.name;
    upgradeConfig.descDisplay.innerText = upgradeConfig.description;
    upgradeConfig.priceDisplay.innerText = upgradeConfig.price;
}

export function applyUpgrade(x, y, upgradeConfig, key) {
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

        const upgradeElement = document.getElementById(key);
        if (upgradeElement) {
            upgradeElement.remove();
        }

    } else {
        createFloatingText(x, y, "Faltam " + (price - melancias) + " melancias para comprar " + upgradeConfig.name, "red");
    }
}