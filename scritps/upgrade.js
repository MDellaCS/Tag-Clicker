import { createFloatingText } from './createFloatingText.js';
import { modifyMelancias } from './modifyMelancias.js';
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
                <img id="upIMG" src="images/upgrades/${key}.png">

                <div class="tooltip">
                    <p class="h1">${upgrade.name}</p><br />
                    <p class="h2">${upgrade.description}</p>
                    <p class="h3">${upgrade.text}</p>
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

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = upgradeConfig.price;
    let contador = document.getElementById('contador');
    let upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};

    if (melancias >= price) {
        modifyMelancias(price, false, x, y);

        upgradesPurchased[upgradeConfig.name] = (upgradesPurchased[upgradeConfig.name] || 0) + 1;
        localStorage.setItem("upgradesPurchased", JSON.stringify(upgradesPurchased));

        const upgradeElement = document.getElementById(key);
        if (upgradeElement) {
            upgradeElement.classList.add("flush");
            setTimeout(() => {
                upgradeElement.remove();
            }, 500);
        }

    } else {
        createFloatingText(x, y, "Faltam " + (price - melancias) + " melancias para comprar " + upgradeConfig.name, "red");
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}