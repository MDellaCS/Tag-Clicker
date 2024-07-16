export function modifyMelancias(amount, type) {

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;

    if (type) {
        localStorage.setItem("melancias", (melancias + amount));
    } else {
        localStorage.setItem("melancias", (melancias - amount));
    }

    document.getElementById('contador').innerText = parseInt(localStorage.getItem("melancias"));
}