import { createFloatingText } from './createFloatingText.js';
import { upgradeConfig } from './upgradeConfig.js';

export function loadUpgrades() {
    const upgradesContainer = document.getElementById('upgrades');
    const upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};

    for (let key in upgradeConfig) {
        const upgrade = upgradeConfig[key];

        if (!upgradesPurchased[upgrade.name]) {

            const upgradeElement = document.createElement('div');
            upgradeElement.classList.add('upgrade');
            upgradeElement.id = key;

            upgradeElement.innerHTML = `
                <img id="melanciazinha" src="images/melanciazinha.png"><span>${upgrade.price}</span><br />
                <img src="images/upgrades/${key}.png">
                <div class="tooltip">
                    <span class="h1">${upgrade.name}</span><br />
                    <span class="h2">${upgrade.description}</span>
                </div>
            `;

            upgradesContainer.appendChild(upgradeElement);

            document.getElementById(key).addEventListener('click', (event) => {
                applyUpgrade(event.clientX, event.clientY, upgrade, key);
            });
        }
    }
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