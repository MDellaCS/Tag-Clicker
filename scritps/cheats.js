import { modifyMelancias } from './modifyMelancias.js';
import { upgradeConfig } from './upgradeConfig.js';
import { buildingConfig } from './buildingConfig.js';

export function loadCheats() {
    let give100k = document.getElementById('give100k');
    give100k.addEventListener('click', (event) => {
        modifyMelancias(100000, true, event.clientX, event.clientY);
    });



    let giveAllUpgrades = document.getElementById('giveAllUpgrades');
    giveAllUpgrades.addEventListener('click', () => {

        let upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};
        for (let key in upgradeConfig) {
            upgradesPurchased[upgradeConfig[key].name] = upgradesPurchased[upgradeConfig[key].name] || 1;
        }

        localStorage.setItem("upgradesPurchased", JSON.stringify(upgradesPurchased));

        location.reload();

    });

    let giveAllBuildings = document.getElementById('giveAllBuildings');
    giveAllBuildings.addEventListener('click', (event) => {

        for (let key in buildingConfig) {
            let currentQtd = parseInt(localStorage.getItem(buildingConfig[key].name + "Qtd")) || 0;
            localStorage.setItem(buildingConfig[key].name + "Qtd", currentQtd + 100);
        }

        location.reload();

    });
}
