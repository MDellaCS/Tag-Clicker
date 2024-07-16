export function modifyMelancias(melas, tipo) {

    let melancias = parseInt(localStorage.getItem("melancias")) || 0;

    if (tipo) {
        console.log("Ganhando " + melas + " melancias");
        localStorage.setItem("melancias", (melancias + melas*1000));
    } else {
        console.log("Perdendo " + melas + " melancias");
        localStorage.setItem("melancias", (melancias - melas));
    }

    document.getElementById('contador').innerText = parseInt(localStorage.getItem("melancias"));
}