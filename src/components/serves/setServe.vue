<!-- 设置相关服务请求 -->
<template>
  <div id="setServe">
    <!-- 頂部 Start -->
    <div class="title">

      <!-- 篩選 Start -->
      <div class="title-select" @click="serveData.pcId === -1 ? showPopup = true : showPopup = false">
        客戶:
        <span class="cust-color">{{custName}}</span>
      </div>
      <!-- 篩選 End-->

      <!-- 新增 Start-->
      <div class="title-add" @click="add" v-if="serveData.isServiceEdit === 1">新建</div>
      <!-- 新增 End-->

    </div>
    <!-- 頂部 End -->

    <!-- 列表 Start -->
    <div class="serve-content">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getServes()">

        <!-- List Start -->
        <div class="list" v-for="(l,index) in list" :key="index">

          <van-checkbox :disabled="l.disabled" v-model="l.selected" @change="checkboxChange(l)">
            <div class="server-item">

              <div class="server-item-title">
                <span class="server-item-code">{{l.serversCode}}</span>
                <span>{{l.createTime}}</span>
              </div>

              <div class="server-item-content">
                <span>{{l.serversSubject}}</span>
              </div>
            </div>
          </van-checkbox>

          <div class="server-btn">
            <van-button class="server-btn-space" size="small" type="primary" @click="goDetail(l.serversDeskId)">查看
            </van-button>
            <van-button size="small" type="primary"
                        v-if="l.dealFlag === 0 & serveData.pcId !== -1 & serveData.isServiceEdit !== 0"
                        @click="startHandle(l,index)" :loading="l.loading">
              开始处理
            </van-button>
            <van-button size="small" type="primary"
                        v-if="l.dealFlag === 1 & serveData.pcId !== -1  & serveData.isServiceEdit !== 0"
                        @click="endHandle(l,index)" :loading="l.loading">
              处理结束
            </van-button>
          </div>

        </div>
        <!-- List End -->

      </van-list>

    </div>
    <!-- 列表 End -->

    <!-- 底部按钮 Start-->
    <div class="btn">
      <div class="btn-item">
        <van-button size="large" type="primary" @click="sub">确定</van-button>
      </div>
      <div class="btn-item">
        <van-button size="large" @click="cancel">取消</van-button>
      </div>
    </div>
    <!-- 底部按钮 End-->

    <!-- 新建查看服务请求 Start -->
    <van-popup v-model="servePopup" position="right" :overlay="false" class="serves-popup" v-if="isShowServer">
      <new-serve @newSub="newSub" @newCancel="newCancel" @listRefresh="listRefresh" ref="newServe"></new-serve>
    </van-popup>
    <!-- 新建服务请求 End -->

    <!-- 客户选择 Start -->
    <van-popup v-model="showPopup" position="bottom">
      <van-picker value-key="custName" :columns="custList" @confirm="confirmEvent" @cancel="showPopup = false"
                  :show-toolbar="true" title="客户" ref="custPicker"/>
    </van-popup>
    <!-- 客户选择 End -->

    <!-- 处理结束 Start -->
    <van-dialog v-model="isShowHandle" show-cancel-button :before-close="beforeClose">
      <div class="handle">
        <div class="item">
          <div class="item-title">原因</div>
          <van-field
            v-model="reason"
            placeholder="请输入原因"
            type="textarea"
            autosize
          />
        </div>
        <div class="item">
          <div class="item-title">处理方式</div>
          <van-field
            v-model="mth"
            placeholder="请输入原因"
            type="textarea"
            autosize
          />
        </div>
        <div class="item">
          <div class="item-title">问题类型</div>
          <van-radio-group v-model="issue.value">
            <van-cell-group :border="false">
              <van-cell class="van-cell-padding" :border="false" :title="i.typeName" clickable
                        @click="issue.value = i.id" v-for="(i,index) in issue.option" :key="index">
                <van-radio :name="i.id"/>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
    </van-dialog>
    <!-- 处理结束 End -->
  </div>
</template>

<script>
import { Button, Popup, Picker, List, Notify, Field, RadioGroup, Radio, Cell, CellGroup, Checkbox } from 'vant'
import { Mixin } from '@/util/mixin'
import Color from '@/util/color'
import Model from '@/model/client.model'
import NewServe from '@/components/serves/newServe'

export default {
  name: 'setServe',
  mixins: [Mixin],
  components: {
    NewServe: NewServe,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [List.name]: List,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    [Field.name]: Field,
    [Notify.name]: Notify
  },
  props: {
    serveData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      // 是否显示新增服务请求页
      servePopup: false,
      // 服务请求列表
      list: [],
      // 是否显示上拉菜单
      showPopup: false,
      // 客户列表
      custList: [],
      // 获取服务请求列表参数
      serveJson: {
        // 一次获取几条数据
        pageSize: 10,
        // 从第几条开始
        start: 0,
        // 根据客户查找-1为全部
        custId: -1,
        // 模糊查询
        keywords: ''
      },
      // 加载
      loading: false,
      // 加载完成
      finished: false,
      // 显示客户名称
      custName: '全部',
      // 服务请求表单是否禁用
      setDisabled: false,
      // 是否渲染服務請求單
      isShowServer: false,
      // 是否显示处理方法弹窗
      isShowHandle: false,
      // 处理方法原因
      reason: '',
      // 处理方式
      mth: '',
      // 问题类型
      issue: {
        value: [],
        option: []
      },
      //  处理结束数据暂存
      handleData: {
        data: undefined,
        index: undefined
      }
    }
  },
  methods: {
    // 获取服务请求列表
    async getServes () {
      // 清除底部提示
      this.finished = false
      // 开启加载提示
      this.loading = true
      this.serveJson.pcId = this.serveData.pcId
      this.serveJson.custId = this.serveData.custId
      let res = await Model.getServers(this.serveJson)
      if (res.data.length !== 0) {
        res.data.forEach((item) => {
          // 设置元素按钮加载
          item.loading = false
          // 判断服务请求状态
          if (item.dealFlag !== 3 || this.serveData.isServiceEdit === 0) {
            item.disabled = true
            return false
          }
          item.disabled = false
        })
        this.list = [...this.list, ...res.data]
        this.serveJson.start += 10
      } else {
        // 显示底部提示
        this.finished = true
      }
      // 关闭加载
      this.loading = false
    },
    // 获取客户
    async getCustList () {
      let res = await Model.getCustList()
      this.custList = res.custList
      this.custList.unshift({ custId: -1, custName: '全部' })
      this.custList.forEach((item, index) => {
        if (item.custId === this.serveData.custId) {
          this.custList[index].defaultIndex = index
          this.custName = this.custList[index].custName
        }
      })
    },
    // 获取问题类型
    async getProblemTypeList () {
      let res = await Model.getProblemTypeList()
      this.issue.option = res.typeList
    },
    // 确定
    async sub () {
      this.$emit('serverSub', this.list.filter(item => item.selected).map(function (item) {
        return { id: item.serversDeskId, solve: item.solution }
      }))
    },
    // 取消
    cancel () {
      this.$emit('serverCancel')
    },
    // 新建
    add () {
      if (this.serveData.isServiceEdit === 1) {
        this.servePopup = true
        this.setDisabled = false
        this.isShowServer = true
        this.$nextTick(() => {
          // 新建ID传入-1
          this.$refs.newServe.init(false, '-1')
        })
      }
    },
    // 新建确定
    newSub (item) {
      this.servePopup = false
      setTimeout(() => {
        this.isShowServer = false
      }, 350)
    },
    // 新建取消
    newCancel () {
      this.servePopup = false
      setTimeout(() => {
        this.isShowServer = false
      }, 350)
    },
    // 子組件保存成功触发列表刷新
    listRefresh () {
      // 初始化分页
      this.serveJson.start = 0
      // 清空列表数据
      this.list = []
      this.getServes()
    },
    // 选择客户
    confirmEvent (val) {
      // 获取客户ID，name并赋值
      this.serveJson.custId = val.custId
      this.custName = val.custName
      // 初始化分页
      this.serveJson.start = 0
      // 清空列表数据
      this.list = []
      this.getServes()
      this.showPopup = false
    },
    // 服务请求查看详情
    goDetail (id) {
      this.setDisabled = true
      this.servePopup = true
      this.isShowServer = true
      this.$nextTick(() => {
        // 编辑传入选中ID
        this.$refs.newServe.init(true, String(id))
      })
    },
    // 开始处理
    async startHandle (item, index) {
      item.loading = true
      let res = await Model.startDeal({ requestId: item.serversDeskId, pcId: this.serveData.pcId })
      item.loading = false
      // false API调用失败
      if (!res.flag) return Notify({ message: '处理异常', background: Color.error })
      // 开始处理成功，显示处理结束按钮
      item.dealFlag = 1
      item.disabled = true
    },
    // 处理结束
    endHandle (item, index) {
      this.handleData.data = item
      this.handleData.index = index
      this.isShowHandle = true
    },
    // 处理结束弹框 按钮操作
    async beforeClose (action, done) {
      if (action === 'confirm') {
        if (!this.mth) {
          Notify({ message: '请填写处理方式', background: Color.error })
          return done(false)
        }
        if (!this.issue.value) {
          Notify({ message: '请选择问题类型', background: Color.error })
          return done(false)
        }
        let json = {
          requestId: this.handleData.data.serversDeskId,
          pcId: this.handleData.data.pcId,
          solution: this.mth,
          reason: this.reason,
          typeId: this.issue.value,
          requestIds: JSON.stringify(this.list.filter(item => item.selected).map(function (item) {
            return { id: item.serversDeskId, solve: item.solution }
          }))
        }
        let res = await Model.finishDeal(json)
        // 处理结束成功修改元素状态V
        if (res.flag) {
          this.list[this.handleData.index].dealFlag = 2
        }
        // 清空文本
        this.mth = ''
        this.reason = ''
        done()
      } else {
        done()
      }
    },
    // 多选框选中事件监听
    checkboxChange (item) {
      // 判断当前元素是否选中
      if (item.selected) {
        // 选中下显示开始处理按钮
        item.dealFlag = 0
      } else {
        // 未选中隐藏开始处理按钮
        item.dealFlag = 3
      }
    },
    // 多选框设置
    checkboxEvent () {
      // 可操作
      if (this.serveData.isServiceEdit === 1) {
        this.list.forEach((item) => { item.disabled = false })
      }
    }
  },
  mounted () {
    this.getServes()
    this.getCustList()
    this.getProblemTypeList()
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  #setServe {
    @include overflow();
    background-color: $color-white;
    position: relative;
  }

  .title {
    width: 100%;
    display: flex;
    padding: $space * 1.6;
    justify-content: space-between;
    box-sizing: border-box;
    &-select {
      font-size: $font-size * 1.1;
      color: $color-black;
    }
    &-add {
      color: $color-blue;
      font-size: $font-size;
    }
  }

  .btn {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    &-item {
      width: 50%;
    }
  }

  .cust-color {
    color: $color-blue;
  }

  .van-button {
    border-radius: 0;
  }

  .serve-content {
    position: absolute;
    top: $space * 4.5;
    left: 0;
    right: 0;
    bottom: $space * 5;
    overflow-x: hidden;
    overflow-y: auto;
    font-size: $font-size;
  }

  .serves-popup {
    width: 100%;
    height: 100%;
  }

  .list {
    width: 100%;
    box-sizing: border-box;
    padding: 0 $space ($space * 4) $space;
    border-bottom: $border-width solid $solid-color;
    position: relative;
  }

  .server-item {
    font-size: $font-size;
    &-code {
      margin-right: $space *7;
    }
    &-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: $space 0;
      > span:nth-child(1) {
        color: $color-blue;
      }
      > span:nth-child(2) {
        color: $color-grey-plus;
      }
    }
    &-content {
      padding: $space 0;
      span {
        display: block;
      }
    }
  }

  .server-btn {
    position: absolute;
    right: $space * 1.6;
    bottom: 0;
    margin-bottom: $space;
    &-space {
      margin-right: $space;
    }
  }

  .handle {
    box-sizing: border-box;
    padding: $space;
  }

  .van-cell {
    font: initial;
    font-size: $font-size;
  }

  .van-cell, .item-bottom {
    border-bottom: $border-width solid $solid-color;
  }

  .van-cell-padding {
    padding: $space;
  }

  .van-field-padding {
    padding-bottom: $space * 1.8;
  }

  .item {
    box-sizing: border-box;
    color: $color-black;
    padding: ($space * 2) ($space * 1.6) 0 ($space * 1.6);
    &-title {
      box-sizing: border-box;
      font-size: $font-size * 1.1;
      padding-bottom: $space * 1.2;
    }
  }
</style>
