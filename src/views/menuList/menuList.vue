<!-- 表单列表 -->
<template>
  <div id="menuList">
    <!-- 列表 Start-->
    <transition-group tag="div" name="van-fade" v-show="formList">
      <div class="item" v-for="fl in formList" :key="fl.menuName">
        <van-collapse v-model="activeNames">
          <van-collapse-item :title="fl.menuName" :name="fl.menuName" class="collapse">
            <div class="c-item">
              <span v-for="cfl in fl.formList" :key="cfl.id" @click="see(cfl)">{{cfl.name}}</span>
            </div>
          </van-collapse-item>
        </van-collapse>
      </div>
    </transition-group>
    <!-- 列表 End-->

    <!-- 提示 开始 -->
    <div class="list-point" v-show="formList && formList.length === 0">
      暂无数据
    </div>
    <!-- 提示 结束 -->

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
import { Mixin } from '@/util/mixin'
import { mapGetters, mapMutations } from 'vuex'
import { PATH, SET_TITLE } from '@/store/types/common'

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
    /**
     * common/SET_TITLE 设置HTML Title
     */
    ...mapMutations([
      `${PATH}${SET_TITLE}`
    ]),
    // 获取应用下模块列表
    async getFormListByApp () {
      let res = await model.getFromListByApp({ appId: this.id })
      if (res.formList.length === 0) {
        res.formList = []
      }
      this.activeNames = res.formList.map(item => {
        return item.menuName
      })
      this.formList = res.formList
    },
    // 查看或者新增
    see (item) {
      this.isShow = true
      this.actions[0].item = item
      this.actions[1].item = item
    },
    // 选中菜单
    onSelect (obj) {
      // 设置HTML Title
      this[`${PATH}${SET_TITLE}`](obj.item.name)
      // 隐藏下拉菜单
      this.isShow = false
      // formId_appId_menuId_limitMenuId_triggerId_keyId_masterId
      let ids = `${obj.item.id}_${obj.item.appId}_${obj.item.menuId}_${obj.item.limitMenuId}_-1_-1_-1`
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
