const generateQRbutton = document.getElementById("generateQR");
generateQRbutton.addEventListener("click", generateQRCode);

async function generateQRCode() {
    const text = document.getElementById("textInput").value;
    // Check if text is falsy. If so, alert the user to enter some text.
    if (!text) {
        alert("Please enter some text");
        return;
    }
    // Send a POST request to the server to generate the QR code.
    const response = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });

    // If the response from the server is OK, display the QR code.
    if (response.ok) {
        const data = await response.json();
        const qrCodeImage = document.getElementById("qrImage");
        qrCodeImage.src = data.qrCodeDateURL;
        qrCodeImage.style.display = "block";
        // Display success message 100 milliseconds after QR code is generated.
        setTimeout(() => {
            alert("QR Code generated successfully!");
        }, 100);
    } else {
        // If the response is not OK, alert the user.
        alert("Error generating QR Code");
    }
}
