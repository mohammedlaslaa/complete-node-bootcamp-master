const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////////////////////
// FILES

//Blocking synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn)

// const textOut = `This is what we know : ${textIn}. \n Created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('File written !')

//Non-Blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.log('error !');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`,  'utf-8', err => {
//                 console.log('Your file has been written !');
//             })
//         })
//     })
// })

// console.log('coucou')


/////////////////////////////////////////////////
// SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    if(!product.organic){
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    console.log(output)
    return output;
    
}

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    // Overview page
    if(pathName === '/overview' || pathName === '/'){
        res.writeHead(200, {'Content-type' : 'text/html'})
        const cardsHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('')
        console.log(cardsHtml)
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    // Product page
    }else if(pathName === '/product'){
        res.end('hello from product !');

    // API
    }else if(pathName === '/api'){
        res.writeHead(200, {'Content-type' : 'application/json'})
        res.end(data);

    //Not Found
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'My-own-header' : 'Hello world !'
        });
        res.end('<h1>Page not found!</h1>');
    }
    
});

server.listen(8000, '127.0.0.1', ()=>{
    console.log("Listening to requests on port 8000")
})