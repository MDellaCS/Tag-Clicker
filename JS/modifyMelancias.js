import { upgradeConfig } from './upgradeConfig.js';
import { createFloatingText } from './createFloatingText.js';

export function modifyMelancias(amount, type, x, y) {

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;
    let upgradesPurchased = JSON.parse(localStorage.getItem("upgradesPurchased")) || {};

    let multiplier = 1;

    for (let key in upgradeConfig) {
        if (upgradesPurchased[upgradeConfig[key].name] && upgradeConfig[key].type === "multiplier") {
            multiplier += upgradeConfig[key].effect;
            multiplier = parseFloat(multiplier.toFixed(3));
        }
    }

    let addAmount = Math.floor(amount * multiplier);

    createFloatingText(x, y, "+" + amount, "green");

    if (type) {
        localStorage.setItem("melancias", (melancias + addAmount));
    } else {
        localStorage.setItem("melancias", (melancias - amount));
    }

    document.getElementById('contador').innerText = parseInt(localStorage.getItem("melancias"));
}