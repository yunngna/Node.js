const { defineConfig } = require('@vue/cli-service')
const server = 'http://localhost:3000/';

module.exports = defineConfig({
  transpileDependencies: true,

  //cors 무력화 시키기 위해 proxy 설정 (proxy setting)
  devServer : {
     // port는 언제든지 변경이 가능하다. vue 가 가지는 포트를 변경 하는 방법 
    port : 8099,
    proxy : {
      '^/api' : {
        target : server,
        changeOrigin : true,
        pathRewrite : {'^/api' : '/'},
        ws : false
      }
    }
  }

})
