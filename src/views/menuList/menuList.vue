<!-- 表单列表 -->
<template>
  <div id="menuList">
    <!-- 列表 Start-->
    <transition-group tag="div" name="van-fade" v-show="formList">
      <div class="item" v-for="fl in formList" :key="fl.menuName">
        <van-collapse v-model="activeNames">
          <van-collapse-item :title="fl.menuName" :name="fl.menuName">
            <div class="c-item">
              <span v-for="cfl in fl.formList" :key="cfl.id" @click="see(cfl)">{{cfl.name}}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </transition-group>
    <!-- 列表 End-->

    <!-- Loading Start-->
    <div class="mask" v-show="!formList">
      <van-loading/>
    </div>
    <!-- Loading End-->

    <!-- 上拉菜单 Start-->
    <van-actionsheet v-model="isShow" :actions="actions" @select="onSelect"/>
    <!-- 上拉菜单 End-->
  </div>
</template>

<script>
import model from '@/model/client.model'
import { Mixin } from '../../util/mixin'
import { mapGetters } from 'vuex'

import { Collapse, CollapseItem, Actionsheet, Loading } from 'vant'

export default {
  name: 'menuList',
  metaInfo () {
    return {
      title: this['common/title']
    }
  },
  props: ['id'],
  mixins: [Mixin],
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Actionsheet.name]: Actionsheet,
    [Loading.name]: Loading
  },
  data () {
    return {
      // 折叠面板标记
      activeNames: [],
      // 是否显示上拉菜单
      isShow: false,
      // 上拉菜单list
      actions: [
        {
          to: '/add/',
          name: '新增',
          item: undefined
        },
        {
          to: '/see/',
          name: '查看',
          item: undefined
        }
      ],
      // 表单列表
      formList: undefined
    }
  },
  methods: {
    // 获取应用下模块列表
    async getFormListByApp () {
      let res = await model.getFromListByApp({ appId: this.id })
      if (res.formList.length === 0) return
      this.activeNames = res.formList.map(item => {
        return item.menuName
      })
      this.formList = res.formList
      console.log(this.formList)
    },
    // 查看或者新增
    see (item) {
      this.isShow = true
      this.actions[0].item = item
      this.actions[1].item = item
    },
    // 选中菜单
    onSelect (obj) {
      this.isShow = false
      // formId_appId_menuId_limitMenuId_triggerId_keyId
      let ids = `${obj.item.id}_${obj.item.appId}_${obj.item.menuId}_${obj.item.limitMenuId}_-1_-1`
      this.$router.push(`${obj.to}${ids}`)
    }
  },
  mounted () {
    this.getFormListByApp()
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
  @import "menuList";
</style>
