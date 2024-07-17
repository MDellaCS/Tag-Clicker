import { getClickValue } from './getClickValue.js';

import { loadUpgrades } from './upgrade.js';
import { loadBuildings } from './building.js';
import { modifyMelancias } from './modifyMelancias.js';
import { createDialog } from './createDialog.js';

let melancia = document.getElementById('melancia');
let contador = document.getElementById('contador');

let melancias = parseFloat(localStorage.getItem("melancias")) || 0;
if (melancias === 0) {
    localStorage.setItem("melancias", 0);
}
contador.innerText = melancias;

let currentSize = 1;
let timeoutId;

melancia.addEventListener('click', (event) => {

    let rand = Math.random() * 20 - 10;

    currentSize *= 1.02;
    melancia.style.transform = `scale(${currentSize}) rotateZ(${rand}deg)`;


    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        melancia.style.transform = `scale(1) rotateZ(0deg)`;
        currentSize = 1;
    }, 500);

    const clickValue = getClickValue();
    modifyMelancias(clickValue, true, event.clientX, event.clientY);
});

let showModal = localStorage.getItem("showModal") || true;
if (showModal == true) {
    createDialog();
}

loadUpgrades();
loadBuildings();

//reset
let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
    localStorage.clear();
    location.reload();
});

//give100k
let give100k = document.getElementById('give100k');
give100k.addEventListener('click', (event) => {
    modifyMelancias(100000, true, event.clientX, event.clientY);
});