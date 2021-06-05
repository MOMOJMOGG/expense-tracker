const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const moment = require('moment')
const routes = require('./routes')
const usePassport = require('./config/passport') // 載入設定檔，要寫在 express-session 以後
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    checkEmpty: (str) => {
      if (str === '') {
        return '你'
      } else {
        return str
      }
    },
    formDate: function (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    formAmount: function (amount) {
      return amount.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    match: function (strA, strB) {
      return strA === strB
    },
    mapIcon: function (categories, target) {
      const category = categories.find(cat => cat.category === target)
      return category.icon
    },
    calcSum: function (records) {
      let sum = 0
      if (records.length === 0) {
        return sum
      } else {
        records.forEach(rec => {
          sum += rec.amount
        })
        return sum.toString().replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
  }
}))
app.set('view engine', 'hbs')

require('./config/mongoose')

app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  res.locals.errors = req.flash('errors')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})