<!-- 表单列表 -->
<template>
  <div id="menuList">
    <van-collapse v-model="activeNames">
      <van-collapse-item title="有赞微商城" name="1">
        提供多样店铺模板，快速搭建网上商城
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import { Mixin } from '../../util/mixin'

import { Collapse, CollapseItem } from 'vant'

export default {
  name: 'menuList',
  metaInfo: {
    title: ''
  },
  props: ['id'],
  mixins: [Mixin],
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },
  data () {
    return {
      activeNames: ['1']
    }
  },
  methods: {},
  mounted () {},
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "menuList";
</style>
