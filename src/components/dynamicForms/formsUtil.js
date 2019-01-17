/*
*  表单工具
* */
export class FormsUtil {
  constructor (formList) {
    this.formList = formList
  }

  // 初始化表单数据
  init () {}

  // 验证
  verify () {}

  // 保存
  save () {}

  static getInstance (formList) {
    if (!FormsUtil.instance) {
      FormsUtil.instance = new FormsUtil(formList)
    }
    return FormsUtil.instance
  }
}
