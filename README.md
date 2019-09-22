# 家庭簡易記帳本 Household Expense tracker

這是一個簡易的家庭用記帳本

使用者可以透過本地登入、FB 或是 Google 登入使用此 APP。

登入後可以進行新增支出、編輯支出、刪除支出以及瀏覽各項支出等功能

提供兩個篩選器:支出分類以及月份，主畫面則會顯示篩選出來的支出以及對應的總額。

（尚未更新）此應用程式同時也發布在 Heroku 上，可以藉由此連結直接試用。

### 由於此應用程式並未在 Facebook & Google 發布，FB & google 登入時會回報錯誤。

導入種子資料後，可透過兩個使用者做使用測試

This is a simple expense-tracker application. Users may choose diffrent ways to login.(Facebook,Google or local login)

All features can only be used after logging in. Users may check/add/edit/delete their expense records and the monthly total will be displayed on the home page.

The application also provide two filters "Month" and "Category" to better find out where their money has been!

(Not yet)Finally, this application has been deployed to Heroku. Check it out on...

### #Warnning

Since the application hasn't been released on both Facebook & Google,the related login features will go wrong.

## Prerequisites

You need to install following software

- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)

## Getting Started

```
# Clone the repository:
git clone https://github.com/windate3411/expense-tracker.git

# Install NPM dependencies
npm install

# Create sample data
npm run seeder

# Create .env file which contains following info under project directory

FACEBOOK_ID=XXXXXXXX
FACEBOOK_SECRET=XXXXXXXX
FACEBOOK_CALLBACK=http://example.com/auth/facebook/callback

GOOGLE_ID=XXXXXXXX
GOOGLE_SECRET=XXXXXXXX
GOOGLE_CALLBACK=http://example.com/auth/google/callback


# Start the app
npm run dev

And you will see the following message

you are now listening at port 3000
db connected!

just type the http://localhost:3000
```

## 作者 Author

- **Samuel Yeh**
