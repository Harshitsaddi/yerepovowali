const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory array to store products
let products = [];

// POST: Add new product
app.post('/product-info', (req, res) => {
    const { id, name, price } = req.body;
    if (!id || !name || !price) {
        return res.status(400).json({ error: 'All fields are required (id, name, price)' });
    }

    const existing = products.find(p => p.id === id);
    if (existing) {
        return res.status(409).json({ error: 'Product with this ID already exists' });
    }

    products.push({ id, name, price });
    res.status(201).json({ message: 'Product added', product: { id, name, price } });
});

// GET: Retrieve all products
app.get('/product-info', (req, res) => {
    res.json(products);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Product Management API!');
});


// PUT: Update product by ID
app.put('/product-info/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    if (name) product.name = name;
    if (price) product.price = price;

    res.json({ message: 'Product updated', product });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
