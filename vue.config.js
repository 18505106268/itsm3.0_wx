const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://itsm-wx-yy.oss-cn-shanghai.aliyuncs.com/' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      '/ITSM4.0': {
        // target: 'http://192.168.1.160:8080',
        target: 'http://iyunware.com:8085',
        // target: 'http://itss-china.cn',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
