const { check: checkValidator } = require("express-validator");

module.exports = {
  newRecordCheck: [
    checkValidator("name")
      .not()
      .isEmpty()
      .withMessage("支出項目必填~"),
    checkValidator("amount")
      .isInt({ gt: 0 })
      .withMessage("金額必須大於零~")
      .not()
      .isEmpty()
      .withMessage("金額必填~"),
    checkValidator("category")
      .not()
      .isEmpty()
      .withMessage("類別必選~"),
    checkValidator("date")
      .not()
      .isEmpty()
      .withMessage("日期必選~")
      .isISO8601()
      .withMessage("請填入標準日期格式")
  ],
  newUserCheck: [
    checkValidator("name")
      .not()
      .isEmpty()
      .withMessage("名稱必填~"),
    checkValidator("email")
      .not()
      .isEmpty()
      .withMessage("信箱必填~")
      .isEmail()
      .withMessage("請輸入正確 Email 格式"),
    checkValidator("password")
      .not()
      .isEmpty()
      .withMessage("密碼必填~")
      .isLength({ min: 8 })
      .withMessage("密碼須至少8個字元!")
  ]
};
