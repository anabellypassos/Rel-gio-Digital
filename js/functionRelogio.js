// Define o modo inicial como 'relogio' quando o site abre
window.modoAtual = 'relogio';

function updateClock(){
    window.modoAtual = 'relogio'; // Avisa ao sistema que estamos no relógio

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    
    const editTime = document.getElementById('editTime');
    const resetTime = document.getElementById('resetTime');
    const startTime = document.getElementById('startTime');
    
    const catgif = document.getElementById('catsGif');

    if (catgif) {
        catgif.style.display = 'block';
    }
    
    // Esconde os botões do cronômetro
    if (startButton) startButton.style.display="none";
    if (stopButton) stopButton.style.display="none";
    if (resetButton) resetButton.style.display="none";

    // Esconde os botões do temporizador
    if (editTime) editTime.style.display = 'none';
    if (resetTime) resetTime.style.display = 'none';
    if (startTime) startTime.style.display = 'none';

    // O cronômetro NÃO recebe clearInterval aqui. Ele continua rodando escondido!

    clearInterval(window.intervaloRelogio); // Evita duplicar o relógio
    window.intervaloRelogio = setInterval(clockUpdate, 1000); // Liga o relógio
    clockUpdate(); // Atualiza a tela imediatamente para a hora real
}

function clockUpdate() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    // SÓ ATUALIZA OS NÚMEROS DO PAINEL SE ESTIVERMOS NO MODO RELÓGIO
    // Isso impede que o relógio apague os números do cronômetro sem querer
    if (window.modoAtual === 'relogio') {
        const clockElement = document.getElementById('clock');
        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }

    dailySchedules();
}

function dailySchedules() {
    const hours = new Date().getHours();
    const container = document.getElementById('container');
    const clock = document.getElementById('clock');
    const button1 = document.getElementById('button1');
    const button2 = document.getElementById('button2');
    const button3 = document.getElementById('button3');
    const button4 = document.getElementById('button4');
    const CatsGifdaily = document.getElementById('catsGif');

    if (hours < 12) {
        if(container) container.style.backgroundImage = "url('./imgs/schedules/morningIMG.png')";
        if(clock) clock.style.border = "10px solid #e07c93bd";
        if(button1) { button1.style.color = "#E07C93"; button1.style.border = "2px solid #E07C93"; }
        if(button2) { button2.style.color = "#E07C93"; button2.style.border = "2px solid #E07C93"; }
        if(button3) { button3.style.color = "#E07C93"; button3.style.border = "2px solid #E07C93"; }
        if(button4) { button4.style.color = "#E07C93"; button4.style.border = "2px solid #E07C93"; }
        if(CatsGifdaily) CatsGifdaily.src = './imgs/catsGifs/morning.gif';
        
    } else if (hours < 18) {
        if(container) container.style.backgroundImage = "url('./imgs/schedules/afternoonIMG.png')";
        if(clock) clock.style.border = "10px solid #81026c59";
        if(button1) { button1.style.color = "#ec6f8c"; button1.style.border = " 2px solid #ec6f8c"; }
        if(button2) { button2.style.color = "#ec6f8c"; button2.style.border = "2px solid #ec6f8c"; }
        if(button3) { button3.style.color = "#ec6f8c"; button3.style.border = " 2px solid #ec6f8c"; }
        if(button4) { button4.style.color = "#ec6f8c"; button4.style.border = "2px solid #ec6f8c"; }
        if(CatsGifdaily) CatsGifdaily.src = './imgs/catsGifs/afternoon.gif';
        
    } else {
        if(container) container.style.backgroundImage = "url('./imgs/schedules/nightIMG.png')";
        if(clock) clock.style.border = "10px solid #3d073459";
        if(button1) { button1.style.color = "#450452"; button1.style.border = "2px solid #450452"; }
        if(button2) { button2.style.color = "#450452"; button2.style.border = "2px solid #450452"; }
        if(button3) { button3.style.color = "#450452"; button3.style.border = "2px solid #450452"; }
        if(button4) { button4.style.color = "#450452"; button4.style.border = "2px solid #450452"; }
        if(CatsGifdaily) CatsGifdaily.src = './imgs/catsGifs/nigth.gif';
    }
}

// Inicia o relógio assim que o arquivo carrega e guarda na variável global
window.intervaloRelogio = setInterval(clockUpdate, 1000);
clockUpdate();
