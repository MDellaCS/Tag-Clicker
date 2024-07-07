import { applyUpgrade1, initializeUpgrade1 } from "./up1.js";
import { applyUpgrade2, initializeUpgrade2 } from "./up2.js";

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

let up1 = document.getElementById('up1');
let priceDisplay1 = document.getElementById('priceDisplay1');
let qtdDisplay1 = document.getElementById('qtdDisplay1');
let velDisplay1 = document.getElementById('velDisplay1');

initializeUpgrade1(priceDisplay1, qtdDisplay1, velDisplay1);
up1.addEventListener('click', () => {
    applyUpgrade1(priceDisplay1, qtdDisplay1, velDisplay1);
});

let up2 = document.getElementById('up2');
let priceDisplay2 = document.getElementById('priceDisplay2');
let qtdDisplay2 = document.getElementById('qtdDisplay2');
let velDisplay2 = document.getElementById('velDisplay2');

initializeUpgrade2(priceDisplay2, qtdDisplay2, velDisplay2);
up2.addEventListener('click', () => {
    applyUpgrade2(priceDisplay2, qtdDisplay2, velDisplay2);
});