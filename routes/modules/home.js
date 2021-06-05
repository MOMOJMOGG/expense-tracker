// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/record')
const CategoryModel = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const records = await Record.find().lean().sort({ date: 'desc' }).exec()
    const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).exec()
    res.render('index', { record: records, categories, init: true })
  } catch (err) {
    return console.warn(err)
  }
})

router.post('/', async (req, res) => {
  const { sortType } = req.body
  let records = []
  const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).then(categories => { return categories }).catch(err => console.log(err))

  if (sortType === "default") {
    records = await Record.find().lean().sort({ date: 'desc' }).then(records => { return records }).catch(err => console.log(err))
  } else {
    const targetCategory = categories.find(cat => cat.category_en === sortType)
    records = await Record.find({ category: targetCategory.category }).lean().sort({ date: 'desc' }).then(records => { return records }).catch(err => console.log(err))
  }

  if (records.length === 0) {
    res.render('searchErr', { categories })
  } else {
    res.render('index', { record: records, categories, sortType })
  }
})

// 匯出路由模組
module.exports = router