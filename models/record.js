const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  type: {
    type: String,
    require: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  receipt: {
    type: String,
    require: false
  }
})

module.exports = mongoose.model('Record', recordSchema)