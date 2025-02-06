// Create web server 
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const fileName = path.basename(req.url);
    const filePath = path.join(__dirname, 'comments', fileName);

    if (req.method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                res.end('File not found');
                return;
            }

            res.end(data);
        });
    }

    if (req.method === 'POST') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    res.statusCode = 500;
                    res.end('Error');
                    return;
                }

                res.statusCode = 201;
                res.end('File created');
            });
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
// Run the server by running the command node comments.js in the terminal.

// Test the server by sending a GET request to http://localhost:3000/comment1.txt. The server should respond with the content of the file comment1.txt.

// Test the server by sending a POST request to http://localhost:3000/comment1.txt with the following data:
// This is a comment.
// The server should create a file named comment1.txt in the comments directory and store the data in it. The server should respond with File created.

// You can test the server using curl or Postman.
