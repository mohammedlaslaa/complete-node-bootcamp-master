const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
    constructor(){
        super();
    }
}

const myEmitter = new EventEmitter();

myEmitter.on('newSale', () => {
    console.log("-50%")
})

myEmitter.on('newSale', () => {
    console.log("-80%")
})

myEmitter.on('newSale', stock => {
    console.log("il y a " + stock)
})

myEmitter.emit('newSale', 9);


//////////////////

const server = http.createServer();

server.on('request', (req, res) => {
    console.log('request receive');
    console.log(req.url);
    res.end('Requnest received')
})

server.on('request', (req, res) => {
    console.log('Another received')
})

server.on('close', () => {
    console.log('server closed');
})

server.listen(8000, '127.0.0.1', () => {
    console.log('waiting for request....')
}
)