var express = require("express");
var QRCode = require("qrcode");
var path = require("path");
var app = express();
var PORT = 3000;

// Middleware for handling submitted form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the frontend
app.use(express.static(path.join(__dirname, "frontend")));
// Define the rout for generating QR Code
app.post("/generate", async (req, res) => {
    // Get text from request body
    const { text } = req.body;

    // Check if text is provided. If not, send an error message.
    if (!text) {
        res.status(400).send("text is required");
    }

    // Generate QR Code, unless an error occurs.
    try {
        const qrCodeDateURL = await QRCode.toDataURL(text);
        res.json({ qrCodeDateURL });
    } catch (error) {
        res.status(500).send("Error While Generating QR Code");
    }
});

// Start the server.
app.listen(PORT, () => {
    console.log(`sever is running on ${PORT}    `);
});
