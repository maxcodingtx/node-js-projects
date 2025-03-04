var http = require("http");
var formidable = require("formidable");

// Launching server, passing in an asynchronous callback function
// callback function catches client's request (req)
// callback function parses form data into JSON when client sends request (res)
// callback function also creates HTML form for client to use.
const server = http.createServer(async (req, res) => {
    // Checking if HTTP request is to /api/upload endpoint, and is a POST request
    if (req.url == "/api/upload" && req.method.toLowerCase() == "post") {
        // Creating new instance of formidable, will handle file uploads
        const form = new formidable.IncomingForm();
        // initializing fields and files variables
        let fields, files;
        try {
            // Extract fields and files from incoming request
            [fields, files] = await form.parse(req);
        } catch (err) {
            // Error handling for failed parsing
            res.writeHead(err.httpCode || 400, {
                "Content-Type": "/text/plain",
            });
            res.end(String(err)); // Sending error message as response
            return;
        }
        // If parsing is successful, send JSON file containing parsed fields and files
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ fields, files }, null, 2));
        return;
    }

    // Create the HTML form which client will use.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
    <h2>With Node.js <code>"http"</code> module</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
    <div>Text Field 1: <input type="text" name="title 1" /></div>
    <div>Text Field 2: <input type="text" name="title 2" /></div>
    <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
    <input type="submit" value="Upload" />
    </form>
        `);
});

server.listen(5000);
