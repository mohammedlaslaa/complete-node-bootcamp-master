const http = require("http");
const url = require("url");

const myserver = http.createServer((req, res) => {

    const myurl = url.parse(req.url)
    
    console.log(myurl)
    myurl.path = "loubouda"
    console.log(myurl.href)
    console.log(myurl)
}).listen(8000, ()=>{
    console.log("Waiting for instruction")
})