// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const moment = require('moment')
// 引用 Todo model
const Record = require('../../models/record')
const CategoryModel = require('../../models/category')
const category = require('../../models/category')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(record => {
      record.forEach(async (r) => {
        const targetIcon = await CategoryModel.find().where('name').equals(r.category).then(category => {
          return category[0].icon
        })

        r.icon = targetIcon
        r.date = moment(r.date).format('YYYY-MM-DD')
      })
      res.render('index', { record })
    })
})

router.post('/', (req, res) => {

})

// 匯出路由模組
module.exports = router