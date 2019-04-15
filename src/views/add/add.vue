<!-- 新增 -->
<template>
  <div id="add">
    <keep-alive>
      <create-dynamic-forms :processJson="processJson" ref="createDynamicForms"></create-dynamic-forms>
    </keep-alive>
  </div>
</template>

<script>
import { Mixin } from '@/util/mixin'
import CreateDynamicForms from '@/components/dynamicForms/createDynamicForms'
import { mapGetters } from 'vuex'

export default {
  name: 'add',
  metaInfo () {
    return {
      title: this['common/title']
    }
  },
  props: ['ids'],
  mixins: [Mixin],
  components: {
    CreateDynamicForms: CreateDynamicForms
  },
  data () {
    return {
      // 验证是否有流程参数
      processJson: {},
      // 渲染组件
      isShow: false
    }
  },
  methods: {},
  mounted () {
    // formId_appId_menuId_limitMenuId_triggerId_keyId_masterId
    let ids = this.ids.split('_')
    this.processJson.formId = ids[0]
    this.processJson.appId = ids[1]
    this.processJson.menuId = ids[2]
    this.processJson.limitMenuId = ids[3]
    this.processJson.triggerId = ids[4]
    this.processJson.keyId = ids[5]
    this.processJson.masterId = ids[6]
    this.$nextTick(() => {
      /*
      * formId如果为-1则表示是触发器触发了该组件，需要调用 getFromListByApp 来获取表单列表
      * */
      if (this.processJson.triggerId === '-1') {
        if (this.processJson.formId !== '-1') return this.$refs.createDynamicForms.checkProcessLimitMenu()
        this.$refs.createDynamicForms.getFromListByApp()
      } else {
        this.$refs.createDynamicForms.checkProcessLimitMenu()
      }
    })
  },
  computed: {
    /**
     * common/title Html Title
     */
    ...mapGetters(['common/title'])
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "add";
</style>
