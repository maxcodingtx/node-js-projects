document
    .getElementById("form") // selecting form element
    .addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Create a FormData object containing form field data
        const formData = new FormData(this);
        // Converting FormData object into URL-encoded string
        const urlEncodedData = new URLSearchParams(formData).toString();

        try {
            // Sending POST request to the server with the form data
            const response = await fetch("/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: urlEncodedData,
            });

            // Parse the JSON response from the server
            const responseData = await response.json();
            // Log the server's json-parsed response
            console.log(responseData);
        } catch (error) {
            // handling errors
            console.error("Error while submitting form:", error);
        }
    });
