const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_price: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // percentage
    actual_price: { type: Number } // will calculate before save
});

productSchema.pre('save', function(next) {
    this.actual_price = this.product_price - (this.product_price * (this.discount / 100));
    next();
});

module.exports = mongoose.model('Product', productSchema);
