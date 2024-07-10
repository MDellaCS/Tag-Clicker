import { upgradeConfig } from './upgradeConfig.js';
import { initializeUpgrade, applyUpgrade } from './up1.js';

let melancia = document.getElementById('melancia');
let contador = document.getElementById('contador');

let melancias = parseInt(localStorage.getItem("melancias")) || 0;
if (melancias === 0) {
    localStorage.setItem("melancias", 0);
}
contador.innerText = melancias;

melancia.addEventListener('click', () => {
    melancias = parseInt(localStorage.getItem("melancias"));
    contador.innerText = (melancias += 300);; //++melancias; (melancias += 3000);
    localStorage.setItem("melancias", melancias);
});

for (let key in upgradeConfig) {
    initializeUpgrade(upgradeConfig[key]);
}

document.getElementById('up1').addEventListener('click', () => {
    applyUpgrade(upgradeConfig.upgrade1);
});

document.getElementById('up2').addEventListener('click', () => {
    applyUpgrade(upgradeConfig.upgrade2);
});

document.getElementById('up3').addEventListener('click', () => {
    applyUpgrade(upgradeConfig.upgrade3);
});

document.getElementById('up4').addEventListener('click', () => {
    applyUpgrade(upgradeConfig.upgrade4);
});