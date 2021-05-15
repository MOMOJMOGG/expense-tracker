const Record = require('../record') // 載入 record model
const { records } = require('./rawdata.json') // 載入 record json 資料

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('Connected to MongoDB -- Record!')

  Record.create(records)
    .then(() => {
      console.log('Record Seeder Creating Finished!')
      return db.close()
    })
    .then(() => console.log('MongoDB Connected Closed!'))
    .catch(error => console.log(error))
  // Promise Method
  // const promise = []
  // recordsList.results.forEach(record => {
  //   promise.push(
  //     Record.create({
  //       type: record.type,
  //       name: record.name,
  //       category: record.category,
  //       subcategory: record.subcategory,
  //       date: record.date,
  //       amount: record.amount,
  //       location: record.location,
  //       receipt: record.receipt
  //     })
  //   )
  // })
  // 
  // Promise.all(promise).then(() => {
  //   db.close()
  //   console.log('MongoDB Connected Closed')
  // })
})
