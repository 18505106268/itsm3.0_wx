<!-- 找回密码 -->
<template>
  <div id="find" :style="{height: `${height}px`}">
    find
  </div>
</template>

<script>
export default {
  name: 'find',
  data () {
    return {
      // 容器高度
      height: 0
    }
  },
  mounted () {
    this.height = window.innerHeight
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "find";
</style>
