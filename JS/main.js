import { getClickValue } from './getClickValue.js';
import { createFloatingText } from './createFloatingText.js';

let melancia = document.getElementById('melancia');
let contador = document.getElementById('contador');

let melancias = parseInt(localStorage.getItem("melancias")) || 0;
if (melancias === 0) {
    localStorage.setItem("melancias", 0);
}
contador.innerText = melancias;

melancia.addEventListener('click', (event) => {
    melancias = parseInt(localStorage.getItem("melancias"));
    const clickValue = getClickValue();
    contador.innerText = melancias += clickValue;
    localStorage.setItem("melancias", melancias);

    createFloatingText(event.clientX, event.clientY, "+"+clickValue, "green");
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



