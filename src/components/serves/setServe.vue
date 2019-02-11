<!-- 设置相关服务请求 -->
<template>
  <div id="setServe">
    <!-- 新增 Start-->
    <div class="add" @click="add">新建</div>
    <!-- 新增 End-->

    <!-- 列表 Start -->
    <div class="serve-content">
      <div v-for="l in list" :key="l.serversDeskId">{{l.serversCode}}</div>
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

    <!-- 新建服务请求 Start -->
    <van-popup v-model="servePopup" position="right" :overlay="false" class="serves-popup">
      <new-serve @newSub="newSub" @newCancel="newCancel"></new-serve>
    </van-popup>
    <!-- 新建服务请求 End -->
  </div>
</template>

<script>
import { Button, Popup } from 'vant'
import { Mixin } from '@/util/mixin'
import model from '@/model/client.model'
import newServe from '@/components/serves/newServe'

export default {
  name: 'setServe',
  mixins: [Mixin],
  components: {
    newServe: newServe,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  data () {
    return {
      // 是否显示新增服务请求页
      servePopup: false,
      // 服务请求列表
      list: []
    }
  },
  methods: {
    // 获取服务请求列表
    async getServes () {
      let res = await model.getServers({ pcId: '-1', custId: '1' })
      this.list = res.data
    },
    // 确定
    sub () {
      this.$emit('serverSub', [])
    },
    // 取消
    cancel () {
      this.$emit('serverCancel')
    },
    // 新建
    add () {
      this.servePopup = true
    },
    // 新建确定
    newSub (item) {
      console.log(item)
      this.servePopup = false
    },
    // 新建取消
    newCancel () {
      this.servePopup = false
    }
  },
  mounted () {
    this.getServes()
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

  .serves-popup {
    width: 100%;
    height: 100%;
  }
</style>
