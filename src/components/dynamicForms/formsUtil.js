/*
*  表单工具
* */
export class FormsUtil {
  constructor (formList) {
    this.formList = formList
  }

  // 初始化
  init () {
    return this.formList.map(item => {
      switch (Number(item.elementId)) {
        case 1:
          // 文本框
          break
        case 2:
          // 多行文本
          break
        case 3:
          // 数字框
          break
        case 4:
          // 单选框
          break
        case 5:
          // 多选
          if (!item.value) {
            item.value = []
          }
          break
        case 6:
          // 日期时间
          item.showPopup = false
          switch (item.datatimeformat) {
            case 'yyyy-MM-dd':
              item.datatimeformat = 'date'
              item.minDate = undefined
              item.maxDate = undefined
              item.val = '123'
              break
            case 'yyyy-MM-dd HH':
              item.datatimeformat = 'datetime'
              item.minDate = undefined
              item.maxDate = undefined
              item.val = '123'
              break
            case 'yyyy-MM-dd HH:mm':
              item.datatimeformat = 'datetime'
              item.minDate = undefined
              item.maxDate = undefined
              item.val = '123'
              break
          }
          console.log(item)
          break
        case 7:
          // 数据源
          break
        case 8:
          // 附件
          break
        case 9:
          // 下拉框
          break
        case 10:
          // 表单元素
          break
        case 11:
          // 审批元素
          break
        case 12:
          // 抄送元素
          break
        case 13:
          // 照片上传
          item.uploadObjArr = []
          item.localIds = []
          if (item.value) {
            item.localIds = item.value
          }
          break
      }
      return item
    })
  }

  // 验证
  verify () {
    console.log(this.formList)
  }

  // 保存
  save () {
    console.log(this.formList)
  }

  static getInstance (formList) {
    if (!FormsUtil.instance) {
      FormsUtil.instance = new FormsUtil(formList)
    }
    return FormsUtil.instance
  }
}
