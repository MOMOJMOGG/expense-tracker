const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
const moment = require('moment')
const multihelpers = hbshelpers()
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('hbs', exphbs({
  defaultLayout: 'main', extname: '.hbs', helpers: {
    formDate: function (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    mapIcon: function (categories, target) {
      const category = categories.find(cat => cat.category === target)
      return category.icon
    },
    mapSubCategory: function (categories, target) {
      const category = categories.find(cat => cat.category === target)
      let optionList = ''
      let idx = 0
      category.subcategory.forEach(sub => {
        optionList += `<option value="${idx}" >${sub}</option >`
        idx += 1
      })
      return optionList
    }
  }
}))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use(express.urlencoded({
  extended: true
}));

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})