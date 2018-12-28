<template>
  <div id="app">
    <router-view/>
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
      transitionName: ''
    }
  },
  methods: {},
  computed: {},
  mounted () {
    console.log(window.location.hash)
    if (window.location.hash === '#/') {
      let url = window.location.search
      if (Number(url.indexOf('?')) !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        console.log(strs)
      }
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  html.style.fontSize = `${fontSize}px`
})
</script>
<style lang="scss" scoped>
  @import "./assets/styles/global";
</style>
