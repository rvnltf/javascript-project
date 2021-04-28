const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');

    response.statusCode = 200;
    
    const {method} = request;

    if(method === 'GET'){
        response.end("Ini method GET!");
    }
    if(method === 'POST'){
        response.end("Ini method POST!");
    }
    if(method === 'PUT'){
        response.end("Ini method PUT!");
    }
    if(method === 'DELETE'){
        response.end("Ini method DELETE!");
    }
}

const server = http.createServer(requestListener);

const port = 5000;

const host = 'localhost';

server.listen(port, host, ()=> {
    console.log(`Server berjalan pada http://${host}:${port}`);
})