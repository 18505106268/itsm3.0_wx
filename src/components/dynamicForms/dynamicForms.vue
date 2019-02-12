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
          <div @click="timeEvent(tmp)">
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
              :min-date="tmp.datatimemin"
              :max-date="tmp.datatimemax"
              @confirm="confirm"
              @cancel="cancel(tmp)"
            />
          </van-popup>
        </div>
        <!--7.数据源-->
        <div class="item" v-else-if="Number(tmp.elementId) === 7 && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <div @click="dataSourceEvent(tmp)">
            <van-field
              class="van-field-padding"
              v-model="tmp.showValue"
              :placeholder="tmp.writable ? `请选择${tmp.name}` : `${tmp.name}不可用`"
              disabled="true"
            />
          </div>
          <van-popup v-model="tmp.showPopup" position="right" class="data-source-popup" :overlay="false">
            <data-source :itemData="tmp"></data-source>
          </van-popup>
        </div>
        <!--9.下拉框 单选-->
        <div class="item" v-else-if="Number(tmp.elementId) === 9 && Number(tmp.isMulti) === 0 && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <van-radio-group v-model="tmp.value">
            <van-cell-group :border="false">
              <van-cell class="van-cell-padding" :border="false" :title="o.name" clickable
                        @click="tmp.writable ? tmp.value = o.name : false" v-for="(o,index) in tmp.option" :key="index">
                <van-radio :name="o.name" :disabled="!tmp.writable"/>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <!--9.下拉框 多选-->
        <div class="item" v-else-if="Number(tmp.elementId) === 9 && Number(tmp.isMulti) === 1 && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <van-checkbox-group v-model="tmp.value" :disabled="!tmp.writable">
            <van-cell-group :border="false">
              <van-cell :border="false" class="van-cell-padding" v-for="(o,index) in tmp.option" clickable :key="index"
                        :title="o.name"
                        @click="toggle(index,tmp)">
                <van-checkbox :name="o.name" :ref="`${tmp.elementId}_${tmp.inFieldId}`"/>
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </div>
        <!--10.表单数据-->
        <div class="item" v-else-if="Number(tmp.elementId === 10) && tmp.readable">
          <div class="item-title">{{tmp.name}}</div>
          <div @click="formEvent(tmp)">
            <van-field
              class="van-field-padding"
              v-model="tmp.val"
              :placeholder="tmp.writable ? `请选择${tmp.name}` : `${tmp.name}不可用`"
              disabled="true"
            />
          </div>
          <van-popup v-model="tmp.showPopup" position="bottom" class="popup-height">
            <van-radio-group v-model="tmp.value">
              <van-cell-group>
                <van-cell :border="false" class="van-cell-padding" v-for="(o,index) in tmp.option" clickable
                          :key="index"
                          :title="o.name"
                          @click="formToggle(tmp,o)">
                  <van-radio :name="o.id"/>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </van-popup>
        </div>
      </div>
    </transition-group>
    <!-- 列表 End-->
  </div>
</template>

<script>
import { Field, RadioGroup, Radio, Cell, CellGroup, Checkbox, CheckboxGroup, DatetimePicker, Popup } from 'vant'
import { Mixin } from '@/util/mixin'
import DataSource from '@/components/dataSource/dataSource'

export default {
  name: 'dynamicForms',
  mixins: [Mixin],
  components: {
    DataSource: DataSource,
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
    return {
      nowTmp: undefined
    }
  },
  methods: {
    // 多选手动触发
    toggle (index, tmp) {
      this.$refs[`${tmp.elementId}_${tmp.inFieldId}`][index].toggle()
    },
    // 时间控件点击完成触发事件
    confirm (date) {
      this.dateToString(date)
      this.nowTmp.showPopup = false
    },
    // 时间控件点击取消触发事件
    cancel (tmp) {
      tmp.showPopup = false
    },
    // 日期时间点击事件
    timeEvent (tmp) {
      if (tmp.writable) {
        tmp.showPopup = true
        this.nowTmp = tmp
      }
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
        switch (this.nowTmp.datatimeformat) {
          case 'date':
            this.nowTmp.val = `${year}-${month}-${day}`
            break
          case 'datetime':
            hour = Number(hour) === 0 ? '00' : hour
            minutes = Number(minutes) === 0 ? '00' : minutes
            this.nowTmp.val = `${year}-${month}-${day} ${hour}:${minutes}`
            break
        }
      } else {
        this.nowTmp.val = date
      }
    },
    // 数据源事件
    dataSourceEvent (tmp) {
      if (tmp.writable) {
        tmp.showPopup = true
      }
    },
    // 表单数据点击事件
    formEvent (tmp) {
      if (tmp.writable) {
        tmp.showPopup = true
      }
    },
    // 表单数据选中事件
    formToggle (tmp, o) {
      tmp.value = o.id
      tmp.val = o.name
      tmp.showPopup = false
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

  #dynamicForms {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: $space * 5;
  }

  .data-source-popup {
    width: 100%;
    height: 100%;
    z-index: 99999;
  }

  .popup-height {
    height: 50%;
  }
</style>
