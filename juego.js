// 1. Configuración Inicial
const secretNum = Math.floor(Math.random() * 100) + 1;
let attempts = []; 
let timeLeft = 30; 
let gameActive = true;

const container = document.getElementById('mainContainer');
const timerText = document.getElementById('timer');
const feedback = document.getElementById('temperatureText');
const historyBox = document.getElementById('historyDisplay');
const input = document.getElementById('userInput');
const btn = document.getElementById('btnCheck');
const statusText = document.getElementById('gameStatus');

// 2. Gestión del tiempo
const clock = setInterval(() => {
    if (!gameActive) {
        clearInterval(clock);
        return;
    }
    
    timeLeft--;
    timerText.innerText = timeLeft;

    if (timeLeft <= 0) {
        // MENSAJE DE DERROTA POR TIEMPO
        endGame("¡SE TE ACABÓ EL TIEMPO! ☠️", `EL NÚMERO ERA: ${secretNum}`);
    }
}, 1000);

// 3. Lógica principal del juego
function checkNumber() {
    const userNum = parseInt(input.value);
    
    // Validaciones
    if (isNaN(userNum) || userNum < 1 || userNum > 100) {
        feedback.innerText = "INTRODUCE [1-100]";
        return;
    }

    const distance = Math.abs(secretNum - userNum);

    if (distance === 0) {
        gameWin();
    } else {
        // Guardar intento y actualizar historial
        attempts.push(userNum);
        historyBox.innerText = attempts.join(" - ");

        // Lógica de "temperatura" visual
        if (distance <= 5) {
            updateUI("hot", "🔥 ¡ESTÁ CALIENTE!");
        } else if (distance <= 15) {
            updateUI("warm", "🟡 ESTÁ TIBIO");
        } else {
            updateUI("cold", "❄️ ESTÁ FRÍO");
        }
    }
    
    input.value = ""; 
    input.focus();
}

// 4. Actualización de Interfaz
function updateUI(statusClass, msg) {
    // Limpia clases previas y añade la nueva
    container.classList.remove('cold', 'warm', 'hot', 'victory');
    container.classList.add(statusClass);
    feedback.innerText = msg;
}

function gameWin() {
    updateUI("victory", "🏆 VICTORIA");
    // MENSAJE DE GANADOR
    endGame("¡FELICIDADES, GANASTE!", "SISTEMA DESBLOQUEADO");
}

function endGame(mainMsg, subMsg) {
    gameActive = false;
    feedback.innerText = mainMsg;
    statusText.innerText = subMsg;
    
    // Bloquear controles
    input.disabled = true; 
    btn.disabled = true;   
    
    // Cambiar estilo del timer si perdió
    if (timeLeft <= 0) {
        timerText.style.color = "gray";
    }
}

// Eventos
btn.addEventListener('click', checkNumber);
input.addEventListener('keypress', (e) => { 
    if(e.key === 'Enter') checkNumber(); 
});