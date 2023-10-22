const Item = require('../models/item');

exports.getAllItems = async (request, response) => {
  try {
    const items = await Item.find();
    response.json(items);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.getItemById = async (request, response) => {
  try {
    const item = await Item.findById(request.params.id);
    if (!item) {
      return response.status(404).json({ message: 'Item not found' });
    }
    response.json(item);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.addNewItem = async (request, response) => {
  const { name, description, price, quantity, category } = request.body;

  try {
    const newItem = new Item({ name, description, price, quantity, category });
    const savedItem = await newItem.save();
    response.status(201).json(savedItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

exports.updateItemById = async (request, response) => {
  const { name, description, price, quantity, category } = request.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      request.params.id,
      { name, description, price, quantity, category },
      { new: true }
    );

    if (!updatedItem) {
      return response.status(404).json({ message: 'Item not found' });
    }

    response.json(updatedItem);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

exports.removeItemById = async (request, response) => {
  try {
    const removedItem = await Item.findByIdAndRemove(request.params.id);

    if (!removedItem) {
      return response.status(404).json({ message: 'Item not found' });
    }

    response.json({ message: 'Item removed successfully' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.removeAllItems = async (request, response) => {
  try {
    await Item.deleteMany();
    response.json({ message: 'All items removed successfully' });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

exports.findItemsByName = async (request, response) => {
  const { name } = request.query;

  try {
    const items = await Item.find({ name: { $regex: name, $options: 'i' } });
    response.json(items);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
