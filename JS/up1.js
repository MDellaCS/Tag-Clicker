export function initializeUpgrade(up1, upgradePriceDisplay, cont) {
    let upPrice = parseInt(localStorage.getItem("upPrice")) || 10;
    upgradePriceDisplay.innerText = `Upgrade Price: ${upPrice}`;

    if (hasUpgrade1()) {
        setInterval(() => {
            cont++;
            localStorage.setItem("clicks", cont);
        }, 1000);
    }
}

export function applyUpgrade(cont, up1, upgradePriceDisplay) {
    let upPrice = parseInt(localStorage.getItem("upPrice")) || 10;

    if (cont >= upPrice) {
        cont -= upPrice;
        upPrice = Math.ceil(upPrice * 1.1);
        up1.innerHTML = `UPGRADE 1 | ${upPrice}`;
        localStorage.setItem("upPrice", upPrice);
        setUpgrade1(true);
    } else {
        console.log("Cliques insuficientes para Up1");
    }

    return cont;
}

function hasUpgrade1() {
    return localStorage.getItem("hasUp1") === 'true';
}

function setUpgrade1(value) {
    localStorage.setItem("hasUp1", value);
}
