import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 모듈(module)불러오기 = import(표준) (node에서 require와 동일)

createApp(App) // Root vue 생성 (페이지 전체 반환)
.use(router) // vue 객체 형성하는데(사용하는) 보조적 역할(기능)을 하는 것 
.mount('#app') // 가장 중요!! = vue 객체를 형성(데이터 = 화면에 안보임) 와 DOM을 연결하는 코드 
