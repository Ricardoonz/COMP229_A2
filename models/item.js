const mongooseLib = require('mongoose');

const itemSchema = new mongooseLib.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
});

const Item = mongooseLib.model('Item', itemSchema);

module.exports = Item;