import { createRouter, createWebHistory } from 'vue-router'
import MainComponent from '@/views/MainComponent.vue'
import BoardList from '@/views/boardList.vue'
import BoardInfo from '@/views/boardInfo.vue'
import BoardAdd from '@/views/boardAdd.vue'
import BoadUpdate from '@/views/boadUpdate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainComponent
  },
  { // 전체조회 
    path: '/boardList',
    name: 'boardList',
    component: BoardList
  },
  { // 개별조회 
    path: '/boardInfo',
    name: 'boardInfo',
    component: BoardInfo
  },
  { // 등록 
    path: '/boardAdd',
    name: 'boardAdd',
    component: BoardAdd
  },
  { // 수정 
    path: '/boardUpdate/:no',
    name: 'boardUpdate',
    component: BoadUpdate
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
