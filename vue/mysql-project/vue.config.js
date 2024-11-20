const { defineConfig } = require('@vue/cli-service')
const serverOrigin = 'http://localhost:3000'; // origin  = 포트까지의 값 

module.exports = defineConfig({
  transpileDependencies: true,
  devServer : {
    proxy : {
      '^/api' : { // 여기서 ^ 는 /api로 시작하는 모든 경로 를 proxy처리 하겠다 의미
        target : serverOrigin, // 변경하고자 하는 origin 
        changeOrigin : true,
        ws : false, // websocket 을 체크(서버 쪽에 웹소켓을 연결 하려고 하는 시도)  계속하면 딜레이 걸림 
        pathRewrite :{'^/api' : '/'} // /api 를 /로 대체 한다. (실제 요청을 할때 api를 사용해서는 안되기 때문이다.)
      }
    }
  }
})
