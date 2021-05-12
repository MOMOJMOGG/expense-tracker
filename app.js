const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
const multihelpers = hbshelpers()
const routes = require('./routes') // 引用路由器
require('./config/mongoose') // 引用資料庫

const app = express()
const port = 3000

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// setting static files
app.use(express.static('public'))

app.use(express.urlencoded({
  extended: true
}));

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')

// 將 request 導入路由器
app.use(routes)

// listening
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})