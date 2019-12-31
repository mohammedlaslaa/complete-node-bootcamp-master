const fs = require("fs");
const http = require("http");

let myObj = [
  {
    name: "Laslaa",
    firstname: "Mohammed",
    age: 32
  },
  {
    name: "Laslaa",
    firstname: "Assia",
    age: 31
  },
  {
    name: "Laslaa",
    firstname: "Zakariya",
    age: 3
  },
  {
    name: "Laslaa",
    firstname: "Maryam",
    age: 1
  }
];

let myJson = obj => {
  return new Promise((resolve, reject) => {
    resolve(JSON.stringify(obj));
  });
};

/*const myfunction = async () => {
  const data = await myJson(myObj);
  fs.writeFile(`${__dirname}/first.json`, data, err => {
    if (err) console.log(err);
  });
};

myfunction();*/

const readmee = path => {
  return new Promise((resolve, reject) => {
    
      fs.readFile(path, "utf-8", (err, data) => {
        if (err) throw err;
        resolve(data);
      })
  });
};

let mdon;

(async () => {
  const x = await readmee(`${__dirname}/first.json`);
  mdon= x;
})();



const server = http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-type": "application/json"
    });
    res.end(mdon);
  })
  .listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
  });
