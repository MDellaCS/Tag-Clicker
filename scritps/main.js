import { getClickValue } from './getClickValue.js';
import { loadCheats } from './cheats.js';
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

loadCheats();

var tablinks = document.getElementsByClassName("tablink");
for (let tablink of tablinks) {
    tablink.addEventListener("click", function () {
        openTab(tablink.id);
    });
}

// By default, open the first tab
openTab("Tab1");

function openTab(tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById("c" + tabName).style.display = "block";
    document.getElementById("c" + tabName).classList.add("active");
    document.getElementById(tabName).classList.add("active");
}