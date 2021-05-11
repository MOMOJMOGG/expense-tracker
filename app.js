const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()

const app = express()
const port = 3000

app.use(express.urlencoded({
  extended: true
}));

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

// home page
app.get('/', (req, res) => {
  console.log('Run App.js')
})

// listening
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})