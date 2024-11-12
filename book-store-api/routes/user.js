const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single User by ID
router.get('/id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id: id });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get user by phonenumber
router.get('/phone/:phoneNumber', async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber;
    const user = await User.findOne({ phoneNumber: phoneNumber });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new User
router.post('/signup', async (req, res) => {
  const user = new User({
    address: req.body.address,
    id: req.body.id,
    name: req.body.name,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    strUriAvatar: req.body.strUriAvatar || ''
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a User by ID
router.patch('/id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id: id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    if (req.body.address !== undefined) user.address = req.body.address;
    if (req.body.name !== undefined) user.name = req.body.name;
    if (req.body.password !== undefined) user.password = req.body.password;
    if (req.body.phoneNumber !== undefined) user.phoneNumber = req.body.phoneNumber;
    if (req.body.strUriAvatar !== undefined) user.strUriAvatar = req.body.strUriAvatar;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a User by ID
router.delete('/id/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ id: id });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.deleteOne();
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
