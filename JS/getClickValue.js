import { upgradeConfig } from './upgradeConfig.js';

export function getClickValue() {
    let clickValue = 1;
    let upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};

    for (let key in upgradeConfig) {
        if (upgradesPurchased[upgradeConfig[key].name]) {
            clickValue += (upgradeConfig[key].effect - 1) * upgradesPurchased[upgradeConfig[key].name];
        }
    }

    return clickValue;
}