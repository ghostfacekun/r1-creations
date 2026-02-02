window.addEventListener('load', function() {
    const canvas = document.getElementById('qr-canvas');
    const ctx = canvas.getContext('2d');
    const clickTestButton = document.getElementById('click-test');

    // Generate QR code
    const qrCode = new QRCode(canvas, {
        text: 'https://example.com',
        width: 200,
        height: 200,
        colorDark: '#00ff00',
        colorLight: '#0a0a0a',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Handle click event
    clickTestButton.addEventListener('click', function() {
        alert('Click test successful!');
    });

    // Simulate scroll and long press events
    let isLongPressed = false;
    let longPressTimeout;

    canvas.addEventListener('touchstart', function(event) {
        longPressTimeout = setTimeout(function() {
            isLongPressed = true;
            dispatchEvent(new CustomEvent('longPressStart'));
        }, 1000);
    });

    canvas.addEventListener('touchend', function(event) {
        clearTimeout(longPressTimeout);
        if (isLongPressed) {
            isLongPressed = false;
            dispatchEvent(new CustomEvent('longPressEnd'));
        } else {
            dispatchEvent(new CustomEvent('sideClick'));
        }
    });

    canvas.addEventListener('touchmove', function(event) {
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            const deltaY = touch.clientY - event.changedTouches[0].clientY;

            if (deltaY > 0) {
                dispatchEvent(new CustomEvent('scrollDown'));
            } else {
                dispatchEvent(new CustomEvent('scrollUp'));
            }
        }
    });
});