const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    
    const {method, url} = request;

    if (url === '/') {
        if(method === 'GET'){
            response.statusCode = 200;
            response.end("Ini adalah homepage");
        } else {
            response.statusCode = 400;
            response.end(`Halaman tidak dapat diakses dengan ${method} request`);
        }
    } else if (url === '/about') {
        if(method === 'GET'){
            response.statusCode = 200;
            response.end("Halo! Ini adalah halaman about");
        } else if(method === 'POST'){
            response.statusCode = 200;
            let body = [];

            request.on('data', chunk => {
                body.push(chunk);
            });

            request.on('end',() => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body);
                response.end(`Halo, ${name}! Ini adalah halaman about`);
            })
        } else {
            response.statusCode = 400;
            response.end(`Halaman tidak dapat diakses dengan ${method} request`);
        }
    } else {
        response.statusCode = 404;
        response.end("Halaman tidak ditemukan!");
    }

    // if(method === 'GET'){
    //     response.end("Ini method GET!");
    // }
    // if(method === 'POST'){
    //     let body = [];

    //     request.on('data', chunk => {
    //         body.push(chunk);
    //     });

    //     request.on('end', () => {
    //         body = Buffer.concat(body).toString();
    //         const {name} = JSON.parse(body);
    //         response.end(`<h1>Hai, ${name}!</h1>`);
    //     })
    // }
    
}

const server = http.createServer(requestListener);

const port = 5000;

const host = 'localhost';

server.listen(port, host, ()=> {
    console.log(`Server berjalan pada http://${host}:${port}`);
})