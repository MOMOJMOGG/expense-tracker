// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/record')
const CategoryModel = require('../../models/category')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {

})

// 匯出路由模組
module.exports = router