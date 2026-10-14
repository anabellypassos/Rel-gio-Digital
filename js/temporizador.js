window.tempoTemporizador = 0;


function markerTime() {
    window.modoAtual = 'temporizador'; 

    clearInterval(window.intervaloRelogio);


    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const catgif = document.getElementById('catsGif');

    const editTime = document.getElementById('editTime');
    const resetTime = document.getElementById('resetTime');
    const startTime = document.getElementById('startTime');

    const clockTime = document.getElementById('clock');

    if (startButton) startButton.style.display = "none";
    if (stopButton) stopButton.style.display = "none";
    if (resetButton) resetButton.style.display = "none";

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

    if (catgif) {
        catgif.style.display = 'none';
    }

    if (editTime) editTime.textContent = 'Editar';
    if (resetTime) resetTime.textContent = 'Redefinir';
    if (startTime) startTime.textContent = 'Iniciar';




}
function edit() {
    const containerInputs = document.getElementById('editTimeinput');

    // Verifica se os inputs já estão na tela para não duplicar
    if (containerInputs.innerHTML !== '') {
        return; 
    }

    // Cria o HTML do container de edição
  containerInputs.innerHTML = `
        <!-- Estilos CSS embutidos para animação e remoção das setas do input -->
        <style>
            .modal-anim { animation: popIn 0.3s ease-out forwards; }
            @keyframes popIn {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            /* Remove as setinhas dos inputs de número para ficar mais limpo */
            .time-input::-webkit-inner-spin-button, 
            .time-input::-webkit-outer-spin-button { 
                -webkit-appearance: none; 
                margin: 0; 
            }
            .time-input { 
                -moz-appearance: textfield; 
            }
            .btn-hover:hover { filter: brightness(0.9); transform: scale(1.05); }
        </style>

        <!-- Fundo escuro cobrindo a tela toda (Overlay) -->
        <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 9999;">
            
            <!-- Caixa branca principal (Container) -->
            <div class="modal-anim" style="background-color: #ffffff; padding: 30px 40px; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); text-align: center; font-family: 'Arial', sans-serif;">
                
                <h3 style="margin: 0 0 25px 0; color: #333; font-size: 1.5rem;">Defina o tempo</h3>
                
                <!-- Container dos Inputs de Tempo -->
                <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 30px;">
                    
                    <!-- Horas -->
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <input class="time-input" type="number" id="inputHours" placeholder="00" min="0" max="99" style="width: 70px; height: 70px; font-size: 2rem; text-align: center; border-radius: 15px; border: 2px solid #e0e0e0; outline: none; color: #333; background: #f9f9f9; transition: border 0.3s;">
                        <span style="font-size: 0.85rem; color: #666; margin-top: 8px; font-weight: bold;">Horas</span>
                    </div>
                    
                    <span style="font-size: 2.5rem; font-weight: bold; color: #333; margin-top: -25px;">:</span>
                    
                    <!-- Minutos -->
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <input class="time-input" type="number" id="inputMinutes" placeholder="00" min="0" max="59" style="width: 70px; height: 70px; font-size: 2rem; text-align: center; border-radius: 15px; border: 2px solid #e0e0e0; outline: none; color: #333; background: #f9f9f9; transition: border 0.3s;">
                        <span style="font-size: 0.85rem; color: #666; margin-top: 8px; font-weight: bold;">Minutos</span>
                    </div>
                    
                    <span style="font-size: 2.5rem; font-weight: bold; color: #333; margin-top: -25px;">:</span>
                    
                    <!-- Segundos -->
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <input class="time-input" type="number" id="inputSeconds" placeholder="00" min="0" max="59" style="width: 70px; height: 70px; font-size: 2rem; text-align: center; border-radius: 15px; border: 2px solid #e0e0e0; outline: none; color: #333; background: #f9f9f9; transition: border 0.3s;">
                        <span style="font-size: 0.85rem; color: #666; margin-top: 8px; font-weight: bold;">Segundos</span>
                    </div>

                </div>
                
                <!-- Botões -->
                <div style="display: flex; justify-content: center; gap: 15px;">
                    <button class="btn-hover" onclick="cancelarEdicao()" style="padding: 12px 25px; border-radius: 12px; border: none; background-color: #f1f3f5; color: #333; cursor: pointer; font-weight: bold; font-size: 1rem; transition: all 0.2s;">Cancelar</button>
                    
                    <button class="btn-hover" onclick="salvarTempo()" style="padding: 12px 35px; border-radius: 12px; border: none; background-color: #d12e6d; color: white; cursor: pointer; font-weight: bold; font-size: 1rem; box-shadow: 0 4px 15px rgba(209, 46, 109, 0.4); transition: all 0.2s;">Salvar</button>
                </div>

            </div>
        </div>
    `;
}

function salvarTempo() {
    // Pega os valores digitados (se estiver vazio, considera 0)
    let horas = parseInt(document.getElementById('inputHours').value) || 0;
    let minutos = parseInt(document.getElementById('inputMinutes').value) || 0;
    let segundos = parseInt(document.getElementById('inputSeconds').value) || 0;

    // Limita os minutos e segundos a 59 para evitar erros
    if(minutos > 59) minutos = 59;
    if(segundos > 59) segundos = 59;

    // Formata os números para sempre terem 2 casas (ex: 5 vira "05")
    let horasFormatadas = String(horas).padStart(2, '0');
    let minutosFormatados = String(minutos).padStart(2, '0');
    let segundosFormatados = String(segundos).padStart(2, '0');

    // Atualiza o relógio principal (a div #clock)
    document.getElementById('clock').textContent = `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`;

    // Salva o tempo total em segundos numa variável global para o botão "Iniciar" poder usar depois
    window.tempoTemporizador = (horas * 3600) + (minutos * 60) + segundos;

    // Fecha a janelinha de edição
    document.getElementById('editTimeinput').innerHTML = '';
}

// FUNÇÃO PARA FECHAR O MENU SEM SALVAR
function cancelarEdicao() {
    document.getElementById('editTimeinput').innerHTML = '';
}