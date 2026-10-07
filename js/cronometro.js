function stopwatch() {
    // 1. Seleciona os elementos da tela
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const resetButton = document.getElementById('reset');
    const catgif = document.getElementById('catsGif');

    // 2. Esconde o gato IMEDIATAMENTE (sem addEventListener)
    if (catgif) {
        catgif.style.display = 'none';
    }

    // 3. Define os textos de cada "botão" (que no HTML são divs)
    if (startButton) startButton.textContent = 'Começar';
    if (stopButton) stopButton.textContent = 'Parar';
    if (resetButton) resetButton.textContent = 'Zerar';

    // 4. Aplica o estilo em TODOS os botões
    const botoes = [startButton, stopButton, resetButton];

    botoes.forEach(function(botao) {
        if (botao) {
            Object.assign(botao.style, {
                textAlign: 'center',
                borderRadius: '20px',
                padding: '10px 15px',
                cursor: 'pointer',
                backgroundColor: '#ffffff',
                fontWeight: '400',
                border: 'none',
                margin: '5px',
                display: 'inline-block' ,
                fontFamily:"Arial, sans-serif"
            });
        }
    });
}