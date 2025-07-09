const array = [20, 10, 30, 5];
let sum = 0;
for (let i = 0; i < array.length; i++) {
    sum += array[i];
}
console.log("Sum of the array:", sum);

for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
           
            let temp = array[j];
            array[j] = array[j + 1];
            array[j + 1] = temp;
        }
    }
}

console.log("Sorted array (ascending):", array);
