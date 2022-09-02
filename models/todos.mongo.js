const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
  todoNumber: {
    type: Number,
    required: true,
    default: 100,
    min: 100,
    max: 999,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed:{
    type : Boolean,
    required : true,
    default : false
  }
});

module.exports = mongoose.model('todo', todosSchema);