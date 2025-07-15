const fs = require('fs');
const path = require('path');

// Text data to write
const studentData = `
Name           | Roll Number | Course                 | Email ID
---------------------------------------------------------------
Amit Singh     | CS101       | Computer Science       | amit@gmail.com
Neha           | IT102       | Information Technology | neha@gmail.com
Vikram Patel   | CS103       | Data Science           | vikram@gmail.com
Akash          | EC104       | Electronics Engineering| akash@gmail.com
`;

// Path to the output file
const outputPath = path.join(__dirname, 'data', 'students.txt');

// Ensure directory exists
fs.mkdir(path.join(__dirname, 'data'), { recursive: true }, (err) => {
    if (err) {
        console.error("Error creating directory:", err);
        return;
    }

    // Write data to the file
    fs.writeFile(outputPath, studentData, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("Student information saved to students.txt");
        }
    });
});
