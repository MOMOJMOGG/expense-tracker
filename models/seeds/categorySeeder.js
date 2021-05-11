const CategoryModel = require('../category') // 載入 category model
const categoryList = require('../../category.json') // 載入 category json 資料

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('Connected to MongoDB -- CategoryModel!')
  const promise = []

  categoryList.results.forEach(category => {
    promise.push(
      CategoryModel.create({
        type: category.type,
        name: category.name,
        icon: category.icon,
        subcategory: category.subcategory
      })
    )
  })
  console.log('CategoryModel Seeder Creating Finished!')

  Promise.all(promise).then(() => {
    db.close()
    console.log('MongoDB Connected Closed')
  })
})