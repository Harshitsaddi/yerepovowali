const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage
let products = [];
let nextId = 1; // Auto-incrementing ID

// Helper function to calculate finalPrice
function calculateFinalPrice(originalPrice, discountPer) {
    return originalPrice - (originalPrice * discountPer / 100);
}

// POST: Add new product
app.post('/product-info', (req, res) => {
    const { productName, originalPrice, discountPer } = req.body;

    // Validation
    if (!productName || typeof productName !== 'string') {
        return res.status(400).json({ error: 'productName must be a non-empty string' });
    }
    if (typeof originalPrice !== 'number' || originalPrice <= 0) {
        return res.status(400).json({ error: 'originalPrice must be a positive number' });
    }
    if (typeof discountPer !== 'number' || discountPer < 0 || discountPer > 100) {
        return res.status(400).json({ error: 'discountPer must be between 0 and 100' });
    }

    const finalPrice = calculateFinalPrice(originalPrice, discountPer);

    const newProduct = {
        id: nextId++,
        productName,
        originalPrice,
        discountPer,
        finalPrice
    };

    products.push(newProduct);
    res.status(201).json({ message: 'Product added', product: newProduct });
});

// GET: All products
app.get('/product-info', (req, res) => {
    res.json(products);
});

// PUT: Update product by id
app.put('/product-info/:id', (req, res) => {
    const { id } = req.params;
    const { productName, originalPrice, discountPer } = req.body;

    const product = products.find(p => p.id === parseInt(id));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Update fields if provided
    if (productName) product.productName = productName;
    if (originalPrice !== undefined) product.originalPrice = originalPrice;
    if (discountPer !== undefined) product.discountPer = discountPer;

    // Recalculate final price
    product.finalPrice = calculateFinalPrice(product.originalPrice, product.discountPer);

    res.json({ message: 'Product updated', product });
});

// Root route
app.get('/', (req, res) => {
    res.send('🛍️ Welcome to the Product Management API');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
