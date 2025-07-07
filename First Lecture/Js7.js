// let arr = [10, 5, 3, 7, 9];

// console.log("Even elements:");
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] % 2 == 0) {
//         console.log(arr[i]);
//     }
// }

// console.log("Odd elements:");
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] % 2 !== 0) {
//         console.log(arr[i]);
//     }
// }

let arr = [10, 5, 3, 7, 9];

let evenNum = arr.filter((n) => n % 2 === 0);
let oddNum = arr.filter((n) => n % 2 !== 0);

console.log("Even numbers:", evenNum);
console.log("Odd numbers:", oddNum);

