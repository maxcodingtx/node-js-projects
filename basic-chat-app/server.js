// importing modules
const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const PORT = 4000;

// creating express app
const app = express();
// creating server
const server = http.createServer(app);
// creating socket
const io = new Server(server);

// linking the frontend to the server.
app.use(express.static("frontend"));

// creating a socket connection when a user connects.
io.on("connection", socket => {
    // when user connect, log it
    console.log("A user connected");

    // when user sends a message, broadcast it.
    socket.on("chat message", msg => {
        io.emit("chat message", msg);
    });

    // when user disconnects, log it.
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// listening to the PORT
server.listen(PORT, () => {
    console.log(`Server is listening at the PORT: ${PORT}`);
});
