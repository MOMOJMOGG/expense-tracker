// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const moment = require('moment')
// 引用 Todo model
const Record = require('../../models/record')
const CategoryModel = require('../../models/category')

router.get('/new', async (req, res) => {
  const categories = await CategoryModel.find().lean().sort({ _id: 'asc' })
  res.render('new', { categories, init: true })
})

router.post('/new/create', (req, res) => {
  const newRec = req.body
  console.log(newRec)
  res.render('new', { newRec, option: newRec.category, suboption: newRec.subcategory })
})

router.get('/select/:category', async (req, res) => {
  const { category } = req.params
  const categories = await CategoryModel.find().lean().sort({ _id: 'asc' })
  const targetCategory = categories.find(cat => cat.category_en === category)
  console.log(targetCategory)
  res.render('new', { categories, targetCategory })
})

router.get('/:recordId/edit', (req, res) => {
  const recordId = req.params.recordId
  Record.findById(recordId)
    .lean()
    .then(rec => {
      rec.date = moment(rec.date).format('YYYY-MM-DD')
      res.render('edit', { rec })
    })
    .catch(err => console.log(err))
})

router.get('/:recordId/edit/succeed', (req, res) => {
  const recordId = req.params.recordId
  Record.findById(recordId)
    .lean()
    .then(rec => {
      rec.date = moment(rec.date).format('YYYY-MM-DD')
      res.render('edit', { rec, createSucceed: true })
    })
    .catch(err => console.log(err))
})

router.put('/:recordId', (req, res) => {

})

router.delete('/:recordId', (req, res) => {

})



// 匯出路由模組
module.exports = router