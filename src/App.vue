<template>
  <div id="app" :style="{height: `${height}px`}">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: '云惠ITSM云应用平台'
  },
  name: 'APP',
  data () {
    return {
      // 动画
      transitionName: '',
      // 容器高度
      height: 0
    }
  },
  methods: {},
  watch: {
    '$route' (to, from) {
      this.transitionName = this.$store.state.interlude.direction !== 'forward' ? 'pop-out' : 'pop-in'
    }
  },
  computed: {},
  mounted () {
    this.height = window.innerHeight
    if (window.location.hash === '#/') {
      let url = window.location.search
      if (Number(url.indexOf('?')) !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        console.log(strs)
      }
    }
    console.log(wx)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = `${fontSize}px`
})

</script>
<style lang="scss" scoped>
  @import "./assets/styles/global";
</style>
