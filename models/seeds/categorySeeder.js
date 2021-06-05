if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const CategoryModel = require('../category') // 載入 category model
const { categories } = require('./rawdata.json') // 載入 category json 資料

const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    const categoryList = await CategoryModel.create(categories)
    if (categoryList) {
      console.log('CategoryModel Seeder Creating Finished!')
      await db.close()
      console.log('MongoDB Connected Closed!')
    }
  } catch (err) {
    return console.warn(err)
  }
})