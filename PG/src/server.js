// server.js

// Load environment variables (tries both ../.env and .env)
const path = require('path');
const dotenvPath = path.resolve(__dirname, '../.env');
require('dotenv').config({ path: dotenvPath });

const express = require('express');
const userRouter = require('./routes/user.routes');

const app = express();

// Middleware
app.use(express.json());
app.use('/api', userRouter);

// Get port (fallback to 8080)
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
  console.log(`📦 Environment file loaded from: ${dotenvPath}`);
  console.log(`👤 DB_USER: ${process.env.DB_USER || 'not set'}`);
});
