// console.log(arguments);
// console.log(require('module').wrapper);


//module.exports
const calculator = require('./test-module-1');
const calc1 = new calculator();

console.log(calc1.add(4, 5, 8));

// export

//const calculator2 = require('./test-module-2');
const {add, multiply, divide} = require('./test-module-2');
console.log(add(4,5));
 
// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();