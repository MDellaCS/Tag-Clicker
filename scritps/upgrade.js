import { createFloatingText } from './createFloatingText.js';
import { modifyMelancias } from './modifyMelancias.js';
import { upgradeConfig } from './upgradeConfig.js';
import { formatNumber } from './formatNumber.js';
import { applyBuildingBoost } from './building.js';

export function loadUpgrades() {

    const upgradesContainer = document.getElementById('upgrades');
    const upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};

    for (let key in upgradeConfig) {
        const upgrade = upgradeConfig[key];

        if (!upgradesPurchased[upgrade.name]) {

            const upgradeElement = document.createElement('div');
            upgradeElement.classList.add('upgrade', 'appear');
            upgradeElement.id = key;

            upgradeElement.innerHTML = `
                <img id="melanciazinha" src="images/melanciazinha.png"><span>${formatNumber(upgrade.price)}</span><br />
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
        } else {
            loadBoughtUpgrades(key);
        }
    }
}

export function applyUpgrade(x, y, upgradeConfig, key) {

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let price = upgradeConfig.price;
    let upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};

    if (melancias >= price) {
        modifyMelancias(price, false, x, y);

        upgradesPurchased[upgradeConfig.name] = (upgradesPurchased[upgradeConfig.name] || 0) + 1;
        localStorage.setItem("upgradesPurchased", JSON.stringify(upgradesPurchased));

        if (upgradeConfig.type === "buildingboost") {
            applyBuildingBoost(upgradeConfig.targetBuilding, upgradeConfig.effect);
        }

        loadBoughtUpgrades(key);

        const upgradeElement = document.getElementById(key);
        if (upgradeElement) {
            upgradeElement.classList.remove("appear");
            upgradeElement.classList.add("flush");
            setTimeout(() => {
                upgradeElement.remove();
            }, 500);
        }

    } else {
        createFloatingText(x, y, "Faltam " + (price - melancias).toFixed(0) + " melancias para comprar " + upgradeConfig.name, "red");
    }
}

function loadBoughtUpgrades(key) {

    const upgradesContainer = document.getElementById('boughtUpgrades');

    const upgrade = upgradeConfig[key];

    const upgradeElement = document.createElement('div');
    upgradeElement.classList.add('boughtUpgrade', 'appear');
    upgradeElement.id = key;

    upgradeElement.innerHTML = `
        <img id="upIMG" src="images/upgrades/${key}.png">

        <div class="tooltip">
            <p class="h1">${upgrade.name}</p><br />
            <p class="h2">${upgrade.description}</p>
            <p class="h3">${upgrade.text}</p>
        </div>
    `;

    upgradesContainer.appendChild(upgradeElement);

    if (!document.getElementById('boughtUpgradesTitle')) {
        const titleElement = document.createElement('div');
        titleElement.id = 'boughtUpgradesTitle';
        titleElement.classList.add('h2', 'appear');
        titleElement.innerText = 'Adquiridos:';
        upgradesContainer.prepend(titleElement);
    }
}