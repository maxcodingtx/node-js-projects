// importing express
const express = require("express");
// creating express app
const app = express();
// defining a port number
const PORT = 3000;

// Middleware to parse URL-encoded data (for form submit)
app.use(express.urlencoded({ extended: true }));
// Connecting to frontend "public" folder
app.use(express.static("public"));
// Middleware to parse JSON data
app.use(express.json());

// Handle POST request to "/submit" endpoint
app.post("/submit", (req, res) => {
    // Sending JSON response containing form data from frontend
    res.json({
        message: "Data received",
        data: req.body,
        status: "ok",
    });
});

// Starting the server on specified port.
app.listen(`${PORT}`, () => {
    console.log(`server on port ${PORT}`);
});
