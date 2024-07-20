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
        buildingElement.classList.add('building', 'enterRight');
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
}

export function applyBuilding(x, y, buildingConfig, key) {

    let melancias = parseFloat(localStorage.getItem("melancias")) || 0;
    let price = parseInt(localStorage.getItem(`${buildingConfig.name}Price`)) || buildingConfig.initialPrice;
    let qtd = parseInt(localStorage.getItem(`${buildingConfig.name}Qtd`)) || 0;

    let priceDisplay = document.getElementById("price" + key);
    let qtdDisplay = document.getElementById("qtd" + key);
    let velDisplay = document.getElementById("vel" + key);

    if (melancias >= price) {
        modifyMelancias(price, false);

        price = Math.ceil(price * buildingConfig.priceMultiplier);
        priceDisplay.innerText = formatNumber(price);
        localStorage.setItem(`${buildingConfig.name}Price`, price);

        qtdDisplay.innerText = ++qtd;
        localStorage.setItem(`${buildingConfig.name}Qtd`, qtd);

        let vel = (buildingConfig.productionRate * qtd).toFixed(2);
        velDisplay.innerText = vel;

        updateBuildingProduction(buildingConfig, qtd);

    } else {
        createFloatingText(x, y, "Faltam " + (price - melancias) + " melancias para comprar " + buildingConfig.name, "red");
    }
}

function updateBuildingProduction(buildingConfig, qtd, key) {
    let productionRate = buildingConfig.productionRate * qtd;
    setBuildingProduction(buildingConfig.name, productionRate);

    let velDisplay = document.getElementById("vel" + key);
    let vel = (buildingConfig.productionRate * qtd).toFixed(2);
    if (velDisplay) {
        velDisplay.innerText = vel;
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}