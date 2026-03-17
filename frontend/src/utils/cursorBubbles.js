const createCursorBubbles = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  const handler = (event) => {
    const bubble = document.createElement('span');
    const size = Math.random() * 18 + 12;
    bubble.className = 'cursor-bubble';
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${event.clientX - size / 2}px`;
    bubble.style.top = `${event.clientY - size / 2}px`;
    bubble.style.background = '#08193f';
    bubble.style.boxShadow = `0 0 ${size * 1.4}px rgba(8, 25, 63, 0.5)`;
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 1300);
  };

  window.addEventListener('pointermove', handler);
};

createCursorBubbles();
