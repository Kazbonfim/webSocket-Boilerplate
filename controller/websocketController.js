const WebSocket = require('ws');

// Esse arquivo se comunica exclusivamente com o presente em ./bin/www, então, aqui só inicializamos as funções, e lá conseguimos manipular eventos para utilizar essas funções daqui. Na pasta ./events você pode conferir alguns dos eventos programados para fins de teste, como envio recorrente de mensagens, e etc...

// Em caso de erro...
function onError(ws, err) {
    console.log('Erro no WebSocket: ' + err.message);
}

// Em caso de mensagem...
function onMessage(ws, data) {
    try {
        console.log('Mensagem recebida: ' + data);
        ws.send('Recebido!');
    } catch (error) {
        console.log('Erro ao processar sua mensagem');
        ws.send('Erro ao processar sua mensagem');
    }
}

// Quando uma conexão é estabelecida...
function onConnection(ws, req) {
    // Evento para conexões
    console.log('Novo cliente conectado!');

    // Evento para mensagens
    ws.on('message', data => onMessage(ws, data));

    // Evento para erros
    ws.on('error', error => onError(ws, error));

    // Mensagem inicial
    ws.send('Seja bem-vindo ao servidor WebSocket!');
}

module.exports = class {
    // Função para transmissão global
    static broadcast(wss, json) {
        // Verifica se há clientes conectados
        if (!wss.clients || !(wss.clients instanceof Set)) {
            return;
        }

        wss.clients.forEach(client => {
            // Verifica se o cliente está aberto antes de enviar
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(json));
            }
        });
    }

    // Inicializa o WebSocket
    static webSocketController(server) {
        const wss = new WebSocket.Server({ server });

        wss.on('connection', onConnection);

        console.log('App WebSocket está rodando!');
        return wss;
    }
};
