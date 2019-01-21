<!-- 弹出框 -->
<template>
  <!-- 弹框 Start-->
  <van-popup class="popup-sta" v-model="showPopup" :close-on-click-overlay="false">
    <div class="role">
      <!-- Title Start -->
      <div class="role-title">
        <span>系统检测到您当前拥有多个角色</span>
        <span>请选择本次提交时所使用的角色</span>
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
              :key="item.roleId"
              :title="item.roleName"
              @click="toggle(index,'checkboxes')"
            >
              <van-checkbox :name="item.roleName" ref="checkboxes"/>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <!-- Checkbox End -->

        <!-- Radio Start -->
        <van-radio-group v-model="radio" v-if="listType === 'radio'">
          <van-cell-group>
            <van-cell v-for="item in list"
                      :key="item.roleId"
                      :title="item.roleName"
                      @click="toggle('','radioes',item)"
            >
              <van-radio :name="item.roleId" ref="radioes"/>
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
import { Popup, Button, RadioGroup, Radio, Checkbox, CheckboxGroup, Cell, CellGroup } from 'vant'

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
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      // checkbox选中的值
      result: [],
      // radio选中的值
      radio: '',
      // 是否显示组件
      showPopup: false
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
          this.radio = item.roleId
          break
      }
    },
    // 提交
    sub () {
      if (this.listType === 'checkbox') {
        this.$emit('popSub', this.result)
      } else {
        this.$emit('popSub', this.radio)
      }
      this.showPopup = false
    },
    // 显示组件
    show () {
      this.showPopup = true
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
