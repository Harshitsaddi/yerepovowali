const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');


const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productsDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ DB Connection Error:', err));

// Routes
app.use('/api/products', productRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
