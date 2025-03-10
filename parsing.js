const fs = require('fs') 
const http = require('http')

const server = http.createServer((req, res) => {
    const url = req.url 
    const method = req.method

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        //hits the if statement and will register the events, but it will not execute yet

        const body = [];
        //allows us to listen to certain events
        req.on('data', (chunk) => {
          console.log(chunk);
          body.push(chunk);
        });
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          const message = parsedBody.split('=')[1];
          console.log(message)
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write('<head><title>My First Page</title><head>');
      res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
      res.write('</html>');
      res.end();
    });
    
    

server.listen(3000)