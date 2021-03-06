const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

module.exports = {
  // http://itssyuntest.oss-cn-beijing.aliyuncs.com/
  // https://itsm-wx-yy.oss-cn-shanghai.aliyuncs.com/
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'https://itsm-wx-yy.oss-cn-shanghai.aliyuncs.com/'
    : '/',
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
      '/ITSM3.0': {
        // target: 'http://192.168.1.169:8080',
        // target: 'http://iyunware.com:8085',
        target: 'http://itss-china.cn',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
