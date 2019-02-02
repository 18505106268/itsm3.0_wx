<!-- 弹出框 -->
<template>
  <!-- 弹框 Start-->
  <van-popup class="popup-sta" v-model="showPopup" :close-on-click-overlay="false">
    <div class="role">
      <!-- Title Start -->
      <div class="role-title">
        <span>{{title_1}}</span>
        <span>{{title_2}}</span>
      </div>
      <!-- Title End -->

      <!-- List Start -->
      <div class="role-list">
        <!-- Checkbox Start -->
        <van-checkbox-group v-model="result" :max="max" v-if="listType === 'checkbox'">
          <van-cell-group>
            <van-cell
              v-for="(item,index) in list"
              clickable
              :key="item[keyName]"
              :title="item[showName]"
              @click="toggle(index,'checkboxes')"
            >
              <van-checkbox :name="item[keyName]" ref="checkboxes"/>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <!-- Checkbox End -->

        <!-- Radio Start -->
        <van-radio-group v-model="radio" v-if="listType === 'radio'">
          <van-cell-group>
            <van-cell v-for="item in list"
                      :key="item[keyName]"
                      :title="item[showName]"
                      @click="toggle('','radioes',item)"
            >
              <van-radio :name="item[keyName]" ref="radioes"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <!-- Radio End -->
      </div>
      <!-- List End -->
      <!-- Button Start -->
      <div class="role-button">
        <van-button size="large" type="primary" @click="sub">确定</van-button>
      </div>
      <!-- Button End -->
    </div>
  </van-popup>
  <!-- 弹框 End-->
</template>

<script>
import { Popup, Button, RadioGroup, Radio, Checkbox, CheckboxGroup, Cell, CellGroup, Notify } from 'vant'
import color from '@/util/color'

export default {
  name: 'proPopup',
  props: {
    // 列表数据
    list: {
      type: Array,
      default: () => []
    },
    // 列表类型
    listType: {
      type: String,
      default: ''
    },
    // checkbox 最大可选数 默认0为无限制
    max: {
      type: Number,
      default: 0
    },
    // 绑定key名
    keyName: {
      type: String
    },
    // 绑定显示名
    showName: {
      type: String
    },
    // 顶部提示1
    title_1: {
      type: String,
      default: ''
    },
    // 顶部提示2
    title_2: {
      type: String,
      default: ''
    }
  },
  components: {
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Notify.name]: Notify
  },
  data () {
    return {
      // checkbox选中的值
      result: [],
      // radio选中的值
      radio: '',
      // 是否显示组件
      showPopup: false,
      // 选中的对象
      item: undefined
    }
  },
  methods: {
    // 点击事件触发
    toggle (index, type, item) {
      switch (type) {
        case 'checkboxes':
          this.$refs[type][index].toggle()
          break
        case 'radioes':
          this.radio = item[this.keyName]
          this.item = item
          break
      }
    },
    // 提交
    sub () {
      if (this.listType === 'checkbox') {
        let arr = this.list.filter(item => {
          return this.result.some(ele => {
            return ele === item[this.keyName]
          })
        })
        if (arr.length === 0) return Notify({ message: '请至少选择一位', background: color.error })
        this.$emit('popSub', arr)
      } else {
        if (!this.item) return Notify({ message: '请至少选择一位', background: color.error })
        this.$emit('popSub', this.item)
      }
      this.showPopup = false
    },
    // 显示组件
    show () {
      this.showPopup = true
    },
    // 设置多选框全部选中
    all () {
      this.result = this.list.map(item => item[this.keyName])
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .popup-sta {
    width: 80%;
    height: 80%;
  }

  .role {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: $space;
    position: relative;
    overflow: hidden;
    &-title {
      width: 80%;
      margin: auto;
      span {
        display: flex;
        width: 100%;
        @include center;
      }
      span:nth-child(1) {
        font-size: $font-size * 1.1;
        color: $color-grey;
        margin: ($space * .8) 0;
      }
      span:nth-child(2) {
        font-size: $font-size * .9;
        color: $color-grey-plus;
      }
    }

    &-button {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      background-color: $color-white;
      box-sizing: border-box;
    }

    &-list {
      position: absolute;
      width: 100%;
      left: 0;
      right: 0;
      bottom: $space * 5.1;
      top: $space * 6;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  .van-button {
    border-radius: 0;
  }

  .van-cell {
    padding: $space * 1.2;
    font: initial;
  }
</style>
