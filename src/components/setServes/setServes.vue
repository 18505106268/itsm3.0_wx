<!-- 设置相关服务请求 -->
<template>
  <div id="setServes">
    <!-- 新增 Start-->
    <div class="add">新建</div>
    <!-- 新增 End-->

    <!-- 列表 Start -->
    <div class="serve-content">
      <div v-for="i in 100" :key="i">{{i}}</div>
    </div>
    <!-- 列表 End -->

    <!-- 底部按钮 Start-->
    <div class="btn">
      <div class="btn-item">
        <van-button size="large" type="primary">确定</van-button>
      </div>
      <div class="btn-item">
        <van-button size="large">取消</van-button>
      </div>
    </div>
    <!-- 底部按钮 End-->
  </div>
</template>

<script>
import { Mixin } from '../../util/mixin'
import { Button } from 'vant'

export default {
  name: 'setServes',
  mixins: [Mixin],
  components: {
    [Button.name]: Button
  },
  data () {
    return {}
  },
  methods: {
    // 获取服务请求列表
    async getServes () {}
  },
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  #setServes {
    @include overflow();
    background-color: $color-white;
    position: relative;
  }

  .add {
    font-size: $font-size;
    @include right;
    padding: $space * 1.6;
    color: $color-blue;
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
    position: absolute;
    top: $space * 4.5;
    left: 0;
    right: 0;
    bottom: $space * 5;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
