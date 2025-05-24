const express = require('express');
const router = express.Router();
const Partner = require('../models/Partner');

// Lấy tất cả các Partner
router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy Partner theo idPartner (ép kiểu thành số)
router.get('/:idPartner', async (req, res) => {
  try {
    const partner = await Partner.findOne({ idPartner: parseInt(req.params.idPartner) });
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }
    res.status(200).json(partner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tạo mới Partner
router.post('/', async (req, res) => {
  const partner = new Partner({
    addressPartner: req.body.addressPartner,
    idPartner: req.body.idPartner, // Dữ liệu cần là số
    imgPartner: req.body.imgPartner,
    namePartner: req.body.namePartner,
    passwordPartner: req.body.passwordPartner,
    userPartner: req.body.userPartner
  });

  try {
    const newPartner = await partner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật Partner theo idPartner (ép kiểu thành số)
router.patch('/:idPartner', async (req, res) => {
  try {
    const partner = await Partner.findOne({ idPartner: parseInt(req.params.idPartner) });
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    // Cập nhật các trường nếu có trong request body
    if (req.body.addressPartner) partner.addressPartner = req.body.addressPartner;
    if (req.body.imgPartner) partner.imgPartner = req.body.imgPartner;
    if (req.body.namePartner) partner.namePartner = req.body.namePartner;
    if (req.body.passwordPartner) partner.passwordPartner = req.body.passwordPartner;
    if (req.body.userPartner) partner.userPartner = req.body.userPartner;

    const updatedPartner = await partner.save();
    res.status(200).json(updatedPartner);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa Partner theo idPartner (ép kiểu thành số)
router.delete('/:idPartner', async (req, res) => {
  try {
    const partner = await Partner.findOne({ idPartner: parseInt(req.params.idPartner) });
    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    await partner.deleteOne();
    res.status(200).json({ message: 'Partner deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
