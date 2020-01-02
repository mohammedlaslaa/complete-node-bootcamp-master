const fs = require("fs");
const http = require("http");
const objjs = require("./objjs");
let data = '';

// This step are all optional and they aren't representative of the real goal. They are only to exercice myself.

// 1 Read the imported object by the module objjs and stringify it
let myJson = obj => {
  return new Promise((resolve, reject) => {
    const x = JSON.stringify(obj);
    resolve(x);
  });
};

// 2 write it in the json file

const writeinJsonFile = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject("I could not write that file");
      resolve("Success !");
    });
  });
};
 
// 3 read this file to import this data

const readinjsonFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) reject("I could not find that path");
      resolve(data);
    });
  });
};

// 4 execute this function step in http.createServer to put that data in the client browser

const server = http
  .createServer((req, res) => { 
    res.writeHead(200, {
      "Content-type": "application/json"
    });
    const getandresolve = async () => {
      const monobj = await myJson(objjs);
      await writeinJsonFile(`${__dirname}/first.json`, monobj);
      const read = await readinjsonFile(`${__dirname}/first.json`);
      res.end(read);
    };
    getandresolve();

    // This line opens the file as a readable stream
    var readStream = fs.createReadStream(`${__dirname}/teststream.txt`);

    // This will wait until we know the readable stream is actually valid before piping
    readStream.setEncoding("UTF8");

    // Handle stream events --> data, end, and error
    readStream.on("data", function(chunk) {
      data += chunk;
    });

    readStream.on("end", function() {
      console.log(data);
    });

    readStream.on("error", function(err) {
      console.log(err.stack);
    });

    console.log("Program Ended");
  })
  .listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
  });

  let newobj = function (first) {
    this.firstName = first;
  }

  newobj.prototype.bar = function () {
    return this.firstName
  }
  

  var x = new newobj("obj1");
  Object.getPrototypeOf(x)
  console.log(x.bar())

  var sayx = new newobj("objsayx");
  sayx.bar()
