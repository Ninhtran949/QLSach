const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  
  idProduct: { type: Number, default: '' },
  idCart: { type: Number, default: '' },
  idCategory: { type: Number, default: '' },
  imgProduct: { type: String, default: '' },
  idPartner: { type: String, default: '' },
  nameProduct: { type: String, default: '' },
  userClient: { type: String, default: ''},
  priceProduct: { type: Number, default: '' },
  numberProduct: { type: Number, default: '' },
  totalPrice: { type: Number, default: '' }
});

module.exports = mongoose.model('Cart', cartSchema);
