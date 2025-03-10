//This file is responsible for handling the chat functionality of the application.
//It sends and receives messages from the server and displays them on the chat box.

// importing socket.io.
const socket = io();

// assigning elements to variables.
const chatBox = document.getElementById("chatBox");
const userNameInput = document.getElementById("userName");
const messageInput = document.getElementById("userMessage");
const sendButton = document.getElementById("sendMessage");

// sending message to the server when the send button is clicked.
sendButton.addEventListener("click", () => {
    // getting the message and username from the input fields.
    const message = messageInput.value;
    const userName = userNameInput.value;
    // if username is empty, alert the user
    if (!userName) {
        alert("Please enter a username");
        return;
    }
    // if username is not empty, send the message to the server.
    if (userName.trim()) {
        // sending message to the server.
        socket.emit("chat message", `${userName}: ${message}`);
        // resetting the message input field.
        messageInput.value = "";
    }
});

// receiving message from the server and displaying it on the chat box.
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
