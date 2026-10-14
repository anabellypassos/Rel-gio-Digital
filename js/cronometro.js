// Cria as variáveis fora da função para que nunca se percam ao mudar de tela
window.swHoras = window.swHoras || 0;
window.swMinutos = window.swMinutos || 0;
window.swSegundos = window.swSegundos || 0;

function formatarTempo(tempo) {
    return tempo < 10 ? '0' + tempo : tempo;
}

// Só altera os números do painel principal se a pessoa estiver vendo o cronômetro
function atualizarTelaCronometro() {
    const clock = document.getElementById('clock');
    if (clock && window.modoAtual === 'cronometro') {
        clock.textContent = `${formatarTempo(window.swHoras)}:${formatarTempo(window.swMinutos)}:${formatarTempo(window.swSegundos)}`;
    }
}

function iniciarCronometro() {
    if (window.intervaloCronometro) return; // Se já tiver rodando, não duplica

    window.intervaloCronometro = setInterval(() => {
        window.swSegundos++;
        if (window.swSegundos === 60) {
            window.swSegundos = 0;
            window.swMinutos++;
        }
        if (window.swMinutos === 60) {
            window.swMinutos = 0;
            window.swHoras++;
        }
        atualizarTelaCronometro(); 
    }, 1000);
}

function pararCronometro() {
    clearInterval(window.intervaloCronometro);
    window.intervaloCronometro = null;
}

function zerarCronometro() {
    pararCronometro();
    window.swHoras = 0;
    window.swMinutos = 0;
    window.swSegundos = 0;
    atualizarTelaCronometro();
}

// Função executada ao clicar no botão "Cronômetro" do menu
function stopwatch() {
    window.modoAtual = 'cronometro'; // Avisa ao sistema que estamos no cronômetro

    clearInterval(window.intervaloRelogio); // Para o relógio de tomar conta do painel

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const catgif = document.getElementById('catsGif');
    
    const editTime = document.getElementById('editTime');
    const resetTime = document.getElementById('resetTime');
    const startTime = document.getElementById('startTime');

    if (catgif) catgif.style.display = 'none';

    // Esconde botões do Temporizador
    if (editTime) editTime.style.display = 'none';
    if (resetTime) resetTime.style.display = 'none';
    if (startTime) startTime.style.display = 'none';

    // Mostra botões do Cronômetro
    if (startButton) { startButton.style.display = 'inline-block'; startButton.textContent = 'Começar'; }
    if (stopButton) { stopButton.style.display = 'inline-block'; stopButton.textContent = 'Parar'; }
    if (resetButton) { resetButton.style.display = 'inline-block'; resetButton.textContent = 'Zerar'; }

    const botoes = [startButton, stopButton, resetButton];
    botoes.forEach(function(botao) {
        if (botao) {
            Object.assign(botao.style, {
                textAlign: 'center', borderRadius: '20px', padding: '10px 15px',
                cursor: 'pointer', backgroundColor: '#ffffff', fontWeight: '400',
                border: 'none', margin: '5px', fontFamily:"Arial, sans-serif"
            });
        }
    });

    if (startButton) startButton.onclick = iniciarCronometro;
    if (stopButton) stopButton.onclick = pararCronometro;
    if (resetButton) resetButton.onclick = zerarCronometro;

    // Atualiza a tela para mostrar a contagem atual (mesmo que esteja rolando em segundo plano)
    atualizarTelaCronometro();
}