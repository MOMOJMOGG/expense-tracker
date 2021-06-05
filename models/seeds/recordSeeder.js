const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record') // 載入 record model
const User = require('../user')     // 載入 user model
const { records, users } = require('./rawdata.json') // 載入 record json 資料

const db = require('../../config/mongoose')

db.once('open', async () => {
  try {
    // create user
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(users[0].password, salt)
    const user = await User.create({ name: users[0].name, email: users[0].email, password: hash })
    if (user) {
      console.log('User Seeder Creating Finished!')
      const userId = user._id
      const mapRecords = records.map((item) => {
        item.userId = userId
        return item
      })

      // create records
      const record = await Record.create(mapRecords)
      if (record) {
        console.log('Record Seeder Creating Finished!')
        await db.close()
        console.log('MongoDB Connected Closed!')
      }
    }
  } catch (err) {
    return console.warn(err)
  }
})
