<!--组织架构-->
<template>
  <div id="frameWork">
    <!--内容-->
    <div class="frame-work-block" :style="{height: `${height}px`}">
      <!--title Start -->
      <div class="frame-work-title">
        <span @click="closePopup">取消</span>
      </div>
      <!--title End -->

      <!-- search Start -->
      <!--<div>-->
      <!--<search @on-change="searchChange" v-model="searchValue" @on-focus="onFocus" @on-cancel="onCancel"></search>-->
      <!--</div>-->
      <!-- search End -->

      <!--列表内容 Start -->
      <div v-show="isShow">
        <div class="navigation">
          <span v-for="(bc,index) in breadCrumbs" @click="breadSelected(bc)" :class="{ 'breadActive': bc.isActive }"
                :key="index">{{bc.userName}}</span>
        </div>

        <van-cell-group v-show="catList && catList.length > 0">
          <van-cell class="van-cell-padding" :title="cl.userName" v-for="cl in catList" :key="cl.id" is-link
                    @click="goNextNode(cl)" icon="orders-o"></van-cell>
        </van-cell-group>

        <!-- 选中的内容 Start -->
        <div class="select-item" v-show="selectItem.length > 0">
          <span v-for="(st,index) in selectItem" :key="index">{{st.userName}}<img src="../../assets/imgs/icon-del.png"
                                                                                  @click="delItem(st)"/></span>
        </div>
        <!-- 选中的内容 End -->

        <van-cell-group v-show="dataList && dataList.length > 0">
          <van-cell class="van-cell-padding" :title="dl.userName" v-for="(dl,index) in dataList" :key="dl.id"
                    @click="selected(dl,index)"
                    :class="{ 'breadActive': dl.isActive }" icon="edit"></van-cell>
        </van-cell-group>

        <van-cell class="van-cell-padding" title="当前节点下暂无数据"
                  v-show="catList && dataList && catList.length === 0 && dataList.length === 0"></van-cell>
      </div>
      <!--列表内容 End -->

      <!--搜索内容-->
      <!--<div v-show="!isShow">-->
      <!--&lt;!&ndash;选中的内容&ndash;&gt;-->
      <!--<div class="select-item" v-show="selectItem && selectItem.length > 0">-->
      <!--<span v-for="st in selectItem">{{st.userName}}<img src="../../assets/images/icon-del.png"-->
      <!--@click="delItem(st)"/></span>-->
      <!--</div>-->
      <!--<group title="数据源" v-show="searchList && searchList.length > 0">-->
      <!--<cell :title="sl.userName" v-for="(sl,index) in searchList" :key="sl.id" @click.native="selected(sl,index)"-->
      <!--:class="{ 'breadActive': sl.isActive }"></cell>-->
      <!--</group>-->
      <!--<group title="当前节点下暂无数据" v-show="searchList && searchList.length === 0"></group>-->
      <!--</div>-->

    </div>

    <!--按钮 Start -->
    <div v-if="Number(itemData.isMulti) !== 0">
      <van-button size="large" type="primary" @click="goSub">确定</van-button>
    </div>
    <!--按钮 End -->
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, CellGroup, Search, Button } from 'vant'
import model from '@/model/client.model'

export default {
  name: 'dataSources',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Search.name]: Search,
    [Button.name]: Button
  },
  props: {
    itemData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      height: 0,
      // 搜索值
      searchValue: '',
      // 列表查询切换
      isShow: true,
      // 查询相关
      searchJson: {
        id: '',
        keywords: '',
        isAppoint: '1'
      },
      // 树列表
      catList: [],
      // 对应数据列表
      dataList: [],
      // 搜索列表
      searchList: [],
      // 面包屑
      breadCrumbs: [],
      // 选中的内容
      selectItem: []
    }
  },
  methods: {
    // 关闭数据源
    closePopup () {
      this.itemData.showPopup = false
    },
    // 搜索触发
    searchChange (val) {
      this.searchJson.id = ''
      if (val) {
        this.searchJson.keywords = val
        this.getDataListProcess('search')
      } else {
        this.searchJson.keywords = ''
        this.searchList = []
        this.getDataListProcess('search')
      }
    },
    // 获取数据源
    async getDataListProcess (flag, isFirst) {
      console.log(flag, isFirst)
      let res = await model.getAppointUserList(this.searchJson)
      let dataList = []
      if (this.itemData.value.length > 0) {
        dataList = res.dataList
        for (let x = 0; x < this.selectItem.length; x++) {
          for (let y = 0; y < dataList.length; y++) {
            if (this.selectItem[x].id === dataList[y].id) {
              dataList[y].isActive = true
            }
          }
        }
      } else {
        dataList = res.dataList
      }
      this.catList = res.catList
      this.dataList = dataList
      if (isFirst) {
        this.breadCrumbs.push({
          id: '',
          userName: res.name,
          isActive: true
        })
      }
      if (flag === 'search') {
        this.searchList = dataList
      }
    },
    // 获取焦点
    onFocus () { this.isShow = false },
    onCancel () { this.isShow = true },
    // 选择下一个节点
    goNextNode (item) {
      this.setBreadCrumbs(item)
      this.searchJson.id = item.id
      this.getDataListProcess()
    },
    // 选中元素
    selected (item, _index) {
      if (Number(this.itemData.isMulti) === 0) {
        // 单选
        this.$emit('goAssign', item)
        this.itemData.showPopup = false
      } else {
        this.dataList[_index].isActive = true
        let index = this.selectItem.findIndex(obj => {
          return item.id === obj.id
        })
        if (index === -1) {
          this.selectItem.push(item)
        }
      }
    },
    // 面包屑导航处理
    setBreadCrumbs (obj) {
      let index = this.breadCrumbs.findIndex((item) => {
        return item.id === obj.id
      })
      if (index === -1) {
        this.breadCrumbs = this.breadCrumbs.map(item => {
          item.isActive = false
          return item
        })
        obj.isActive = true
        this.breadCrumbs.push(obj)
      } else {
        this.breadCrumbs.splice(index + 1, this.breadCrumbs.length - index + 1)
        this.breadCrumbs[this.breadCrumbs.length - 1].isActive = true
      }
    },
    // 面包屑导航
    breadSelected (item) {
      this.goNextNode(item)
    },
    // 删除
    delItem (item) {
      let index = this.selectItem.findIndex((obj) => {
        return item.id === obj.id
      })
      this.selectItem.splice(index, 1)
      if (this.dataList.length > 0) {
        this.dataList = this.dataList.map(obj => {
          if (obj.id === item.id) {
            obj.isActive = false
          }
          return obj
        })
      }
      if (this.searchList.length > 0) {
        this.searchList = this.searchList.map(obj => {
          if (obj.id === item.id) {
            obj.isActive = false
          }
          return obj
        })
      }
    },
    // 多选提交
    goSub () {
      this.itemData.value = this.selectItem
      this.itemData.showValue = this.selectItem.map(item => {
        return item.userName
      })
      this.itemData.showPopup = false
    }
  },
  mounted () {
    console.log('mounted')
    this.getDataListProcess('', true)
    if (Number(this.itemData.isMulti) === 0) {
      // 单选
      this.selectItem = []
    }
    this.height = window.innerHeight - (Number(this.itemData.isMulti) === 0 ? 0 : 42)
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  #frameWork {
    background-color: $color-white;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  .frame-work-title {
    font-size: $font-size * 1.2;
    position: relative;
    box-sizing: border-box;
    padding: $space * 1.5;
    text-align: center;
    > span {
      position: absolute;
      right: $space;
      top: $space;
      color: $color-blue;
    }
  }

  .navigation {
    font-size: $font-size * 1.2;
    box-sizing: border-box;
    padding: ($space * 2) $space ($space * 1.5) $space;
    > span:not(:last-child)::after {
      content: url('../../assets/imgs/icon-right.png');
      background-size: $space $space;
      vertical-align: middle;
      display: inline-block;
    }
  }

  .breadActive {
    color: $color-blue;
  }

  .frame-work-block {
    overflow-x: hidden;
    overflow-y: auto;
  }

  .select-item {
    box-sizing: border-box;
    > span {
      display: inline-block;
      background-color: $color-blue;
      border-radius: $border-radius;
      margin-left: $space * 1.5;
      margin-bottom: $space;
      color: $color-white;
      padding: ($space * .5) ($space * 1.5);
      position: relative;
      font-size: $font-size;
      > img {
        position: absolute;
        top: -($space * .7);
        right: -($space * .7);
        height: $space * 1.8;
        width: $space * 1.8;
      }
    }
  }

  .van-cell-padding {
    padding: $space;
  }

  .van-cell {
    font: initial;
    font-size: $font-size;
  }

  .search-block {
    background-color: $color-bg;
    padding: $space;
  }
</style>
