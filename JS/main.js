import { upgradeConfig } from './upgradeConfig.js';
import { initializeUpgrade, applyUpgrade } from './up1.js';

let melancia = document.getElementById('melancia');
let contador = document.getElementById('contador');

let melancias = parseInt(localStorage.getItem("melancias")) || 0;
if (melancias === 0) {
    localStorage.setItem("melancias", 0);
}
contador.innerText = melancias;

melancia.addEventListener('click', (event) => {
    melancias = parseInt(localStorage.getItem("melancias"));
    contador.innerText = (melancias += 100);
    localStorage.setItem("melancias", melancias);

    createFloatingText(event.clientX, event.clientY, "+1");
});

const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
            contador.classList.add("shiver");
            setTimeout(() => {
                contador.classList.remove("shiver");
                let originalText = contador.innerText;
                let maskedText = originalText.replace(/{3}/g, '.');
                contador.innerText = maskedText;
            }, 200);
        }
    }
});

const config = { subtree: true, characterData: true, childList: true };

observer.observe(contador, config);

function createFloatingText(x, y, text) {
    const floatingText = document.createElement('div');
    floatingText.classList.add('floating-text', 'floatOut');
    floatingText.innerText = text;

    const randomX = x + (Math.random() * 20 - 10); // -10 to +10
    const randomY = y + (Math.random() * 10 - 5); // -5 to +5
    const randomRotation = (Math.random() * 20 - 10);

    floatingText.style.left = `${randomX}px`;
    floatingText.style.top = `${randomY}px`;
    floatingText.style.transform = `rotate(${randomRotation}deg)`;

    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.remove();
    }, 2000);
}

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