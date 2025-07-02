const { greet } = require('./App');
console.log(greet("Student"));

const { addNumbers } = require('./app2');
let result = addNumbers(5, 10);
console.log("The sum is:", result);


const { findMax } = require('./app3');
const numbers = [10, 45, 3, 99, 23];
const maxNumber = findMax(numbers);
console.log("The maximum number is:", maxNumber);
