<!-- 动态表单 -->
<template>
  <div id="dynamicForms">
    <!-- 列表 Start-->
    <transition-group tag="div" name="van-fade">
      <div v-for="tmp in fieldList" :key="tmp.inFieldId">
        <!--1.文本框 && 2.多行文本-->
        <div class="item" v-if="Number(tmp.elementId) === 1 ||Number(tmp.elementId) === 2 && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <van-field
            v-model="tmp.value"
            :placeholder="`请输入${tmp.name}`"
            :disabled="!tmp.writable"
            :maxlength="tmp.maxlength"
            type="textarea"
            autosize
          />
        </div>
        <!--3.数字框-->
        <div class="item" v-else-if="Number(tmp.elementId === 3) && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <van-field
            class="van-field-padding"
            v-model="tmp.value"
            :placeholder="`请输入${tmp.name}`"
            :disabled="!tmp.writable"
            :maxlength="tmp.maxlength"
            type="number"
          />
        </div>
        <!--4.单选框-->
        <div class="item" v-else-if="Number(tmp.elementId) === 4 && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <van-radio-group v-model="tmp.value">
            <van-cell-group :border="false">
              <van-cell class="van-cell-padding" :border="false" :title="o" clickable
                        @click="tmp.writable ? tmp.value = o : false" v-for="(o,index) in tmp.option" :key="index">
                <van-radio :name="o" :disabled="!tmp.writable"/>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <!--5.多选框-->
        <div class="item" v-else-if="Number(tmp.elementId) === 5 && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <van-checkbox-group v-model="tmp.value" :disabled="!tmp.writable">
            <van-cell-group :border="false">
              <van-cell :border="false" class="van-cell-padding" v-for="(o,index) in tmp.option" clickable :key="index"
                        :title="o"
                        @click="toggle(index,tmp)">
                <van-checkbox :name="o" :ref="`${tmp.elementId}_${tmp.inFieldId}`"/>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
        <!--6.日期时间-->
        <div class="item" v-else-if="Number(tmp.elementId) === 6 && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <div @click="tmp.writable ? tmp.showPopup  = true : false">
            <van-field
              class="van-field-padding"
              v-model="tmp.val"
              :placeholder="tmp.writable ? `请选择${tmp.name}` : `${tmp.name}不可用`"
              disabled="true"
            />
          </div>
          <van-popup v-model="tmp.showPopup" position="bottom">
            <van-datetime-picker
              v-model="tmp.value"
              :type="tmp.datatimeformat"
              :min-date="tmp.minDate"
              :max-date="tmp.maxDate"
              @confirm="confirm(tmp)"
              @cancel="cancel"
            />
          </van-popup>
        </div>
      </div>
    </transition-group>
    <!-- 列表 End-->
  </div>
</template>

<script>
import { Mixin } from '../../util/mixin'
import { Field, RadioGroup, Radio, Cell, CellGroup, Checkbox, CheckboxGroup, DatetimePicker, Popup } from 'vant'

export default {
  name: 'dynamicForms',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  components: {
    [Field.name]: Field,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup
  },
  props: {
    // 表单列表
    fieldList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    // 多选手动触发
    toggle (index, tmp) {
      this.$refs[`${tmp.elementId}_${tmp.inFieldId}`][index].toggle()
    },
    // 时间控件点击完成触发事件
    confirm (tmp) {
      tmp.val = tmp.value.toString()
    },
    // 时间控件点击取消触发事件
    cancel () {
      console.log('cancel')
    }
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

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
    border-bottom: $border-width solid #ebedf0;
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
</style>
