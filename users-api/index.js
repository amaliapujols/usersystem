require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mongodb = process.env.MONGODB;
console.log(mongodb)
mongoose.connect(mongodb);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('connected', () => console.log('Database Connected'));

const app = express();
app.use(cors({
  origin: '*'
}))

const routes = require('./routes/routes');
app.use('/api', routes);

app.listen(3000, () => {
  console.log(`Server Started on PORT 3000`);
});