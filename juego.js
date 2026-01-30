 // 1. Generación del número secreto
const secretNum = Math.floor(Math.random() * 100) + 1;
let attempts = []; // Vector para memoria
let timeLeft = 30; // Tiempo inicial
let gameActive = true;

const container = document.getElementById('mainContainer');
const timerText = document.getElementById('timer');
const feedback = document.getElementById('temperatureText');
const historyBox = document.getElementById('historyDisplay');
const input = document.getElementById('userInput');
const btn = document.getElementById('btnCheck');

// 2. Manejo de tiempo (Cronómetro)
const clock = setInterval(() => {
    if (!gameActive) {
        clearInterval(clock);
        return;
    }
    timeLeft--;
    timerText.innerText = timeLeft;

    if (timeLeft <= 0) {
        endGame("¡Tiempo Agotado! ☠️", `EL NÚMERO ERA: ${secretNum}`);
    }
}, 1000);

// 3. Lógica de Temperatura
function checkNumber() {
    const userNum = parseInt(input.value);
    if (isNaN(userNum) || userNum < 1 || userNum > 100) return;

    const distance = Math.abs(secretNum - userNum);

    if (distance === 0) {
        gameWin();
    } else {
        // Guardar en vector y mostrar
        attempts.push(userNum);
        historyBox.innerText = attempts.join(" - ");

        if (distance <= 5) {
            updateUI("hot", "🔥 ¡ESTÁ CALIENTE!");
        } else if (distance <= 15) {
            updateUI("warm", "🟡 ESTÁ TIBIO");
        } else {
            updateUI("cold", "❄️ ESTÁ FRÍO");
        }
    }
    input.value = ""; // Limpiar input automáticamente
    input.focus();
}

function updateUI(status, msg) {
    container.className = "cyber-panel " + status;
    feedback.innerText = msg;
}

function gameWin() {
    updateUI("victory", "🏆 ¡VICTORIA!");
    endGame("ACCESO CONCEDIDO", "CÓDIGO CORRECTO");
}

function endGame(mainMsg, subMsg) {
    gameActive = false;
    feedback.innerText = mainMsg;
    document.getElementById('gameStatus').innerText = subMsg;
    input.disabled = true; // Bloquear input
    btn.disabled = true;   // Bloquear botón
}

btn.addEventListener('click', checkNumber);
input.addEventListener('keypress', (e) => { if(e.key === 'Enter') checkNumber(); });