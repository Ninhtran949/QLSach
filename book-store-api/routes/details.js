const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Detail = require('../models/Detail');

// Thêm chi tiết sản phẩm (người dùng chỉ cung cấp 'author' và 'description')
router.post('/:codeProduct', async (req, res) => {
    try {
        const product = await Product.findOne({ codeProduct: req.params.codeProduct });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const detail = new Detail({
            codeCategory: product.codeCategory,
            nameProduct: product.nameProduct,
            imgProduct: product.imgProduct,
            author: req.body.author,
            description: req.body.description
        });

        // Lưu chi tiết sản phẩm
        const newDetail = await detail.save();
        res.status(201).json(newDetail);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
