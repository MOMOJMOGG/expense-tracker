// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const moment = require('moment')
// 引用 Todo model
const Record = require('../../models/record')
const CategoryModel = require('../../models/category')

router.get('/new', async (req, res) => {
  const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).then(categories => {
    return categories
  }).catch(err => console.log(err))
  res.render('new', { categories, init: true, subInit: true })
})

router.post('/new/create', async (req, res) => {
  const newRec = req.body
  const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).then(categories => { return categories }).catch(err => console.log(err))
  const cateTarget = categories.find(cat => cat.category_en === newRec.category)
  const chosenSubCategory = cateTarget.subcategory[Number(newRec.subcategory)]

  Record.create({
    type: cateTarget.type,
    name: newRec.name,
    category: cateTarget.category,
    subcategory: chosenSubCategory,
    date: newRec.date,
    amount: newRec.amount,
    location: newRec.location,
    receipt: newRec.receipt
  })
    .then(() => res.render('new', { categories, newRec, chosenCategory: cateTarget.category, chosenSubCategory, createSucceed: true }))
    .catch(err => console.log(err))
})

router.get('/:recordId/edit', async (req, res) => {
  const recordId = req.params.recordId
  const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).then(categories => { return categories }).catch(err => console.log(err))
  Record.findById(recordId)
    .lean()
    .then(rec => {
      rec.date = moment(rec.date).format('YYYY-MM-DD')
      res.render('edit', { categories, record })
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