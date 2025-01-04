const WebSocket = require('ws');

function onError(ws, err) {
    console.log('Erro no WebSocket: ' + err.message);
}

function onMessage(ws, data) {
    console.log('Mensagem recebida: ' + data);
    ws.send('Recebido!');
}

function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data)); 
    ws.on('error', error => onError(ws, error));
}

module.exports = class {
    static webSocketController(server) {
        const wss = new WebSocket.Server({
            server
        });

        wss.on('connection', onConnection);

        console.log('App WebSocket está rodando!');
        return wss;
    }
}
