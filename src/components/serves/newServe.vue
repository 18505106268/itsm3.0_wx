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
      <!-- 描述 -->
      <div class="item">
        <div class="item-title">描述</div>
        <van-field
          v-model="form.data.serversDesc"
          placeholder="请输入描述"
          :disabled="form.isDisabled"
          type="textarea"
          autosize
        />
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

    <!-- 底部按钮 Start-->
    <div class="btn">
      <div class="btn-item">
        <van-button type="primary" size="large" :loading="isLoading" @click="goSub" :disabled="this.form.isDisabled">
          确定
        </van-button>
      </div>
      <div class="btn-item">
        <van-button size="large" @click="btnCancel">取消</van-button>
      </div>
    </div>
    <!-- 底部按钮 End-->

    <!-- 请求时间弹框 Start -->
    <van-popup v-model="isShowTime" position="bottom">
      <van-datetime-picker
        v-model="time"
        @confirm="confirm"
        @cancel="cancel()"
      />
    </van-popup>
    <!-- 请求时间弹框 End -->

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
          requestId: '2',
          // 请求来源名称
          requestName: '微信',
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
          serversTypeName: '',
          // 描述
          serversDesc: ''
        }
      },
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
      isLoading: false,
      // 控制表单是否可用
      setDisabled: false,
      serverId: '-1'
    }
  },
  methods: {
    // 表单参数初始化
    async formDataInit () {
      let res = await Promise.all([
        // 获取类型
        model.getServersTypeList(),
        // 获取优先级
        model.getServersLevelList(),
        // 获取客户名称
        model.getCustList()
      ])
      // 类型
      this.serversTypeList = res[0].flag ? res[0].serversTypeList : []
      // 优先级
      this.levelList = res[1].flag ? res[1].serversLevelList : []
      // 客户名称
      this.custList = res[2].flag ? res[2].custList : []
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
      let v = this.verify()
      if (v.verify) return Notify({ message: v.msg, background: color.error })
      //  保存照片上传数据
      let serverIds = this.itemData.uploadObjArr.map(_item => {
        return _item.serverId
      }).join()
      // 阻止多次提交
      this.isLoading = true
      // 新增
      this.form.data.imagesWX = serverIds
      this.form.data.clientId = this.form.data.custId
      let res = await model.saveServersDesk(this.form.data)
      this.isLoading = false
      if (res.keyId) {
        Notify({ message: '保存成功', background: color.success })
        // 隐藏组件并刷新父列表
        setTimeout(() => {
          this.$emit('listRefresh')
          this.$emit('newCancel')
        }, 200)
      }
    },
    // 获取单个服务请求数据
    async getServersDeskInfoByDeskId () {
      let res = await model.getServersDeskInfoByDeskId({ serversDeskId: this.serverId })
      if (res.flag) {
        // 回填数据
        for (let key of Object.keys(this.form.data)) {
          this.form.data[key] = res.serversDesk[key]
        }
        // 图片回填
        if (res.serversDesk.filePath) {
          this.itemData.localIds = res.serversDesk.filePath.split(',')
        }
        // 判断表单是否可以修改
        if (this.setDisabled) {
          // 禁用表单
          this.form.isDisabled = true
          // 禁用照片上传
          this.itemData.writable = false
        }
      }
    },
    // 非空判断
    verify () {
      let keys = ['createTime', 'serversSubject', 'serversTypeName', 'custName', 'createUser', 'levelName', 'phoneNum']
      let values = ['请求时间', '主题', '类型', '客户名称', '请求人', '优先级', '联系电话']
      for (let [index, key] of keys.entries()) {
        if (!this.form.data[key]) {
          return { verify: true, msg: `${values[index]}不能为空` }
        }
      }
      return { verify: false }
    },
    // 底部按钮返回
    btnCancel () {
      this.$emit('newCancel')
    },
    // 初始化组件
    init (setDisabled, serverId) {
      // 控制表单是否可用
      this.serverId = serverId
      this.setDisabled = setDisabled
      // 表单初始化
      this.formDataInit()
      // 通过ID判断是新增还是查看
      if (this.serverId !== '-1') {
        // 查看
        this.getServersDeskInfoByDeskId()
      } else {
        // 新增启用表单
        this.form.isDisabled = false
        // 新增启用照片上传
        this.itemData.writable = true
      }
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  #addRequest {
    @include overflow();
  }

  .form {
    width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: $space * 5;
    touch-action: none;
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

  .van-cell, .item-bottom {
    border-bottom: $border-width solid $solid-color;
  }

  .van-cell {
    font: initial;
    font-size: $font-size;
  }

  .van-cell-padding {
    padding: $space;
  }

  .van-field-padding {
    padding-bottom: $space * 1.8;
  }

  .img-upload-block {
    position: relative;
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

</style>
