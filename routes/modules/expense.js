// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Record = require('../../models/record')
const CategoryModel = require('../../models/category')

router.get('/new', (req, res) => {

})

router.post('/new/create', (req, res) => {

})

router.get('/:recordId/edit', (req, res) => {

})

router.get('/:recordId/edit/succeed', (req, res) => {

})

router.put('/:recordId', (req, res) => {

})

router.delete('/:recordId', (req, res) => {

})

// 匯出路由模組
module.exports = router