const { greet } = require('./App');
console.log(greet("Student"));

const { addNumbers } = require('./app2');
let result = addNumbers(5, 10);
console.log("The sum is:", result);


const { findMax, findMin } = require('./app3');
const numbers = [10, 45, 3, 99, 23];
const maxNumber = findMax(numbers);
console.log("The maximum number is:", maxNumber);
const minNumber = findMin(numbers);
console.log("The minimum number is:", minNumber);

let result2 = addNumbers(maxNumber, minNumber);
console.log("The sum of max and min is:", result2);
