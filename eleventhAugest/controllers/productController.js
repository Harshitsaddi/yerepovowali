const Product = require('../models/Product');

class ProductController {
    // Create a product
    static async createProduct(req, res) {
        try {
            const product = new Product(req.body); // finalPrice will auto-calculate
            await product.save();
            res.status(201).json({ message: 'Product created successfully', product });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get all products
    static async getProducts(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;
