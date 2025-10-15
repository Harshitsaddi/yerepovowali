const Product = require('../models/Product.model');

const createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
};

const getProducts = async () => {
    return await Product.find();
};

const getProductById = async (id) => {
    return await Product.findById(id);
};

const updateProduct = async (id, data) => {
    if(data.product_price || data.discount){
        data.actual_price = (data.product_price || 0) - ((data.product_price || 0) * ((data.discount || 0)/100));
    }
    return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
};

const getSecondMaxPrice = async () => {
    const products = await Product.find()
        .sort({ product_price: -1 }) // highest first
        .skip(1)                     // skip the max
        .limit(1);                   // get second max
    return products[0]; // may be undefined if less than 2 products
};

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getSecondMaxPrice
};
