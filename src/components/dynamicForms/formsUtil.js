/*
*  表单工具
* */
export class FormsUtil {
  // 初始化
  init (formList) {
    return formList.map(item => {
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
              // 设置时间类型
              item.datatimeformat = 'date'
              // 设置最小时间
              if (item.datatimemin) {
                item.datatimemin = new Date(item.datatimemin)
              } else {
                item.datatimemin = new Date('1900-01-01')
              }
              // 设置最大时间
              if (item.datatimemax) {
                item.datatimemax = new Date(item.datatimemax)
              } else {
                item.datatimemax = new Date('2050-12-31')
              }
              // 设置默认值至文本框
              item.val = item.value
              // 判断是否有默认值，初始化日期控件
              if (!item.value) {
                item.value = new Date()
              } else {
                item.value = new Date(item.value)
              }
              break
            case 'yyyy-MM-dd HH':
              // 设置时间类型
              item.datatimeformat = 'datetime'
              // 设置最小时间
              if (item.datatimemin) {
                item.datatimemin = new Date(`${item.datatimemin}:00`)
              } else {
                item.datatimemin = new Date('1900-01-01')
              }
              // 设置最大时间
              if (item.datatimemax) {
                item.datatimemax = new Date(`${item.datatimemax}:00`)
              } else {
                item.datatimemax = new Date('2050-12-31')
              }
              // 设置默认值至文本框
              item.val = item.value
              // 判断是否有默认值，初始化日期控件
              if (!item.value) {
                item.value = new Date()
              } else {
                item.value = new Date(item.value)
              }
              break
            case 'yyyy-MM-dd HH:mm':
              // 设置时间类型
              item.datatimeformat = 'datetime'
              // 设置最小时间
              if (item.datatimemin) {
                item.datatimemin = new Date(item.datatimemin)
              } else {
                item.datatimemin = new Date('1900-01-01')
              }
              // 设置最大时间
              if (item.datatimemax) {
                item.datatimemax = new Date(item.datatimemax)
              } else {
                item.datatimemax = new Date('2050-12-31')
              }
              // 设置默认值至文本框
              item.val = item.value
              // 判断是否有默认值，初始化日期控件
              if (!item.value) {
                item.value = new Date()
              } else {
                item.value = new Date(item.value)
              }
              break
            case 'HH:mm':
              item.datatimeformat = 'time'
              item.datatimemin = new Date('1900-01-01')
              item.datatimemax = new Date('2050-12-31')
              item.val = item.value
              break
          }
          break
        case 7:
          // 数据源
          item.showPopup = false
          item.showValue = ''
          if (item.value) {
            item.showValue = item.value.map(item => {
              return item.userName
            }).join(',')
          } else {
            item.value = []
          }
          break
        case 8:
          // 附件
          break
        case 9:
          // 下拉框
          if (Number(item.isMulti) === 0) {
            let arr = item.option.filter(item => item.checked)
            item.value = arr.length > 0 ? arr[0].name : ''
          }
          if (Number(item.isMulti) === 1) {
            item.value = item.option.filter(item => item.checked).map(item => item.name)
          }
          break
        case 10:
          // 表单元素
          item.showPopup = false
          let arr = item.option.filter(item => item.checked)
          if (arr.length > 0) {
            // 有选中元素
            item.value = arr[0].id
            item.val = arr[0].name
          } else {
            // 没有选中元素，默认设置第一个元素为选中元素
            item.value = item.option[0].id
            item.val = item.option[0].name
          }
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
  verify (fieldList) {
    let obj = { flag: -1 }
    fieldList.forEach(function (item) {
      switch (Number(item.elementId)) {
        case 1:
          // 单行文本
          if (item.operable) {
            // 必填
            if (!item.value) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          if (item.regularexp && item.value) {
            // 正则验证
            let regExp = new RegExp(item.regularexp)
            if (!regExp.test(item.value)) {
              obj.flag = 2
              obj.item = item
              obj.prompt = `${item.name}格式不正确`
              return obj
            }
          }
          break
        case 2:
          // 多行文本
          if (item.operable) {
            // 必填
            if (!item.value) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          if (item.regularexp && item.value) {
            // 正则验证
            let regExp = new RegExp(item.regularexp)
            if (!regExp.test(item.value)) {
              obj.flag = 2
              obj.item = item
              obj.prompt = `${item.name}格式不正确`
              return obj
            }
          }
          break
        case 3:
          // 数字
          if (item.operable) {
            if (!item.value) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          if (item.regularexp && item.value) {
            // 正则验证
            let regExp = new RegExp(item.regularexp)
            if (!regExp.test(item.value)) {
              obj.flag = 2
              obj.item = item
              obj.prompt = `${item.name}格式不正确`
              return obj
            }
          }
          if (item.numericmin && Number(item.value) < Number(item.numericmin) && item.value) {
            obj.flag = 2
            obj.item = item
            obj.prompt = `${item.name}不能小于${item.numericmin}`
          }
          if (item.numericmax && Number(item.value) > Number(item.numericmax) && item.value) {
            obj.flag = 2
            obj.item = item
            obj.prompt = `${item.name}不能大于${item.numericmax}`
          }
          if (item.decimal && Number(item.decimal) > 0 && item.value) {
            let value = item.value.split('.')
            if (value[1] && value[1].length > Number(item.decimal)) {
              obj.flag = 2
              obj.item = item
              obj.prompt = `${item.name}小数点后长度不能大于${item.decimal}`
            }
          }
          break
        case 4:
          // 单选框
          if (item.operable) {
            if (!item.value) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          break
        case 5:
          // 多选框
          if (item.operable) {
            if (item.value.length === 0) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          break
        case 6:
          // 时间日期
          if (item.operable) {
            if (!item.value) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          let currentDate = new Date(item.value).getTime()
          let dataTimeMax = new Date(item.datatimemax).getTime()
          let dataTimeMin = new Date(item.datatimemin).getTime()
          if (currentDate < dataTimeMin) {
            obj.flag = 2
            obj.item = item
            obj.prompt = `${item.name}不能小于${item.datatimemin}`
            return obj
          }
          if (currentDate > dataTimeMax) {
            obj.flag = 2
            obj.item = item
            obj.prompt = `${item.name}不能大于${item.datatimemax}`
            return obj
          }
          break
        case 7:
          // 数据源
          if (item.operable) {
            if (!item.value) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          break
        case 8:
          // 附件
          break
        case 9:
          // 下拉框
          if (Number(item.isMulti) === 0) {
            // 单选
            if (item.operable) {
              if (!item.value) {
                obj.flag = 1
                obj.item = item
                obj.prompt = `${item.name}不能为空`
                return obj
              }
            }
          } else if (Number(item.isMulti) === 1) {
            // 多选
            if (item.operable) {
              if (item.value.length === 0) {
                obj.flag = 1
                obj.item = item
                obj.prompt = `${item.name}不能为空`
                return obj
              }
            }
          }
          break
        case 10:
          // 表单元素
          if (item.operable) {
            if (!item.value) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          break
        case 11:
          // 审批元素
          if (item.operable) {
            if (item.value.length === 0) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          break
        case 12:
          // 抄送元素
          if (item.operable) {
            if (item.value.length === 0) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          break
        case 13:
          // 照片上传元素
          if (item.operable) {
            if (item.uploadObjArr.length === 0 && item.localIds.length === 0) {
              obj.flag = 1
              obj.item = item
              obj.prompt = `${item.name}不能为空`
              return obj
            }
          }
          break
      }
    })
    return obj
  }

  // 保存
  save (fieldList) {
    return fieldList.map(item => {
      let obj = {}
      switch (Number(item.elementId)) {
        case 1:
          // 文本框
          obj.id = `${item.fieldId}_${item.sort}`
          obj.value = item.value
          break
        case 2:
          // 多行文本
          obj.id = `${item.fieldId}_${item.sort}`
          obj.value = item.value
          break
        case 3:
          // 数字框
          obj.id = `${item.fieldId}_${item.sort}`
          obj.value = item.value
          break
        case 4:
          // 单选框
          obj.id = `${item.fieldId}_${item.sort}`
          obj.value = item.value
          break
        case 5:
          // 多选
          obj.id = `${item.fieldId}_${item.sort}`
          obj.value = item.value.join().replace(/,/g, '※')
          break
        case 6:
          // 时间日期
          obj.id = `${item.fieldId}_${item.sort}`
          obj.value = item.val
          break
        case 7:
          // 数据源
          obj.id = `${item.fieldId}_${item.sort}`
          if (item.value) {
            obj.value = item.value.map(item => {
              return item.id
            }).join()
          } else {
            obj.value = ''
          }
          break
        case 8:
          // 附件
          break
        case 9:
          // 下拉框
          if (Number(item.isMulti) === 1) {
            obj.id = `${item.fieldId}_${item.sort}`
            obj.value = item.value.join().replace(/,/g, '※')
          } else {
            obj.id = `${item.fieldId}_${item.sort}`
            obj.value = !item.value ? '' : item.value
          }
          break
        case 10:
          // 表单元素
          obj.id = `${item.fieldId}_${item.sort}`
          obj.value = !item.value ? '' : item.value
          break
        case 11:
          // 审批元素
          obj.id = `${item.fieldId}_${item.sort}`
          obj.value = item.value.map(item => { return item.id }).join()
          break
        case 12:
          // 抄送元素
          obj.id = `${item.fieldId}_${item.sort}`
          if (item.value.length > 0) {
            obj.value = `0_${item.value.map(item => { return item.id }).join()}`
          } else {
            obj.value = ''
          }
          break
        case 13:
          // 照片上传元素
          obj.id = `${item.fieldId}_${item.sort}`
          let serverIds = item.uploadObjArr.map(_item => {
            return _item.serverId
          }).join()
          let oldImg = item.localIds.filter(i => i.startsWith('http')).join()
          if (oldImg || serverIds) {
            obj.value = `${oldImg}#${serverIds}`
          } else {
            obj.value = ''
          }
          break
      }
      return obj
    })
  }

  static getInstance () {
    if (!FormsUtil.instance) {
      FormsUtil.instance = new FormsUtil()
    }
    return FormsUtil.instance
  }
}
