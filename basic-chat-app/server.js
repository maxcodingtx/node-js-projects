const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const PORT = 4000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("frontend"));

io.on("connection", socket => {
    console.log("A user connected");

    socket.on("set username", username => {
        socket.username = username;
    });
    socket.on("chat message", msg => {
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Server is listening at the PORT: ${PORT}`);
});
