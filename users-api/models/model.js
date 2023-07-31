const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number
  },
  email: {
    required: true,
    type: String,
  },
  telephone: {
    required: true,
    type: String,
  }
});

module.exports = mongoose.model('Users', dataSchema);