export function createFloatingText(x, y, text, color) {

    const floatingText = document.createElement('div');
    floatingText.classList.add('floating-text', 'floatOut');
    floatingText.innerText = text;

    const randomX = x + (Math.random() * 20 - 10); // -10 to +10
    const randomY = y + (Math.random() * 10 - 5); // -5 to +5
    const randomRotation = (Math.random() * 20 - 10);

    floatingText.style.left = `${randomX}px`;
    floatingText.style.top = `${randomY}px`;
    floatingText.style.transform = `rotate(${randomRotation}deg)`;
    floatingText.style.color = color;
    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.remove();
    }, 4000);
}
