const expressLib = require('express');
const mongooseLib = require('mongoose');
const corsLib = require('cors');
const itemCtrl = require('./controllers/itemController');

const server = expressLib();
const serverPort = 3000;

mongooseLib.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2', { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongooseLib.connection;

database.on('error', console.error.bind(console, 'MongoDB connection error:'));
database.once('open', function() {
  console.log('Connected to MongoDB');
});

server.use(corsLib());
server.use(expressLib.json());

server.get('/', (request, response) => {
  response.json({ message: 'Welcome to DressStore application.' });
});

server.get('/api/products', itemCtrl.getAllItems);
server.get('/api/products/:id', itemCtrl.getItemById);
server.post('/api/products', itemCtrl.addNewItem);
server.put('/api/products/:id', itemCtrl.updateItemById);
server.delete('/api/products/:id', itemCtrl.removeItemById);
server.delete('/api/products', itemCtrl.removeAllItems);
server.get('/api/products/search', itemCtrl.findItemsByName);

server.listen(serverPort, () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
});