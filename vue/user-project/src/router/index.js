import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/views/UserList.vue'
import UserInfo from '@/views/UserInfo.vue'
import UserAdd from '@/views/UserAdd.vue'
import UserUpdate from '@/views/UserUpdate.vue'

const routes = [
  { // root 설정 
    path: '/',
    name: 'home',
    redirect : {name : 'userList'}
  },
  { //전체조회(userList)
    path: '/userList',
    name: 'userList',
    component: UserList
  },
  { //단건조회(userInfo)
    path: '/userInfo', // 방법은 1) query(자율 = 검색 방식에서 사용 ) 2) params (강제성 = 아이디)  ==> /userInfo/:no
    name: 'userInfo',
    component: UserInfo
  },
  { //등록(userAdd)
    path: '/userAdd',
    name: 'userAdd',
    component: UserAdd
  },
  { //수정(userUpdate) [params사용 ]
    path: '/userUpdate/:userNo',
    name: 'userUpdate',
    component: UserUpdate
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
