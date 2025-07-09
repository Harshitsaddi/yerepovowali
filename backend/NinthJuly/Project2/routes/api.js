const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is working!");
});

module.exports = router;

const students= [
{
name: "Rohit Singh",
rollNum: "CS101",
course: "Computer Science",
emailId: "rohit.singh@example.com",
},
{
name: "Ayush",
rollNum: "IT102",
course: "Information Technology",
emailId: "ayush@example.com",
}
]