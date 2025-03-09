const socket = io();
const chatBox = document.getElementById("chatBox");
const userNameInput = document.getElementById("userName");
const messageInput = document.getElementById("userMessage");
const sendBtn = document.getElementById("sendMessage");

sendBtn.addEventListener("click", () => {
    const message = messageInput.value;
    const userName = userNameInput.value;
    if (!userName) {
        alert("Please enter a username");
        return;
    }

    if (userName.trim()) {
        socket.emit("chat message", `${userName}: ${message}`);
        messageInput.value = "";
    }
});

socket.on("chat message", msg => {
    const messageElement = document.createElement("p");
    messageElement.textContent = msg;
    messageElement.className = "message";
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
});

// lock user input field once the user has entered the username
userNameInput.addEventListener("change", () => {
    userNameInput.disabled = true;
    setTimeout(() => {
        alert("Username is set");
    }, 100);
});
