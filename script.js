const socket = new WebSocket('ws://192.168.18.16:80'); 

socket.addEventListener('open', (event) => {
    console.log('Conectado al servidor WebSocket');
});

socket.addEventListener('error', (error) => {
    console.error('Error de conexión WebSocket:', error);
});

socket.addEventListener('close', (event) => {
    if (event.wasClean) {
        console.log('Conexión WebSocket cerrada de manera limpia');
    } else {
        console.error('Conexión WebSocket cerrada abruptamente');
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.querySelector(".chat-messages");

    socket.addEventListener("message", function (event) {
        console.log(event)
        const messageText = JSON.parse(event.data).message;

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "received");
        messageElement.innerHTML = `<p>Otro Usuario: ${messageText}</p>`;
        chatMessages.appendChild(messageElement);

        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    sendButton.addEventListener("click", function () {
        const messageText = messageInput.value.trim();

        if (messageText !== "") {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message", "sent");
            messageElement.innerHTML = `<p>Tú: ${messageText}</p>`;
            chatMessages.appendChild(messageElement);

            messageInput.value = "";

            chatMessages.scrollTop = chatMessages.scrollHeight;

            console.log(messageText)
            socket.send(messageText);
        }
    });

    messageInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendButton.click();
        }
    });
});
