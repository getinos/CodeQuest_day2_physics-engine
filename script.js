// Elements
const ball = document.getElementById('ball');
const stickman = document.getElementById('stickman');
const brokenPartsContainer = document.getElementById('broken-parts');
const brokenParts = brokenPartsContainer ? brokenPartsContainer.querySelectorAll('.part') : [];
const massInput = document.getElementById('mass');
const speedInput = document.getElementById('speed');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const explanation = document.getElementById('explanation');

// Physics Constants
let ballX = 0, ballY = 0;
let verticalSpeed = 0, horizontalSpeed = 0;
const gravity = 0.3;
const bounceFactor = 0.7;
const horizontalFriction = 0.99;
const verticalFriction = 0.99;
const speedThreshold = 0.1;

// Stickman Physics
let stickmanX = 0, stickmanY = 0;
let stickmanSliding = false;
let stickmanSlideSpeed = 0;

// Container
const container = document.querySelector('.scene');
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

let animationId;

// Reset
resetBtn.addEventListener('click', () => {
    location.reload();
});

// Ball Movement
function moveBall() {
    ballX += horizontalSpeed;
    ballY += verticalSpeed;
    verticalSpeed += gravity;

    horizontalSpeed *= horizontalFriction;
    verticalSpeed *= verticalFriction;

    if (Math.abs(horizontalSpeed) < speedThreshold && Math.abs(verticalSpeed) < speedThreshold) {
        horizontalSpeed = 0;
        verticalSpeed = 0;
    }

    // Collision with container
    if (ballY >= containerHeight - ball.offsetHeight) {
        ballY = containerHeight - ball.offsetHeight;
        verticalSpeed *= -bounceFactor;
    }
    if (ballY <= 0) {
        ballY = 0;
        verticalSpeed *= -bounceFactor;
    }
    if (ballX <= 0) {
        ballX = 0;
        horizontalSpeed *= -bounceFactor;
    }
    if (ballX >= containerWidth - ball.offsetWidth) {
        ballX = containerWidth - ball.offsetWidth;
        horizontalSpeed *= -bounceFactor;
    }

    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    // Check collision
    if (checkCollision(ball, stickman)) {
        const impactForce = Math.abs(horizontalSpeed) + Math.abs(verticalSpeed);
        const mass = parseFloat(massInput.value);
        const speed = parseFloat(speedInput.value);
        const momentum = (mass * speed).toFixed(2);
        const force = impactForce.toFixed(2);
        const lethalForceThreshold = 200;
        const isBroken = impactForce >= lethalForceThreshold;

        let html = `<h2>Physics Explanation</h2>`;
        html += `
            <p><strong>Ball Mass:</strong> ${mass} kg – Visualized by the ball's size</p>
            <p><strong>Ball Speed:</strong> ${speed} m/s</p>
            <p><strong>Momentum:</strong> ${momentum} kg·m/s (p = mass × velocity)</p>
            <p><strong>Impact Force:</strong> ${force} Newtons (because clearly, that wall eats force for breakfast and leaves the stickman with the bill)</p>
        `;

        let comparison = '';
        if (impactForce >= 50) {
            comparison = "like getting hit by a sledgehammer swung by a professional wrestler 💥";
        } else if (impactForce >= 30) {
            comparison = "like being tackled hard in rugby 🏉";
        } else if (impactForce >= 15) {
            comparison = "like a bowling ball falling from a table onto your foot 🎳😖";
        } else if (impactForce >= 10) {
            comparison = "like being hit by a scooter at moderate speed 🛴";
        } else if (impactForce >= 5) {
            comparison = "like a solid shove in a basketball game 🏀";
        } else if (impactForce >= 2) {
            comparison = "like a toddler bumping into you while running 👶";
        } else {
            comparison = "barely a nudge – like a pillow fight gone wrong 🛌🥊";
        }

        if (isBroken) {
            html += `
                <p><strong>Result:</strong> The impact force exceeded ${lethalForceThreshold} N – the stickman couldn’t survive the hit 💀</p>
                <p><strong>Real-world comparison:</strong> This is ${comparison}.</p>
            `;
            breakStickman(impactForce);
        } else {
            html += `
                <p><strong>Result:</strong> The impact force was below ${lethalForceThreshold} N – the stickman survived but got pushed back 😵</p>
                <p><strong>Real-world comparison:</strong> This feels ${comparison}.</p>
            `;

            stickmanSlideSpeed = horizontalSpeed * 2;
            stickmanSliding = true;
            shakeStickman();
        }

        explanation.innerHTML = html;

        horizontalSpeed = 0;
        verticalSpeed = 0;
    }

    if (stickmanSliding) {
        stickmanX += stickmanSlideSpeed;
        if (stickmanX < 0) {
            stickmanX = 0;
            stickmanSlideSpeed = 0;
        }
        if (stickmanX + stickman.offsetWidth > containerWidth) {
            stickmanX = containerWidth - stickman.offsetWidth;
            stickmanSlideSpeed = 0;
        }

        stickman.style.left = stickmanX + 'px';
        stickman.style.top = stickmanY + 'px';
        stickmanSlideSpeed *= 0.9;

        if (Math.abs(stickmanSlideSpeed) < 0.5) {
            stickmanSliding = false;
        }
    }

    animateBrokenParts();
    animationId = requestAnimationFrame(moveBall);
}


// Collision Detection
function checkCollision(ball, stickman) {
    const ballRect = ball.getBoundingClientRect();
    const stickmanRect = stickman.getBoundingClientRect();
    return ballRect.left < stickmanRect.right &&
           ballRect.right > stickmanRect.left &&
           ballRect.top < stickmanRect.bottom &&
           ballRect.bottom > stickmanRect.top;
}

// Shake on small impact
function shakeStickman() {
    stickman.style.transition = 'left 0.1s';
    stickman.style.left = (stickmanX - 5) + 'px';
    setTimeout(() => {
        stickman.style.left = (stickmanX + 5) + 'px';
    }, 100);
    setTimeout(() => {
        stickman.style.left = stickmanX + 'px';
    }, 200);
}

// Break stickman on heavy impact
function breakStickman(impactForce) {
    stickman.style.display = 'none';
    brokenPartsContainer.style.display = 'block';

    brokenParts.forEach(part => {
        part.style.left = stickmanX + 15 + 'px';
        part.style.top = stickmanY + 'px';

        part.dataset.vx = (Math.random() - 0.5) * impactForce * 2;
        part.dataset.vy = -(Math.random() * impactForce);
        part.dataset.rotation = Math.random() * 360;
        part.dataset.rotationSpeed = (Math.random() - 0.5) * 10;
    });
}

// Animate broken stickman parts
function animateBrokenParts() {
    brokenParts.forEach(part => {
        if (!part.dataset.vx) return;

        let x = parseFloat(part.style.left);
        let y = parseFloat(part.style.top);
        let vx = parseFloat(part.dataset.vx);
        let vy = parseFloat(part.dataset.vy);
        let rotation = parseFloat(part.dataset.rotation);
        let rotationSpeed = parseFloat(part.dataset.rotationSpeed);

        x += vx;
        y += vy;
        vy += gravity;

        if (y + part.offsetHeight > containerHeight) {
            y = containerHeight - part.offsetHeight;
            vy *= -0.7;
            vx *= 0.7;
            rotationSpeed *= 0.7;
        }

        if (y < 0) {
            y = 0;
            vy *= -0.7;
        }

        if (x < 0) {
            x = 0;
            vx *= -0.7;
        }

        if (x + part.offsetWidth > containerWidth) {
            x = containerWidth - part.offsetWidth;
            vx *= -0.7;
        }

        rotation += rotationSpeed;

        part.style.left = x + 'px';
        part.style.top = y + 'px';
        part.style.transform = `rotate(${rotation}deg)`;

        part.dataset.vx = vx;
        part.dataset.vy = vy;
        part.dataset.rotation = rotation;
        part.dataset.rotationSpeed = rotationSpeed;
    });
}

// Start Simulation
startBtn.addEventListener('click', () => {
    const mass = parseFloat(massInput.value);
    const speed = parseFloat(speedInput.value);

    ballX = 0;
    ballY = containerHeight / 2;
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    horizontalSpeed = speed / 2;
    verticalSpeed = -speed / 4;

    stickmanX = containerWidth / 2 - stickman.offsetWidth / 2;
    stickmanY = containerHeight - stickman.offsetHeight;

    stickman.style.display = 'block';
    brokenPartsContainer.style.display = 'none';

    if (animationId) {
        cancelAnimationFrame(animationId);
    }

    animationId = requestAnimationFrame(moveBall);
});
