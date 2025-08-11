const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    originalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    discountPer: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    finalPrice: {
        type: Number
    }
});

// Pre-save hook to calculate final price before saving
productSchema.pre('save', function (next) {
    this.finalPrice = this.originalPrice - (this.originalPrice * this.discountPer / 100);
    next();
});

module.exports = mongoose.model('Product', productSchema);
