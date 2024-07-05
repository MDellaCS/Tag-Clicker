import { initializeUpgrade, applyUpgrade } from './up1.js';
import { updateTags } from './utils.js';

let mainClicker = document.getElementById('mainClicker');
let clickCounter = document.getElementById('clickCounter');
let upgradePriceDisplay = document.getElementById('upgradePrice');

let cont = parseInt(localStorage.getItem("clicks")) || 0;
clickCounter.innerText = cont;

mainClicker.addEventListener('click', () => {
    clickCounter.innerText = ++cont;
    localStorage.setItem("clicks", cont);
});

initializeUpgrade(up1, upgradePriceDisplay, cont);

up1.addEventListener('click', () => {
    cont = applyUpgrade(cont, up1, upgradePriceDisplay);
    localStorage.setItem("clicks", cont);
    updateTags(mainClicker, upgradePriceDisplay, cont);
});