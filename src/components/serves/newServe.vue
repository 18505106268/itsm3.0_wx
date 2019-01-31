<!-- 新建服务请求 -->
<template>
  <div id="newServe">

    <!-- TAB Start-->
    <van-tabs type="card" :color="blue" class="tabs">
      <van-tab title="详情">

        <!-- 表单 Start -->
        <div class="serve-content">详情</div>
        <!-- 表单 End -->

      </van-tab>
      <van-tab title="处理记录">

        <!-- 处理记录 Start -->
        <div class="serve-content">处理记录</div>
        <!-- 处理记录 End -->

      </van-tab>
    </van-tabs>
    <!-- TAB End-->

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

  </div>
</template>

<script>
import { Mixin } from '../../util/mixin'
import color from '@/util/color'
import { Button, Tab, Tabs } from 'vant'

export default {
  name: 'newServe',
  mixins: [Mixin],
  components: {
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data () {
    return {
      // tab颜色
      blue: color.blue
    }
  },
  methods: {
    // 确定
    sub () {
      this.$emit('newSub', {})
    },
    // 取消
    cancel () {
      this.$emit('newCancel')
    },
    // 显示时间控件
    timeEvent () {}
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  #newServe {
    @include overflow();
    background-color: $color-white;
    position: relative;
    padding-top: $space;
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

  .van-button {
    border-radius: 0;
  }

  .serve-content {
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    top: $space * 3;
    bottom: $space * 5;
    left: 0;
    right: 0;
  }

  .tabs {
    height: 100%;
  }
</style>
