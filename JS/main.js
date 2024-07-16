import { getClickValue } from './getClickValue.js';
import { createFloatingText } from './createFloatingText.js';

import { loadUpgrades } from './upgrade.js';
import { loadBuildings } from './building.js';
import { modifyMelancias } from './modifyMelancias.js';

let melancia = document.getElementById('melancia');
let contador = document.getElementById('contador');

let melancias = parseInt(localStorage.getItem("melancias")) || 0;
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
    }, 333);

    const clickValue = getClickValue();
    modifyMelancias(clickValue, true);

    createFloatingText(event.clientX, event.clientY, "+" + clickValue, "green");
});

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            contador.classList.add("shiver");
            setTimeout(() => {
                contador.classList.remove("shiver");
            }, 200);
        }
    }
});

const config = { subtree: true, characterData: true, childList: true };

observer.observe(contador, config);

loadUpgrades();
loadBuildings();

//reset
let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});