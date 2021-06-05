// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const moment = require('moment')
// 引用 Todo model
const Record = require('../../models/record')
const CategoryModel = require('../../models/category')
const checkStrLength = require('../../public/javascripts/checkStrLength')
const regex = require('../../public/javascripts/regex')

router.get('/new', async (req, res) => {
  try {
    const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).exec()
    return res.render('new', { categories, init: true, subInit: true })
  } catch (err) {
    console.warn(err)
  }
})

router.post('/new', async (req, res) => {
  try {
    const userId = req.user._id
    const newRec = req.body
    const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).exec()
    const errors = []

    if (!newRec.name || !newRec.category || !newRec.subcategory || !newRec.date || !newRec.amount) {
      errors.push({ message: '有必填欄位為空白，或尚未選取。' })
      return res.render('new', { errors, categories, newRec, init: true, subInit: true })
    }
    if (newRec.amount < 0) {
      errors.push({ message: '金額不得為負數。' })
    }
    if (checkStrLength(newRec.name, 20) || checkStrLength(newRec.location, 20) || checkStrLength(newRec.merchant, 20)) {
      errors.push({ message: '項目名稱、地點、店家字數不得超過 20。' })
    }
    if (!regex.matchReceipt(newRec.receipt)) {
      errors.push({ message: '發票格式不符，範例: AC-77777777。' })
    }
    if (errors.length) {
      const cateTarget = categories.find(cat => cat.category_en === newRec.category)
      newRec.subcategory = cateTarget.subcategory[Number(newRec.subcategory)]
      return res.render('new', { errors, categories, newRec })
    }

    const cateTarget = categories.find(cat => cat.category_en === newRec.category)

    const record = await Record.create({
      type: cateTarget.type,
      name: newRec.name,
      category: cateTarget.category,
      subcategory: cateTarget.subcategory[Number(newRec.subcategory)],
      date: newRec.date,
      amount: newRec.amount,
      location: newRec.location,
      merchant: newRec.merchant,
      receipt: newRec.receipt,
      userId
    })
    const recordId = record._id
    req.flash('success_msg', '支出新增成功, 可繼續更新或回到首頁!')
    return res.redirect(`/expense/${recordId}/edit`)

  } catch (err) {
    console.warn(err)
  }
})

router.get('/:recordId/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const { recordId } = req.params

    const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).exec()
    const record = await Record.findOne({ _id: recordId, userId }).lean().exec()
    record.date = moment(record.date).format('YYYY-MM-DD')
    const category_en = categories.find(cat => cat.category === record.category).category_en
    return res.render('edit', { categories, record, category_en })
  } catch (err) {
    console.warn(err)
  }
})


router.put('/:recordId', async (req, res) => {
  try {
    const userId = req.user._id
    const { recordId } = req.params
    const options = req.body
    const categories = await CategoryModel.find().lean().sort({ _id: 'asc' }).exec()
    const errors = []

    if (!options.name || !options.category || !options.subcategory || !options.date || !options.amount) {
      errors.push({ message: '有必填欄位為空白。' })
      req.flash('errors', errors)
      return res.redirect(`/expense/${recordId}/edit`)
    }
    if (options.amount < 0) {
      errors.push({ message: '金額不得為負數。' })
    }
    if (checkStrLength(options.name, 20) || checkStrLength(options.location, 20) || checkStrLength(options.merchant, 20)) {
      errors.push({ message: '項目名稱、地點、店家字數不得超過 20。' })
    }
    if (!regex.matchReceipt(options.receipt)) {
      errors.push({ message: '發票格式不符，範例: AC-77777777。' })
    }
    if (errors.length) {
      req.flash('errors', errors)
      return res.redirect(`/expense/${recordId}/edit`)
    }

    const cateTarget = categories.find(cat => cat.category_en === options.category)
    options.category = cateTarget.category
    options.subcategory = cateTarget.subcategory[Number(options.subcategory)]
    const record = await Record.findOneAndUpdate({ _id: recordId, userId }, options).exec()
    req.flash('success_msg', '支出更新成功, 可繼續更新或回到首頁!')
    return res.redirect(`/expense/${recordId}/edit`)
  } catch (err) {
    console.warn(err)
  }
})

router.delete('/:recordId', async (req, res) => {
  try {
    const userId = req.user._id
    const { recordId } = req.params
    await Record.findOneAndDelete({ _id: recordId, userId }).exec()
    req.flash('success_msg', '支出刪除成功!')
    return res.redirect('/')
  } catch (err) {
    console.warn(err)
  }
})


// 匯出路由模組
module.exports = router