<!-- 新增 动态表单 新增走流程 -->
<template>
  <div id="createDynamicForms">
    <!-- 相关服务请求 Start -->
    <div class="see-request" @click="setRequest" v-if="isShowRequest">
      相关服务请求
    </div>
    <!-- 相关服务请求 End -->

    <!-- 动态表单 Start -->
    <div class="create-dynamic-forms-block">
      <dynamic-forms :fieldList="fieldList"></dynamic-forms>
    </div>
    <!-- 动态表单 End-->

    <!-- 多角色人员选择弹框 Start-->
    <pro-pop :list="roleList" listType="radio" keyName="roleId" showName="roleName" ref="proPop"
             @popSub="popSub" title_1="系统检测到您当前拥有多个角色" title_2="请选择本次提交时所使用的角色"></pro-pop>
    <!-- 多角色人员选择弹框 End-->

    <!-- 下一节点人员选择弹框 Start-->
    <pro-pop :list="nextRoleList" keyName="userId" showName="userName" :listType="listType" ref="nextProPop"
             @popSub="nextPopSub" title_1="下一节点人员选择"></pro-pop>
    <!-- 下一节点人员选择弹框 End-->

    <!-- 操作 Start -->
    <div class="handle-btn">
      <van-button type="primary" size="large" @click="handle">操作</van-button>
    </div>
    <!-- 操作 End -->

    <!-- Actionsheet Start -->
    <van-actionsheet v-model="isShow" :actions="buttonList" @select="onSelect"/>
    <!-- Actionsheet End -->

    <!-- Loading Start-->
    <div class="mask-top" v-show="!fieldList">
      <van-loading/>
    </div>
    <!-- Loading End-->

    <!-- 相关服务请求页 Start -->
    <van-popup v-model="servePopup" position="right" :overlay="false" class="serves-popup">
      <set-serves @serverSub="serverSub" @serverCancel="serverCancel" :serveData="serveData"></set-serves>
    </van-popup>
    <!-- 相关服务请求页 End -->

    <!--分派 Start -->
    <van-popup v-model="itemData.showPopup" position="right" :overlay="false" class="serves-popup">
      <frame-work :itemData="itemData" @goAssign="goAssign"></frame-work>
    </van-popup>
    <!--分派 End -->

    <!-- 退回理由 Start -->
    <van-dialog v-model="isShowReason" show-cancel-button :before-close="beforeClose">
      <div class="reason">
        <van-field v-model="reason" placeholder="请输入理由" type="textarea" autosize/>
      </div>
    </van-dialog>
    <!-- 退回里有 End -->
  </div>
</template>

<script>
import { Loading, Popup, Button, Checkbox, CheckboxGroup, Cell, CellGroup, Actionsheet, Notify, Field } from 'vant'
import Model from '@/model/client.model'
import { Mixin } from '@/util/mixin'
import Color from '@/util/color'
import DynamicForms from '@/components/dynamicForms/dynamicForms'
import ProPop from '@/components/proPop/proPop'
import SetServes from '@/components/serves/setServe'
import FrameWork from '@/components/frameWork/frameWork'
import { FormsUtil } from '@/components/dynamicForms/formsUtil'

export default {
  name: 'createDynamicForms',
  metaInfo: {
    title: '新增'
  },
  mixins: [Mixin],
  components: {
    DynamicForms: DynamicForms,
    ProPop: ProPop,
    FrameWork: FrameWork,
    SetServes: SetServes,
    [Loading.name]: Loading,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Actionsheet.name]: Actionsheet,
    [Field.name]: Field,
    [Notify.name]: Notify
  },
  props: {
    // 验证是否有流程所需参数
    processJson: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      // 动态表单
      fieldList: undefined,
      // 流程相关ID
      processObj: {},
      // 角色列表
      roleList: [],
      // 下一节点人员角色列表
      nextRoleList: [],
      // 按钮列表
      buttonList: [],
      // 是否显示上拉菜单
      isShow: false,
      // 是否显示说明理由弹框
      isShowReason: false,
      // 显示相关服务请求
      servePopup: false,
      // 选择弹框类型
      listType: 'radio',
      // 分派相关
      itemData: {
        showPopup: false,
        showValue: [],
        value: [],
        isMulti: 0,
        name: '分派'
      },
      // 分派选中人员后需要的参数
      goAssignData: {},
      // 说明理由
      reason: '',
      // 选中按钮缓存
      itemBtn: undefined,
      // 是否显示相关服务请求
      isShowRequest: false,
      // 相关服务请求
      requestId: [],
      // 服务请求相关数据
      serveData: {
        pcId: -1
      }
    }
  },
  methods: {
    // 弹框数据确认
    popSub (item) {
      this.processObj.roleId = item.roleId
      // 设置fieldList为undefined开启loading
      this.fieldList = undefined
      this.getFieldsInNode()
    },
    // 下一节点人员弹框数据确认
    async nextPopSub (obj) {
      if (Array.isArray(obj)) {
        this.processObj.userList = JSON.stringify(obj.map(item => {
          return { userId: item.userId, roleId: item.roleId }
        }))
      } else {
        this.processObj.userList = JSON.stringify([{ userId: obj.userId, roleId: obj.roleId }])
      }
      let res = await Model.processAssignTask(this.processObj)
      if (res.errMsg) {
        Notify({ message: res.errMsg, background: Color.success })
      }
      setTimeout(() => {
        this.$router.go(-1)
      }, 500)
    },
    // 获取当前应用表单
    async getFromListByApp () {
      let res = await Model.getFromListByApp(this.processJson)
      this.formList = res.formList
      if (this.formList.length > 1) {
        // 多张表单
      } else {
        // 单张表单
        this.processJson.limitMenuId = this.formList[0].menuLimitid
        this.processJson.formId = this.formList[0].formId
        this.processJson.menuId = this.formList[0].menuId
        this.checkProcessLimitMenu()
      }
    },
    // 1.新增：验证有没有流程
    async checkProcessLimitMenu () {
      // 相关服务请求设置为新增状态
      this.serveData.pcId = -1
      // API送出
      let res = await Model.checkProcessLimitMenu(this.processJson)
      if (res.errMsg) return Notify({ message: res.errMsg, background: Color.error })
      this.processObj.pcId = -1
      this.processObj.formId = res.formId
      this.processObj.nodeId = res.nodeId
      this.processObj.appId = res.appId
      this.processObj.processId = res.processId
      this.processObj.triggerId = this.processJson.triggerId
      this.processObj.keyId = this.processJson.keyId
      if (res.roleTotal > 1) {
        // 多个角色
        this.roleList = res.roleList
        // 必须设置fieldList为空数组，关闭loading
        setTimeout(() => {
          this.fieldList = []
          this.$refs.proPop.show()
        }, 500)
      } else {
        // 单个角色
        this.processObj.roleId = res.roleId
        this.getFieldsInNode()
      }
    },
    // 1.处理：所需参数覆盖
    handleData () {
      this.processObj = this.processJson
      // 相关服务请求设置为处理状态
      this.serveData.pcId = this.processJson.pcId
      this.getFieldsInNode()
    },
    // 2.获取动态表单
    async getFieldsInNode () {
      let flag = 0
      let res = await Model.getFieldsInNode(this.processObj)
      // 表单列表 数据处理
      if (res.errMsg) return Notify({ message: res.errMsg, background: Color.error })
      this.fieldList = FormsUtil.getInstance().init(res.fieldList)
      // 按钮列表
      this.buttonList = res.buttonList.map(item => {
        // 判断按钮是否含有接受或者拒绝
        if (item.buttonCode === 'ACCEPT' || item.buttonCode === 'REJECT') {
          flag = 1
        }
        item.name = item.buttonName
        item.loading = false
        return item
      })
      // flag为1表单全部设为禁用
      if (flag === 1) {
        this.fieldList = this.fieldList.map(item => {
          item.writable = false
          return item
        })
      }
      // 判断是否要显示相关服务请求
      this.isShowRequest = !!res.isRequest
    },
    // 3.提交数据
    async dynamicSubmit (item, reason) {
      /*
      *processId: 1065
      *nodeId: 3710
      *roleId: 183
      *formId: 247
      *pcId: -1
      *appId: 12
      *reason:
      *triggerId: 32
      *masterId: 81
      *requestId: []
      *list: [{"id":"479_1","value":"单行文本"},{"id":"480_2","value":""}]
      * */
      let data = {
        json: {
          processId: this.processObj.processId,
          nodeId: this.processObj.nodeId,
          formId: this.processObj.formId,
          pcId: this.processObj.pcId,
          appId: this.processObj.appId,
          roleId: this.processObj.roleId,
          triggerId: this.processObj.triggerId === '-1' ? '' : this.processObj.triggerId,
          masterId: this.processObj.keyId === '-1' ? '' : this.processObj.keyId,
          reason: !reason ? '' : reason
        },
        api: ''
      }
      // 表单验证
      let obj = FormsUtil.getInstance().verify(this.fieldList)
      if (obj.flag !== -1) return Notify({ message: obj.prompt, background: Color.error })
      data.json.list = JSON.stringify(FormsUtil.getInstance().save(this.fieldList))
      data.json.requestId = JSON.stringify(this.requestId)
      data.api = item.buttonFunc
      item.loading = true
      let res = await Model.dynamicSubmit(data)
      if (res.errMsg) {
        // 完成
        Notify({ message: res.errMsg, background: Color.success })
        this.isShow = false
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      } else {
        this.processObj.pcId = res.pcId
        this.processObj.nodeId = res.nextNodeId
        this.processObj.pRecoId = res.recoId

        if (res.signStart) {
          // 会签
          this.signStart = res.signStart
          this.nextRoleList = res.userRoleList
          // 判断是否是会签 listType
          if (Number(this.signStart) === 1) {
            // 会签默认选中，并且为多选
            this.listType = 'checkbox'
            // 显示弹框
            this.$refs.nextProPop.show()
            this.$nextTick(() => {
              // 设置全部选中：下一节点人员选择
              this.$refs.nextProPop.all()
            })
          } else {
            // 显示弹框：下一节点人员选择
            this.$refs.nextProPop.show()
          }
        }

        if (Number(res.isAppoint) === 1) {
          // 分派
          this.goAssignData = res
          this.goAssignData.result = item.result
          this.goAssignData.flag = item.flag
          this.itemData.showPopup = true
        }

        item.loading = false
        this.isShow = false
      }
    },
    // 上拉菜单事件监听 按钮操作
    onSelect (item) {
      this.processObj.result = item.result
      this.processObj.flag = item.flag
      if (Number.isNaN(Number(item.buttonCode))) {
        switch (item.buttonCode) {
          case 'CANCEL':
            this.isShow = false
            break
          case 'REJECT':
            // 接受
            this.rejectOrAcceptDynamicSubmit(item)
            break
          case 'ACCEPT':
            // 拒绝
            this.rejectOrAcceptDynamicSubmit(item)
            break
          default:
            if (!item.hasReason) {
              this.dynamicSubmit(item)
            } else {
              // 需说明理由
              this.isShowReason = true
              this.itemBtn = item
            }
        }
      } else {
        // 触发器
        // formId_appId_menuId_limitMenuId_triggerId_keyId
        let ids = `-1_-1_-1_-1_${item.buttonCode}_${this.processJson.keyId}`
        this.$router.push(`/add/${ids}`)
      }
    },
    // 理由弹框 按钮操作
    beforeClose (action, done) {
      if (action === 'confirm') {
        if (!this.reason) {
          Notify({ message: '请输入理由', background: Color.error })
          return done(false)
        }
        done()
        this.dynamicSubmit(this.itemBtn)
      } else {
        done()
      }
    },
    // 接受或拒绝
    async rejectOrAcceptDynamicSubmit (item) {
      item.loading = true
      let data = {
        json: {
          processId: this.processObj.processId,
          nodeId: this.processObj.nodeId,
          formId: this.processObj.formId,
          pcId: this.processObj.pcId,
          appId: this.processObj.appId,
          roleId: this.processObj.roleId
        },
        api: ''
      }
      data.api = item.buttonFunc
      let res = await Model.dynamicSubmit(data)
      item.loading = false
      this.isShow = false
      if (item.buttonCode === 'ACCEPT') {
        // 接受
        if (!res.errMsg) {
          // 表单列表 数据处理
          this.fieldList = FormsUtil.getInstance().init(res.fieldList)

          // 按钮列表
          this.buttonList = res.buttonList
          // 按钮列表
          this.buttonList = res.buttonList.map(item => {
            item.name = item.buttonName
            item.loading = false
            return item
          })
        } else {
          Notify({ message: res.errMsg, background: Color.error })
        }
      } else if (item.buttonCode === 'REJECT') {
        // 拒绝
        Notify({ message: res.errMsg, background: Color.success })
        this.$router.go(-1)
      }
    },
    // 开启上拉菜单
    handle () {
      this.isShow = true
    },
    // 设置相关服务请求
    setRequest () {
      this.servePopup = true
    },
    // 关闭相关服务器请求
    serverCancel () {
      this.servePopup = false
    },
    // 保存相关服务请求
    serverSub (list) {
      this.requestId = list
      this.servePopup = false
    },
    // 去分派
    async goAssign (item) {
      let data = {
        json: {
          pcId: this.goAssignData.pcId,
          appId: this.processObj.appId,
          processId: this.processObj.processId,
          nodeId: this.goAssignData.nextNodeId,
          result: this.goAssignData.result,
          pRecoId: this.goAssignData.recoId,
          userList: JSON.stringify([{ userId: item.id, roleId: this.processObj.roleId }]),
          flag: this.goAssignData.flag
        },
        api: this.goAssignData.assignUrl
      }
      let res = await Model.dynamicSubmit(data)
      // 完成
      Notify({ message: res.errMsg, background: Color.success })
      setTimeout(() => {
        this.$router.go(-1)
      }, 200)
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  #createDynamicForms {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .handle-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .see-request {
    font-size: $font-size;
    @include right;
    padding: $space * 1.6;
    color: $color-blue;
  }

  .serves-popup {
    width: 100%;
    height: 100%;
  }

  .reason {
    padding: ($space * 2) ($space * 1.5);
    box-sizing: border-box;
  }

  .van-cell {
    font: initial;
    font-size: $font-size;
  }
</style>
