const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/posts", postRoutes);

app.listen(8090, () => {
  console.log("🚀 Server is running on port 8090");
});
