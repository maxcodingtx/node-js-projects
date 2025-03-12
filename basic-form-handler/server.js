const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.post("/submit", (req, res) => {
    res.json({
        message: "Data received",
        data: req.body,
        status: "ok",
    });
});

app.listen(`${PORT}`, () => {
    console.log(`server on port ${PORT}`);
});
