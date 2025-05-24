const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    codeCategory: {
        type: String,
        required: true,
    },
    nameProduct: {
        type: String,
        required: true,
    },
    imgProduct: {
        type: String,
        default: '',
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Detail', detailSchema);
