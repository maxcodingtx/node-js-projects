const socket = io();
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("userMessage");
const sendBtn = document.getElementById("sendMessage");

sendBtn.addEventListener("click", () => {
    const message = messageInput.value;
    if (message.trim()) {
        socket.emit("chat message", message);
        messageInput.value = "";
    }
});

socket.on("chat message", msg => {
    const messageElement = document.createElement("div");
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});
