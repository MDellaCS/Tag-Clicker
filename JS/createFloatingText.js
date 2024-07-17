let currentFloatingText = null;

export function createFloatingText(x, y, text, color) {
    if (currentFloatingText) {
        currentFloatingText.remove();
    }

    const floatingText = document.createElement('div');
    floatingText.classList.add('floating-text', 'floatOut');
    floatingText.innerText = text;

    const randomX = x + (Math.random() * 20 - 10); // -10 to +10
    const randomY = y + (Math.random() * 10 - 5); // -5 to +5
    const randomRotation = (Math.random() * 20 - 10);

    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    // floatingText.style.transform = `rotate(${randomRotation}deg)`;
    floatingText.style.color = color;
    document.body.appendChild(floatingText);

    currentFloatingText = floatingText;

    setTimeout(() => {
        if (currentFloatingText === floatingText) {
            floatingText.remove();
            currentFloatingText = null;
        }
    }, 4000);
}
