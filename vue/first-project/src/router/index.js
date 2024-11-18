import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' // ..  = 상대경로
// 2) 컴포넌트 호출 : 페이지 단위로 호출 (페이지 자체가 호출되서 완전 덮는 형태 )
import DataBinding from '@/views/DataBinding.vue' // @ = 절대경로 (src에 포함된 파일의 경우) ==> 컴포넌트 불러오기 
import ListBinding from '@/views/ListBinding.vue'
import IfBinding from '@/views/IfBinding.vue'
import OnEvent from '@/views/OnEvent.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
  },
  {
    path : '/dataBinding', //경로로 불러오기
    name : 'dataBind', // 경로가 긴 경우 이름으로 불러오기 
    component : DataBinding
  },
  {
    path : '/listBinding', //경로로 불러오기
    name : 'listBind', // 경로가 긴 경우 이름으로 불러오기 
    component : ListBinding
  },
  {
    path : '/ifBinding', //경로로 불러오기
    name : 'ifBind', // 경로가 긴 경우 이름으로 불러오기 
    component : IfBinding
  },
  {
    path : '/onEvent', //경로로 불러오기
    name : 'onEvent', // 경로가 긴 경우 이름으로 불러오기 
    component : OnEvent
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue') // 동적으로 불러오는것 [처음에는 호출 하지 않고(처음부터 부르면 속도가 너무 느림), aboutView를 누르면 (요청하면) 해당 component를 호출 한다.]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 뒤로가기, 앞으로 가기 같은 js 내장객체를 사용  [=경로에 따라 페이지 이동하는 가짜 서버]
  routes
})

//module.exports = router [node에서 사용 ]와 밑이 동일 -> 외부에서 받아 올때 requier 을 사용 
export default router // vue 에서 사용  -> 외부에서 받아 올때 import 를 사용 [import router from './router']
