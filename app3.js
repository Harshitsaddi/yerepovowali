// app.js

function findMax(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Input must be a non-empty array");
    }

    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

module.exports = { findMax };
