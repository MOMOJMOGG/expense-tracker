// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/record')
const CategoryModel = require('../../models/category')
const moment = require('moment')

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).exec()
    const records = await Record.find({ userId }).lean().sort({ date: 'desc' }).exec()
    let sortedRecords = []

    let { month, sortType } = req.query
    if (!month && !sortType) {
      return res.render('index', { record: records, categories, init: true })
    } else {
      // 考慮月份與類別篩選
      if (month !== 'all' && sortType !== 'default') {
        const sortByMonth = records.filter((item) => {
          const formatDate = moment(item.date).format('YYYY-MM-DD')
          const dateSlice = formatDate.slice(0, 7)
          return dateSlice === month
        })
        if (sortByMonth.length !== 0) {
          const categoryCn = categories.find((cate) => { return cate.category_en === sortType }).category
          sortedRecords = sortByMonth.filter((item) => {
            return item.category === categoryCn
          })
        }
      } else if (month === 'all') {
        const categoryCn = categories.find((cate) => { return cate.category_en === sortType }).category
        sortedRecords = records.filter((item) => {
          return item.category === categoryCn
        })
      } else if (sortType === 'default') {
        sortedRecords = records.filter((item) => {
          const formatDate = moment(item.date).format('YYYY-MM-DD')
          const dateSlice = formatDate.slice(0, 7)
          return dateSlice === month
        })
      }
      return res.render('index', { record: sortedRecords, categories, month, sortType })
    }
  } catch (err) {
    return console.warn(err)
  }
})

router.post('/', (req, res) => {
  let { month, sortType } = req.body
  if (month === '') {
    month = 'all'
  }
  return res.redirect(`/?month=${month}&sortType=${sortType}`)
})

// 匯出路由模組
module.exports = router