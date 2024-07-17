export function createDialog() {
    const dialog = document.createElement('div');
    dialog.classList.add("slide");

    dialog.innerHTML = `
        <dialog open>
            <form method="dialog">
                Este site NÃO utiliza internet cookies, PORÉM, utiliza localStorage para salvar o progesso do jogo.
                <button id="cookiesConsent" class="btn" type="submit">OK</button>
            </form>
        </dialog>
    `;

    document.body.appendChild(dialog);

    let consent = document.getElementById("cookiesConsent");
    consent.addEventListener('click', () => {
        localStorage.setItem("showModal", false);
    });
}