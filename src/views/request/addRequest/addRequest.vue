<!-- 新建服务请求 -->
<template>
  <div id="addRequest">

    <!-- Form Start -->
    <div class="form">
      <!-- 主题 -->
      <div class="item">
        <div class="item-title">主题</div>
        <van-field
          v-model="form.data.serversSubject"
          placeholder="请输入主题"
          :disabled="form.isDisabled"
          type="textarea"
          autosize
        />
      </div>
      <!-- 请求人 -->
      <div class="item">
        <div class="item-title">请求人</div>
        <van-field
          v-model="form.data.createUser"
          placeholder="请输入请求人"
          :disabled="form.isDisabled"
          type="textarea"
          autosize
        />
      </div>
      <!-- 客户名称 -->
      <div class="item">
        <div class="item-title">客户名称</div>
        <div @click="popupEvent('isShowCust')">
          <van-field
            class="van-field-padding"
            v-model="form.data.custName"
            placeholder="请选择请求来源"
            disabled="true"
          />
        </div>
      </div>
      <!-- 联系电话 -->
      <div class="item">
        <div class="item-title">联系电话</div>
        <van-field
          v-model="form.data.phoneNum"
          placeholder="请输入联系电话"
          :disabled="form.isDisabled"
          type="tel"
          autosize
        />
      </div>
      <!-- 请求时间 -->
      <div class="item">
        <div class="item-title">请求时间</div>
        <div @click="popupEvent('isShowTime')">
          <van-field class="van-field-padding" v-model="form.data.createTime" placeholder="请选择请求时间" disabled="true"/>
        </div>
      </div>
      <!-- 请求来源 -->
      <div class="item">
        <div class="item-title">请求来源</div>
        <div @click="popupEvent('isShowRequest')">
          <van-field
            class="van-field-padding"
            v-model="form.data.requestName"
            placeholder="请选择请求来源"
            disabled="true"
          />
        </div>
      </div>
      <!-- 类型 -->
      <div class="item">
        <div class="item-title">类型</div>
        <div @click="popupEvent('isShowServersType')">
          <van-field
            class="van-field-padding"
            v-model="form.data.serversTypeName"
            placeholder="请选择请求来源"
            disabled="true"
          />
        </div>
      </div>
      <!-- 优先级 -->
      <div class="item">
        <div class="item-title">优先级</div>
        <div @click="popupEvent('isShowLevel')">
          <van-field
            class="van-field-padding"
            v-model="form.data.levelName"
            placeholder="请选择优先级"
            disabled="true"
          />
        </div>
      </div>
      <!-- 图片上传 -->
      <div class="item">
        <div class="item-title">图片上传</div>
        <div class="img-upload-block">
          <wx-upload :itemData="itemData"></wx-upload>
        </div>
      </div>
    </div>
    <!-- Form End -->

    <!-- 提交 Start -->
    <div class="sub-btn">
      <van-button type="primary" size="large" :loading="isLoading" @click="goSub" :disabled="this.form.isDisabled">提交
      </van-button>
    </div>
    <!-- 提交 End -->

    <!-- 请求时间弹框 Start -->
    <van-popup v-model="isShowTime" position="bottom">
      <van-datetime-picker
        v-model="time"
        @confirm="confirm"
        @cancel="cancel()"
      />
    </van-popup>
    <!-- 请求时间弹框 End -->

    <!-- 请求来源弹框 Start -->
    <van-popup v-model="isShowRequest" position="bottom" class="popup-height">
      <van-radio-group v-model="form.data.requestName">
        <van-cell-group>
          <van-cell :border="false" class="van-cell-padding" v-for="rl in requestList" clickable
                    :key="rl.requestId"
                    :title="rl.requestName"
                    @click="form.data.requestName = rl.requestName;form.data.requestId = rl.requestId">
            <van-radio :name="rl.requestName"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 请求来源弹框 End-->

    <!-- 客户名称弹框 Start -->
    <van-popup v-model="isShowCust" position="bottom" class="popup-height">
      <van-radio-group v-model="form.data.custName">
        <van-cell-group>
          <van-cell :border="false" class="van-cell-padding" v-for="cl in custList" clickable
                    :key="cl.custId"
                    :title="cl.custName"
                    @click="form.data.custName = cl.custName;form.data.custId = cl.custId">
            <van-radio :name="cl.custName"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 客户名称弹框 End-->

    <!-- 类型弹框 Start -->
    <van-popup v-model="isShowServersType" position="bottom" class="popup-height">
      <van-radio-group v-model="form.data.serversTypeName">
        <van-cell-group>
          <van-cell :border="false" class="van-cell-padding" v-for="stl in serversTypeList" clickable
                    :key="stl.typeId"
                    :title="stl.typeName"
                    @click="form.data.serversTypeName = stl.typeName;form.data.serversTypeId = stl.typeId">
            <van-radio :name="stl.typeName"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 客户名称弹框 End-->

    <!-- 优先级弹框 Start -->
    <van-popup v-model="isShowLevel" position="bottom" class="popup-height">
      <van-radio-group v-model="form.data.levelName">
        <van-cell-group>
          <van-cell :border="false" class="van-cell-padding" v-for="ll in levelList" clickable
                    :key="ll.levelId"
                    :title="ll.levelName"
                    @click="form.data.levelName = ll.levelName;form.data.levelId = ll.levelId">
            <van-radio :name="ll.levelName"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 优先级弹框 End-->
  </div>
</template>

<script>
import { Field, DatetimePicker, Popup, Cell, CellGroup, RadioGroup, Radio, Button, Notify } from 'vant'
import model from '@/model/client.model'
import color from '@/util/color'
import { Mixin } from '@/util/mixin'
import WxUpload from '@/components/wxUpload/wxUpload'

export default {
  name: 'addRequest',
  metaInfo: {
    title: '服务请求'
  },
  props: ['id'],
  mixins: [Mixin],
  components: {
    WxUpload: WxUpload,
    [Field.name]: Field,
    [Button.name]: Button,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Notify.name]: Notify
  },
  data () {
    return {
      // 表单数据
      form: {
        // 是否禁止编辑
        isDisabled: false,
        // 数据
        data: {
          // 主题
          serversSubject: '',
          // 请求时间
          createTime: '',
          // 联系电话
          phoneNum: '',
          // 请求人
          createUser: '',
          // 请求来源ID
          requestId: '',
          // 请求来源名称
          requestName: '',
          // 客户ID
          custId: '',
          // 客户名称
          custName: '',
          // 优先级名称
          levelName: '',
          // 优先级ID
          levelId: '',
          // 类型ID
          serversTypeId: '',
          // 类型名称
          serversTypeName: ''
        }
      },
      // 请求来源数据
      requestList: [],
      // 客户名称数据
      custList: [],
      // 优先级数据
      levelList: [],
      // 类型数据
      serversTypeList: [],
      // 组件时间初始化
      time: new Date(),
      // 是否显示请求时间上拉菜单
      isShowTime: false,
      // 是否显示请求来源上拉菜单
      isShowRequest: false,
      // 是否显示客户名称上拉菜单
      isShowCust: false,
      // 是否显示优先级上拉菜单
      isShowLevel: false,
      // 是否显示类型上拉菜单
      isShowServersType: false,
      // 照片上传数据
      itemData: {
        localIds: [],
        writable: true,
        uploadObjArr: []
      },
      // 提交按钮loading控制
      isLoading: false
    }
  },
  methods: {
    // 表单参数初始化
    async formDataInit () {
      let res = await Promise.all([
        // 获取请求来源
        model.getRequestSourceList(),
        // 获取类型
        model.getServersTypeList(),
        // 获取优先级
        model.getServersLevelList(),
        // 获取客户名称
        model.getCustList()
      ])
      // 请求来源
      this.requestList = res[0].flag ? res[0].serversRequestList : []
      // 类型
      this.serversTypeList = res[1].flag ? res[1].serversTypeList : []
      // 优先级
      this.levelList = res[2].flag ? res[2].serversLevelList : []
      // 客户名称
      this.custList = res[3].flag ? res[3].custList : []
      console.log(res)
    },
    // 上拉菜单显示
    popupEvent (key) {
      if (!this.form.isDisabled) {
        this[key] = true
      }
    },
    // 时间控件点击完成触发事件
    confirm (date) {
      this.dateToString(date)
      this.isShowTime = false
    },
    // 时间转字符串
    dateToString (date) {
      let year, month, day, hour, minutes
      if (typeof date !== 'string') {
        year = date.getFullYear()
        month = (date.getMonth() + 1).toString()
        day = (date.getDate()).toString()
        hour = (date.getHours()).toString()
        minutes = (date.getMinutes()).toString()
        hour = Number(hour) === 0 ? '00' : hour
        minutes = Number(minutes) === 0 ? '00' : minutes
        this.form.data.createTime = `${year}-${month}-${day} ${hour}:${minutes}`
      } else {
        this.form.data.createTime = date
      }
    },
    // 时间控件点击取消触发事件
    cancel () {
      this.isShowTime = false
    },
    // 提交
    async goSub () {
      // 阻止多次提交
      this.isLoading = true
      // 通过ID判断是修改还是新增
      if (String(this.id) !== '-1') {
        // 修改
        this.form.data.serversDeskId = this.id
        this.form.data.clientId = this.form.data.custId
        let res = await model.updateServers(this.form.data)
        if (res.keyId) {
          Notify({ message: '修改成功', background: color.success })
          setTimeout(() => {
            this.$router.go(-1)
          }, 200)
        }
      } else {
        // 新增
        let res = await model.saveServersDesk(this.form.data)
        this.isLoading = false
        if (res.keyId) {
          Notify({ message: '保存成功', background: color.success })
          setTimeout(() => {
            this.$router.go(-1)
          }, 200)
        }
      }
    },
    // 获取单个服务请求数据
    async getServersDeskInfoByDeskId () {
      let res = await model.getServersDeskInfoByDeskId({ serversDeskId: this.id })
      if (res.flag) {
        // 回填数据
        for (let key of Object.keys(this.form.data)) {
          this.form.data[key] = res.serversDesk[key]
        }
        // 判断表单是否可以修改
        if (Number(res.serversDesk.serversState) !== 1) {
          // 禁用表单
          this.form.isDisabled = true
        }
      }
    }
  },
  mounted () {
    // 表单初始化
    this.formDataInit()
    // 通过ID判断是新增还是查看
    if (String(this.id) !== '-1') {
      this.getServersDeskInfoByDeskId()
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/styles/global";
  @import "addRequest";
</style>
