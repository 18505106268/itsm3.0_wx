<!-- 微信照片上传 -->
<template>
  <div class="upload-block">
    <div class="upload">
      <div class="upload_warp">
        <div class="upload_warp_left" @click="chooseImage" v-show="itemData.writable">
          <img src="../../assets/imgs/icon-img.png">
        </div>
        <div class="upload_warp_left" v-show="!itemData.writable">
          <img src="../../assets/imgs/icon-img_2.png">
        </div>
      </div>
      <div class="upload_warp_img">
        <div class="upload_warp_img_div" v-for="(item,index) of itemData.localIds" :key="index">
          <div class="upload_warp_img_div_top" v-show="itemData.writable">
            <img src="../../assets/imgs/icon-del.png" class="upload_warp_img_div_del" @click="fileDel(index,item)">
          </div>
          <img :src="item" @click="showImgFn(item)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Mixin } from '@/util/mixin'

export default {
  name: 'wxUpload',
  mixins: [Mixin],
  props: {
    itemData: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  data () {
    return {
      // 微信对象
      wx: undefined
    }
  },
  methods: {
    // 选择图片
    chooseImage () {
      const wx = this.wx
      wx.chooseImage({
        success: res => {
          let currentLocalIds = []
          for (let localId of res.localIds) {
            currentLocalIds.push(localId)
          }
          this.uploadImage(currentLocalIds)
          this.itemData.localIds = this.itemData.localIds.concat(currentLocalIds)
        }
      })
    },
    // 上传图片
    uploadImage (localIds) {
      const $this = this
      const wx = $this.wx
      let i = 0
      let length = localIds.length

      function upload () {
        wx.uploadImage({
          localId: localIds[i],
          success: res => {
            $this.itemData.uploadObjArr.push({ localId: localIds[i], serverId: res.serverId })
            i++
            if (i < length) {
              upload()
            }
          },
          fail: res => {
            alert('上传失败 fail ==== >' + JSON.stringify(res))
          }
        })
      }

      upload()
    },
    // 删除图片
    fileDel (index, _item) {
      if (!_item.startsWith('http')) {
        let _index = this.itemData.uploadObjArr.findIndex(item => {
          return item.localId === _item
        })
        if (_index !== -1) {
          this.itemData.uploadObjArr.splice(_index, 1)
        }
      }
      this.itemData.localIds.splice(index, 1)
    },
    // 全屏显示图
    showImgFn (src) {
      console.log(src)
    }
  },
  mounted () {
    this.wx = window.wx
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .upload {
    > div:nth-child(1) {
      width: $space * 12;
      position: absolute;
      left: 0;
      top: 0;
    }
    > div:nth-child(2) {
      margin-left: $space * 12;
      padding: ($space * .5) 0;
    }
  }

  .upload_warp_left {
    width: 100%;
    height: $space * 12;
    padding: $space * 2;
    box-sizing: border-box;
    > img {
      height: 100%;
      width: 100%;
    }
  }

  .upload_warp {
    position: relative;
    > input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      opacity: 0;
      z-index: 1;
    }
  }

  .upload_warp_img_div_top {
    position: absolute;
    height: $space * 2;
    width: $space * 2;
    right: -($space * .9);
    top: -($space * .9);
    z-index: 9999;
    > img {
      height: 100%;
      width: 100%;
    }
  }

  .upload_warp_img_div {
    position: relative;
    width: $space * 10;
    height: $space * 10;
    box-sizing: border-box;
    box-shadow: 0 ($space * .4) ($space * 1.6) 0 gainsboro;
    margin: $space;
    > img {
      height: 100%;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      margin: auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .upload_warp_img {
    display: flex;
    flex-wrap: wrap;
    min-height: $space * 12;
    > div {
      margin: $space * .8;
    }
  }
</style>
