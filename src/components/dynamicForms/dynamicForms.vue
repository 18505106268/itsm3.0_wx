<!-- 动态表单 -->
<template>
  <div id="dynamicForms">
    <div v-for="(tmp,index) in fieldList" :key="index">
      {{tmp.elementName}}
      <!--1.文本框-->
    </div>
  </div>
</template>

<script>
import { Mixin } from '../../util/mixin'

export default {
  name: 'dynamicForms',
  metaInfo: {
    title: ''
  },
  mixins: [Mixin],
  props: {
    // 表单列表
    fieldList: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  components: {},
  data () {
    return {}
  },
  methods: {},
  mounted () {
    console.log('dynamicForms.vue', this.fieldList)
  },
  computed: {}
}
</script>

<style lang="scss" scoped></style>
