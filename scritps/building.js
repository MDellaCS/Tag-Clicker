import { createFloatingText } from './createFloatingText.js';
import { buildingConfig } from './buildingConfig.js';
import { modifyMelancias } from './modifyMelancias.js';
import { setBuildingProduction } from './buildingInterval.js';
import { formatNumber } from './formatNumber.js';

let intervals = {};

export async function loadBuildings() {
    const buildingsContainer = document.getElementById('buildings');

    for (let key in buildingConfig) {
        await delay(75);
        const building = buildingConfig[key];

        let price = parseInt(localStorage.getItem(`${building.name}Price`)) || building.initialPrice;
        let qtd = parseInt(localStorage.getItem(`${building.name}Qtd`)) || 0;

        const buildingElement = document.createElement('div');
        buildingElement.classList.add('building', 'enterRight',  'disabled');
        buildingElement.style.position = "relative";
        buildingElement.id = key;

        buildingElement.innerHTML = `
                <img class="buildingIMG" src="images/buildings/${key}.png">
                <span class="buildingQTD" id="qtd${key}">${qtd}</span>${building.name}<br />
                <img id="melanciazinha" src="images/melancia.png"><span id="price${key}">${formatNumber(price)}</span><br />
                <span id="vel${key}">0</span> mps
        `;

        buildingsContainer.appendChild(buildingElement);

        document.getElementById(key).addEventListener('click', (event) => {
            applyBuilding(event.clientX, event.clientY, building, key);
        });

        if (qtd > 0) {
            updateBuildingProduction(building, qtd, key);
        }
    }
    setInterval(checkAffordableBuildings, 100);
}

export function applyBuilding(x, y, buildingConfig, key) {

    let melancias = parseFloat(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem(`${buildingConfig.name}Price`)) || buildingConfig.initialPrice;
    let qtd = parseInt(localStorage.getItem(`${buildingConfig.name}Qtd`)) || 0;

    let priceDisplay = document.getElementById("price" + key);
    let qtdDisplay = document.getElementById("qtd" + key);

    if (melancias >= price) {
        modifyMelancias(price, false);

        price = Math.ceil(price * buildingConfig.priceMultiplier);
        priceDisplay.innerText = formatNumber(price);
        localStorage.setItem(`${buildingConfig.name}Price`, price);

        qtdDisplay.innerText = ++qtd;
        localStorage.setItem(`${buildingConfig.name}Qtd`, qtd);

        updateBuildingProduction(buildingConfig, qtd, key);

    }
}

function updateBuildingProduction(buildingConfig, qtd, key) {
    let buildingsBoost = JSON.parse(localStorage.getItem("buildingsBoost")) || {};
    let boost = buildingsBoost[buildingConfig.name] || 1;

    let productionRate = buildingConfig.productionRate * qtd * boost;
    setBuildingProduction(buildingConfig.name, productionRate);

    let velDisplay = document.getElementById("vel" + key);
    if (velDisplay) {
        velDisplay.innerText = productionRate.toFixed(2);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function applyBuildingBoost(buildingName, effect) {
    let buildingsBoost = JSON.parse(localStorage.getItem("buildingsBoost")) || {};

    // Initialize the boost for the building if it doesn't exist
    if (!buildingsBoost[buildingName]) {
        buildingsBoost[buildingName] = 1;
    }

    // Apply the boost
    buildingsBoost[buildingName] *= effect;

    // Save back to localStorage
    localStorage.setItem("buildingsBoost", JSON.stringify(buildingsBoost));

    // Update the production display
    let key = Object.keys(buildingConfig).find(k => buildingConfig[k].name === buildingName);
    if (key) {
        let qtd = parseInt(localStorage.getItem(`${buildingName}Qtd`)) || 0;
        updateBuildingProduction(buildingConfig[key], qtd, key);
    }
}

function checkAffordableBuildings() {
    let melancias = parseFloat(localStorage.getItem("melancias")) || 0;
    for (let key in buildingConfig) {
        let price = parseInt(localStorage.getItem(`${buildingConfig[key].name}Price`)) || buildingConfig[key].initialPrice;
        let buildingElement = document.getElementById(key);
        if (buildingElement) {
            if (melancias >= price) {
                buildingElement.classList.remove('disabled');
            } else {
                buildingElement.classList.add('disabled');
            }
        }
    }
}