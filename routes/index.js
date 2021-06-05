// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

router.use('/expense', authenticator, expense)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router