<!--数据源-->
<template>
  <div id="dataSource">
    <!-- 内容 Start -->
    <div class="data-source-block" :style="{height: `${height}px`}">

      <!-- Title Start -->
      <div class="data-source-title">
        <span @click="closePopup">关闭</span>
      </div>
      <!-- Title End -->

      <!-- Search Start -->
      <!--<div class="search-block">-->
      <!--&lt;!&ndash;<search @on-change="searchChange" v-model="searchValue" @on-focus="onFocus" @on-cancel="onCancel"></search>&ndash;&gt;-->
      <!--<van-search-->
      <!--v-model="searchValue"-->
      <!--placeholder="请输入搜索关键词"-->
      <!--show-action-->
      <!--@clear="onCancel"-->
      <!--&gt;-->
      <!--<div slot="action" @click="searchChange">搜索</div>-->
      <!--</van-search>-->
      <!--</div>-->
      <!-- Search End -->

      <!-- 列表内容 Start -->
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
      <!-- 列表内容 End -->

      <!--搜索内容 Start -->
      <div v-show="!isShow">

        <!--选中的内容 Start-->
        <div class="select-item" v-show="selectItem && selectItem.length > 0">
          <span v-for="(st,index) in selectItem" :key="index">{{st.userName}}<img src="../../assets/imgs/icon-del.png"
                                                                                  @click="delItem(st)"/>{{st.userName}}</span>
        </div>
        <!--选中的内容 End-->

        <van-cell-group title="数据源" v-show="searchList && searchList.length > 0">
          <van-cell class="van-cell-padding" :title="sl.userName" v-for="(sl,index) in searchList" :key="sl.id"
                    @click="selected(sl,index)"
                    :class="{ 'breadActive': sl.isActive }"></van-cell>
        </van-cell-group>

        <div :title="notTip" v-show="searchList && searchList.length === 0"></div>
      </div>
      <!--搜索内容 End -->

    </div>
    <!-- 内容 End -->

    <!-- 按钮 Start -->
    <div v-if="Number(itemData.isMulti) !== 0">
      <van-button size="large" type="primary" @click="goSub">确定</van-button>
    </div>
    <!-- 按钮 End -->

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
        dataSource: '',
        dataSourceType: ''
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
      selectItem: [],
      // Toast 相关
      position: 'default',
      showPositionValue: false,
      toastText: '',
      toastWidth: '',
      notTip: ''
    }
  },
  methods: {
    // 关闭数据源
    closePopup () {
      this.itemData.showPopup = false
    },
    // 搜索触发
    searchChange () {
      this.isShow = false
      this.searchJson.id = ''
      if (this.searchValue) {
        this.searchJson.keywords = this.searchValue
        this.getDataListProcess('search')
      } else {
        this.searchJson.keywords = ''
        this.searchList = []
        this.getDataListProcess('search')
      }
    },
    // 获取数据源
    async getDataListProcess (flag, isFirst) {
      let res = await model.getDataListProcess(this.searchJson)
      let dataList = []
      // 判断是否是抄送
      if (res.dataList.length !== 0) {
        if (res.dataList[0].typ) {
          dataList = res.dataList.filter(item => Number(item.typ) === 0)
        } else {
          dataList = res.dataList
        }
      }
      if (this.itemData.value.length > 0 && Number(this.itemData.isMulti) === 1) {
        // 回填选中元素 this.selectItem
        for (let x = 0; x < this.itemData.value.length; x++) {
          for (let y = 0; y < dataList.length; y++) {
            if (this.itemData.value[x].id === dataList[y].id) {
              dataList[y].isActive = true
              this.selectItem.push(dataList[y])
            }
          }
        }
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
        if (dataList.length === 0) {
          this.notTip = '当前节点下暂无数据'
        }
        this.searchList = dataList
      }
    },
    // 获取焦点
    onFocus () {
      this.isShow = false
    },
    onCancel () {
      this.isShow = true
    },
    // 选择下一个节点
    goNextNode (item) {
      this.setBreadCrumbs(item)
      this.searchJson.id = item.id
      this.getDataListProcess()
    },
    // 选中元素
    selected (item, _index) {
      // 判断是否是审批元素
      if (this.itemData.isApproval) {
        // 审批元素
        item.surname = item.userName.substr(0, 1)
        this.itemData.value.push(item)
        this.itemData.showPopup = false
      } else if (this.itemData.isCarbonCopy) {
        // 抄送
        this.dataList[_index].isActive = true
        let index = this.selectItem.findIndex(obj => {
          return item.id === obj.id
        })
        if (index === -1) {
          item.surname = item.userName.substr(0, 1)
          this.selectItem.push(item)
        }
      } else {
        // 数据源
        if (Number(this.itemData.isMulti) === 0) {
          // 单选
          this.itemData.showValue = null
          this.itemData.value = []
          this.itemData.showValue = item.userName
          this.itemData.value.push(item)
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
      if (index !== -1) {
        this.selectItem.splice(index, 1)
      }
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
      }).join(',')
      this.itemData.showPopup = false
    }
  },
  mounted () {
    this.searchJson.dataSource = this.itemData.dataSource
    this.searchJson.dataSourceType = this.itemData.dataSourceType
    this.getDataListProcess('', true)
    if (Number(this.itemData.isMulti) === 0) {
      // 单选
      this.selectItem = []
    }
    this.height = window.innerHeight - (Number(this.itemData.isMulti) === 0 ? 0 : 50)
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  #dataSource {
    background-color: $color-white;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }

  .data-source-title {
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

  .data-source-block {
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
