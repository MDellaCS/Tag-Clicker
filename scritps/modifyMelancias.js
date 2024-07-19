import { upgradeConfig } from './upgradeConfig.js';

export function modifyMelancias(amount, type) {

    let melancias = parseFloat(localStorage.getItem("melancias")) || 0;
    let upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};

    let multiplier = 1;

    for (let key in upgradeConfig) {
        if (upgradesPurchased[upgradeConfig[key].name] && upgradeConfig[key].type === "multiplier") {
            multiplier += upgradeConfig[key].effect;
            multiplier = parseFloat(multiplier.toFixed(3));
        }
    }

    let addAmount = amount * multiplier;

    if (type) {
        localStorage.setItem("melancias", (melancias + addAmount));
        document.getElementById('contador').innerText = parseInt(localStorage.getItem("melancias"));
        return addAmount.toFixed(0);
    } else {
        localStorage.setItem("melancias", (melancias - amount));
        document.getElementById('contador').innerText = parseInt(localStorage.getItem("melancias"));
    }
}