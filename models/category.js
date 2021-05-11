const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('CategoryModel', categorySchema)