const CategoryModel = require('../category') // 載入 category model
const { categories } = require('./rawdata.json') // 載入 category json 資料

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('Connected to MongoDB -- CategoryModel!')

  CategoryModel.create(categories)
    .then(() => {
      console.log('CategoryModel Seeder Creating Finished!')
      return db.close()
    })
    .then(() => console.log('MongoDB Connected Closed!'))
    .catch(error => console.log(error))
  // Promise Method
  // const promise = []
  // categoryList.results.forEach(category => {
  //   promise.push(
  //     CategoryModel.create({
  //       type: category.type,
  //       nacategoryme: category.category,
  //       category_en: category.category_en,
  //       icon: category.icon,
  //       subcategory: category.subcategory
  //     })
  //   )
  // })
  // 
  // Promise.all(promise).then(() => {
  //   db.close()
  //   console.log('MongoDB Connected Closed')
  // })
})