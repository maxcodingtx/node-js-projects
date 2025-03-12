document
    .getElementById("form")
    .addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const urlEncodedData = new URLSearchParams(formData).toString();

        const response = await fetch("/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlEncodedData,
        });

        const responseData = await response.json();
        console.log(responseData);
    });
