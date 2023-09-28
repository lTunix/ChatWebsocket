const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 80;
const ADDRESS = "192.168.18.16"

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Usuario conectado');

    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const messageObj = {
                    "type": "ArrayBuffer",
                    "message": message.toString()
                };
                
                client.send(JSON.stringify(messageObj));
            }
        });
    });

    ws.on('close', () => {
        console.log('Usuario desconectado');
    });
});

server.listen(PORT, ADDRESS, () => {
    console.log(`Servidor WebSocket en http://192.168.18.16:${PORT}`);
});
