const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  category_en: {
    type: String,
    require: true
  },
  icon: {
    type: String,
    required: true
  },
  subcategory: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('CategoryModel', categorySchema)