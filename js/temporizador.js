// Variáveis do temporizador
window.tempoTemporizador = 0; 
window.tempoRestante = 0;     
window.intervaloTemporizador = null;

// Configuração do som do alarme
const somAlarme = new Audio('./sound/time-sound.mp3');
somAlarme.loop = true; 

function desligarSomAlarme() {
    somAlarme.pause();
    somAlarme.currentTime = 0; 
}

// Formata segundos em HH:MM:SS
function formatarTempoTemporizador(totalSegundos) {
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

function atualizarTelaTemporizador() {
    const clock = document.getElementById('clock');
    if (clock && window.modoAtual === 'temporizador') {
        clock.textContent = formatarTempoTemporizador(window.tempoRestante);
    }
}

// Cria e exibe o container do alarme na tela
function mostrarAlarmeTela() {
    // Remove o aviso visual anterior se já existir, SEM mexer no som
    const containerExistente = document.getElementById('containerAvisoFim');
    if (containerExistente) {
        containerExistente.remove();
    }

    const containerAlarme = document.createElement('div');
    containerAlarme.id = 'containerAvisoFim';
    
    containerAlarme.innerHTML = `
        <style>
            @keyframes animEntrada {
                0% { transform: scale(0.7); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes balancarSino {
                0%, 100% { transform: rotate(0deg); }
                20%, 60% { transform: rotate(15deg); }
                40%, 80% { transform: rotate(-15deg); }
            }
            .icone-alarme {
                font-size: 4rem;
                display: inline-block;
                animation: balancarSino 0.6s infinite ease-in-out;
            }
        </style>

        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(5px); display: flex; justify-content: center; align-items: center; z-index: 10000;">
            <div style="background-color: #ffffff; padding: 35px 30px; border-radius: 25px; text-align: center; max-width: 90%; width: 380px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); animation: animEntrada 0.3s ease-out; font-family: 'Arial', sans-serif;">
                
                <div class="icone-alarme">⏰</div>

                <h2 style="color: #d12e6d; margin: 15px 0 10px 0; font-size: 1.6rem; font-weight: bold;">
                    O tempo acabou!!!!!!!!!!!!!
                </h2>

                <p style="color: #666; font-size: 0.95rem; margin-bottom: 25px;">
                    O temporizador chegou ao fim.
                </p>

                <button onclick="fecharAlarmeTela()" style="background-color: #d12e6d; color: white; border: none; padding: 14px 30px; font-size: 1.1rem; font-weight: bold; border-radius: 14px; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(209, 46, 109, 0.4);" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    Parar Alarme
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(containerAlarme);
}
// Fecha o aviso e para a música
function fecharAlarmeTela() {
    desligarSomAlarme(); 

    const containerAlarme = document.getElementById('containerAvisoFim');
    if (containerAlarme) {
        containerAlarme.remove();
    }
}

function iniciarTemporizador() {
    if (window.tempoRestante <= 0 || window.intervaloTemporizador) return;

    const startBtn = document.getElementById('startTime');
    if (startBtn) startBtn.textContent = 'Pausar';

    window.intervaloTemporizador = setInterval(() => {
        if (window.tempoRestante > 0) {
            window.tempoRestante--;
            atualizarTelaTemporizador();
        } else {
            pararTemporizador();

            // 1. Mostra a mensagem na tela
            mostrarAlarmeTela();

            // 2. Agora sim toca o som sem ser interrompido!
            somAlarme.currentTime = 0;
            somAlarme.play().catch(erro => console.error("Erro no som:", erro));
        }
    }, 1000);
}

// Pausa a contagem
function pararTemporizador() {
    clearInterval(window.intervaloTemporizador);
    window.intervaloTemporizador = null;

    const startBtn = document.getElementById('startTime');
    if (startBtn) startBtn.textContent = 'Iniciar';
}

function toggleTemporizador() {
    if (window.intervaloTemporizador) {
        pararTemporizador();
    } else {
        iniciarTemporizador();
    }
}

function redefinirTemporizador() {
    pararTemporizador();
    fecharAlarmeTela(); 
    window.tempoRestante = window.tempoTemporizador;
    atualizarTelaTemporizador();
}

function markerTime() {
    window.modoAtual = 'temporizador';

    cancelarEdicao();

    // Elementos da tela
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const catgif = document.getElementById('catsGif');

    const editTime = document.getElementById('editTime');
    const resetTime = document.getElementById('resetTime');
    const startTime = document.getElementById('startTime');

    if (catgif) catgif.style.display = 'none';

    // Esconde botões do Cronômetro
    if (startButton) startButton.style.display = 'none';
    if (stopButton) stopButton.style.display = 'none';
    if (resetButton) resetButton.style.display = 'none';

    // Mostra botões do Temporizador
    const botoesTime = [editTime, startTime, resetTime];
    botoesTime.forEach(function (botao) {
        if (botao) {
            botao.style.display = 'inline-block';
            Object.assign(botao.style, {
                textAlign: 'center',
                borderRadius: '20px',
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                fontWeight: '400',
                border: 'none',
                margin: '5px',
                fontFamily: "Arial, sans-serif"
            });
        }
    });

    if (editTime) editTime.textContent = 'Editar';
    if (resetTime) resetTime.textContent = 'Redefinir';
    if (startTime) {
        startTime.textContent = window.intervaloTemporizador ? 'Pausar' : 'Iniciar';
    }

    // Atribui os cliques aos botões
    if (editTime) editTime.onclick = edit;
    if (startTime) startTime.onclick = toggleTemporizador;
    if (resetTime) resetTime.onclick = redefinirTemporizador;

    atualizarTelaTemporizador();
}

function edit() {
    const containerInputs = document.getElementById('editTimeinput');
    if (containerInputs.innerHTML !== '') return;

    containerInputs.innerHTML = `
        <style>
            .modal-anim { animation: popIn 0.3s ease-out forwards; }
            @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            .time-input::-webkit-inner-spin-button, 
            .time-input::-webkit-outer-spin-button { 
                -webkit-appearance: none; 
                margin: 0; 
            }
            .time-input { -moz-appearance: textfield; }
            .btn-hover:hover { filter: brightness(0.9); transform: scale(1.05); }
        </style>

        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 9999;">
            <div class="modal-anim" style="background-color: #ffffff; padding: 30px 40px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); text-align: center; font-family: 'Arial', sans-serif;">
                <h3 style="margin: 0 0 25px 0; color: #333; font-size: 1.5rem;">Defina o tempo</h3>
                
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 30px;">
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <input class="time-input" type="number" id="inputHours" placeholder="00" min="0" max="99" style="width: 70px; height: 70px; font-size: 2rem; text-align: center; border-radius: 15px; border: 2px solid #e0e0e0; outline: none; color: #333; background: #f9f9f9;">
                        <span style="font-size: 0.85rem; color: #666; margin-top: 8px; font-weight: bold;">Horas</span>
                    </div>
                    <span style="font-size: 2.5rem; font-weight: bold; color: #333; margin-top: -25px;">:</span>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <input class="time-input" type="number" id="inputMinutes" placeholder="00" min="0" max="59" style="width: 70px; height: 70px; font-size: 2rem; text-align: center; border-radius: 15px; border: 2px solid #e0e0e0; outline: none; color: #333; background: #f9f9f9;">
                        <span style="font-size: 0.85rem; color: #666; margin-top: 8px; font-weight: bold;">Minutos</span>
                    </div>
                    <span style="font-size: 2.5rem; font-weight: bold; color: #333; margin-top: -25px;">:</span>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <input class="time-input" type="number" id="inputSeconds" placeholder="00" min="0" max="59" style="width: 70px; height: 70px; font-size: 2rem; text-align: center; border-radius: 15px; border: 2px solid #e0e0e0; outline: none; color: #333; background: #f9f9f9;">
                        <span style="font-size: 0.85rem; color: #666; margin-top: 8px; font-weight: bold;">Segundos</span>
                    </div>
                </div>
                
                <div style="display: flex; justify-content: center; gap: 15px;">
                    <button class="btn-hover" onclick="cancelarEdicao()" style="padding: 12px 25px; border-radius: 12px; border: none; background-color: #f1f3f5; color: #333; cursor: pointer; font-weight: bold; font-size: 1rem;">Cancelar</button>
                    <button class="btn-hover" onclick="salvarTempo()" style="padding: 12px 35px; border-radius: 12px; border: none; background-color: #d12e6d; color: white; cursor: pointer; font-weight: bold; font-size: 1rem;">Salvar</button>
                </div>
            </div>
        </div>
    `;
}

function salvarTempo() {
    let horas = parseInt(document.getElementById('inputHours').value) || 0;
    let minutos = parseInt(document.getElementById('inputMinutes').value) || 0;
    let segundos = parseInt(document.getElementById('inputSeconds').value) || 0;

    if (minutos > 59) minutos = 59;
    if (segundos > 59) segundos = 59;

    pararTemporizador();

    window.tempoTemporizador = (horas * 3600) + (minutos * 60) + segundos;
    window.tempoRestante = window.tempoTemporizador;

    atualizarTelaTemporizador();
    cancelarEdicao();
}

function cancelarEdicao() {
    const container = document.getElementById('editTimeinput');
    if (container) container.innerHTML = '';
}