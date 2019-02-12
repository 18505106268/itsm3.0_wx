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
        <div @click="popupEvent('isShowClient')">
          <van-field
            class="van-field-padding"
            v-model="form.data.clientName"
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
      <!-- 优先级 -->
      <div class="item">
        <div class="item-title">优先级</div>
        <div @click="popupEvent('isShowLevel')">
          <van-field
            class="van-field-padding"
            v-model="levelName"
            placeholder="请选择优先级"
            disabled="true"
          />
        </div>
      </div>
    </div>
    <!-- Form End -->

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
          <van-cell :border="false" class="van-cell-padding" v-for="(rl,index) in requestList" clickable
                    :key="index"
                    :title="rl.requestName"
                    @click="form.data.requestName = rl.requestName">
            <van-radio :name="rl.requestName"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 请求来源弹框 End-->

    <!-- 客户名称弹框 Start -->
    <van-popup v-model="isShowClient" position="bottom" class="popup-height">
      <van-radio-group v-model="form.data.clientName">
        <van-cell-group>
          <van-cell :border="false" class="van-cell-padding" v-for="(cl,index) in clientList" clickable
                    :key="index"
                    :title="cl.clientName"
                    @click="form.data.clientName = cl.clientName">
            <van-radio :name="cl.clientName"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 客户名称弹框 End-->

    <!-- 优先级弹框 Start -->
    <van-popup v-model="isShowLevel" position="bottom" class="popup-height">
      <van-radio-group v-model="levelName">
        <van-cell-group>
          <van-cell :border="false" class="van-cell-padding" v-for="(ll,index) in levelList" clickable
                    :key="index"
                    :title="ll.levelName"
                    @click="levelName = ll.levelName">
            <van-radio :name="ll.levelName"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
    <!-- 优先级弹框 End-->
  </div>
</template>

<script>
import { Field, DatetimePicker, Popup, Cell, CellGroup, RadioGroup, Radio } from 'vant'
import { Mixin } from '@/util/mixin'

export default {
  name: 'addRequest',
  metaInfo: {
    title: '新增'
  },
  mixins: [Mixin],
  components: {
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio
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
          // 请求来源
          requestName: '',
          // 客户名称
          clientName: '',
          // 优先级
          levelId: '1'
        }
      },
      // 优先级文字展示
      levelName: '',
      // 请求来源数据
      requestList: [
        {
          requestName: '请求来源_1'
        },
        {
          requestName: '请求来源_2'
        },
        {
          requestName: '请求来源_3'
        },
        {
          requestName: '请求来源_4'
        }
      ],
      // 客户名称数据
      clientList: [
        {
          clientName: '客户名称_1'
        },
        {
          clientName: '客户名称_2'
        },
        {
          clientName: '客户名称_3'
        },
        {
          clientName: '客户名称_4'
        }
      ],
      // 优先级数据
      levelList: [
        {
          levelId: '1',
          levelName: '低级'
        },
        {
          levelId: '2',
          levelName: '中级'
        },
        {
          levelId: '3',
          levelName: '高级'
        },
        {
          levelId: '4',
          levelName: '紧急'
        }
      ],
      // 组件时间初始化
      time: new Date(),
      // 是否显示请求时间上拉菜单
      isShowTime: false,
      // 是否显示请求来源上拉菜单
      isShowRequest: false,
      // 是否显示客户名称上拉菜单
      isShowClient: false,
      // 是否显示优先级上拉菜单
      isShowLevel: false
    }
  },
  methods: {
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
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/styles/global";
  @import "addRequest";
</style>
