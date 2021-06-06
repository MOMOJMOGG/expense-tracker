# MO哩記帳本 expense-tracker version 2.0

一個基於 Node.js 的 Express 框架 & MongoDB 練習專案，包含 async/await 語法糖、passport.js、facebook API 登入等。

## Heroku 專案 Demo
[小小記帳本](https://stark-harbor-58371.herokuapp.com/)

## 專案畫面 Demo
[<img align="center" src="https://github.com/MOMOJMOGG/expense-tracker/blob/master/public/images/login.png" height="250" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/expense-tracker/blob/master/public/images/homev2.png" height="480" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/expense-tracker/blob/master/public/images/edits.png" height="300" width="500" />]()
[<img align="center" src="https://github.com/MOMOJMOGG/expense-tracker/blob/master/public/images/sorts.png" height="250" width="500" />]()

## 功能描述 - Features
- 登入才能使用記帳網頁，包含使用者驗證與錯誤回報 **--version 4.0 新增功能**
  - 密碼有使用加密處理 
- 能註冊一組使用者帳號，包含登入資訊驗證與錯誤回報 **--version 4.0 新增功能**
  - 密碼有使用加密處理
- 能使用臉書進行登入 **--version 4.0 新增功能**
- 每個使用者的記帳列表互相獨立 **--version 4.0 新增功能**
- 瀏覽所有記帳清單，包含: 項目名稱、日期、價格、類別、清單總金額
  - 點選 **項目卡片** 顯示詳細資訊，包含: 項目名稱、類別、子類別、日期、金額、地點、店家、發票編號
  - 點選 **`Edit`** 可以編輯一筆支出明細
  - 點選 **`Delete`** 可以刪除一筆支出明細
  - 點選 **Create** 可以新增一筆支出明性
- 編輯支出明細資訊，包含: 項目名稱、類別、子類別、日期、金額、地點、店家、發票編號
  - 點選 **類別** 可以選擇一項類別，並列出該類別之所有子類別
  - 點選 **`Update`** 可以更新一筆支出明細
  - 點選 **`Delete`** 可以刪除一筆支出明細
  - 點選 **`Back to Home Page`** 可以回到首頁
  - 含表單驗證，與錯誤/更新成功訊息通知 **--version 4.0 新增功能**
- 新增支出明細資訊，包含: 項目名稱、類別、子類別、日期、金額、地點、店家、發票編號
  - 點選 **類別** 可以選擇一項類別，並列出該類別之所有子類別
  - 點選 **`Create`** 可以新增一筆支出明細
  - 點選 **`Back to Home Page`** 可以回到首頁
  - 含表單驗證，與錯誤/新增成功訊息通知 **--version 4.0 新增功能**
- 可依照**類別**與**月份**進行記帳清單篩選，並顯示出總金額 **--version 4.0 新增功能**


## 環境建置需求與套件版本 - Prerequisies & Package Version
- 開發平台: [Visual Studio Code](https://code.visualstudio.com/download)
- 開發環境: [Node.js](https://nodejs.org/en/) - v10.15.0
- 開發框架: [Express](https://expressjs.com/en/starter/installing.html) - v4.17.1
- 開發套件: [Express-handlebars](https://www.npmjs.com/package/express-handlebars) - v5.3.0
- 開發套件: [Nodemon](https://www.npmjs.com/package/nodemon) - v2.0.7
- 開發套件: [method-override](https://www.npmjs.com/package/method-override) - v3.0.0
- 開發套件: [moment](https://www.npmjs.com/package/moment) - v2.29.1
- 開發套件: [bcryptjs](https://www.npmjs.com/package/bcryptjs) -v2.4.3
- 開發套件: [connect-flash](https://www.npmjs.com/package/connect-flash) -v0.1.1
- 開發套件: [passport](https://www.npmjs.com/package/passport) -v0.4.1
- 開發套件: [passport-local](https://www.npmjs.com/package/passport-local) -v1.0.0
- 開發套件: [passport-facebook](https://www.npmjs.com/package/passport-facebook) -v3.0.0
- 開發套件: [dotenv](https://www.npmjs.com/package/dotenv) - v10.0.0
- 開發資料庫: [MongoDB](https://www.mongodb.com/) - v4.2.13
- 開發資料庫套件: [Mongoose](https://www.npmjs.com/package/mongoose) - (MongoDB 的 ODM) v5.12.6


## 安裝與執行步驟 - Installation & Execution
1. 打開你的終端機(Terminal)，git clone 此專案至本機電腦，或直接從 github 下載並解壓縮此專案

```
git clone https://github.com/MOMOJMOGG/expense-tracker.git
```

2. 在終端機下指令，進入存放此專案的資料夾，Ex: 放置此專案位置 D://expense-tracker

```
cd D://expense-tracker
```

3. 在終端機下指令，安裝此專案需要的 npm 套件

```
npm install
```

4. 在終端機下指令，匯入餐廳資料種子檔案

```
npm run seed
```

5. 當終端機出現以下字樣，表示種子檔案已成功匯入 MongoDB 中，結束匯入動作

```
MongoDB connected!
CategoryModel Seeder Creating Finished!
MongoDB Connected Closed!
MongoDB connected!
User Seeder Creating Finished!
Record Seeder Creating Finished!
MongoDB Connected Closed!
```

6. 運行 start 腳本指令，啟動專案伺服器

```
npm run start
```

7. 當終端機出現以下字樣，表示伺服器已啟動成功

```
App is running on http://localhost:3000.
MongoDB connected!
```

8. 可以使用下列種子帳密進行登入，或註冊一組帳密

```
帳號: user1@example.com
密碼: 12345678
```

9. 在終端機下指令 Ctrl+C 兩次，關閉伺服器

10. (Option) 若想在此專案使用開發者模式，在終端機下指令，安裝 nodemon 套件，幫助自動重啟伺服器。在第四步驟，改運行 dev 腳本指令，啟動專案伺服器

```
npm install -g nodemon

npm run dev
```


## 專案開發人員 - Contributor

> [MOMOJ](https://github.com/MOMOJMOGG)
