import { createRouter, createWebHistory } from 'vue-router'
import CustomerList from '@/views/CustomerList.vue'
import CustomerInfo from '@/views/CustomerInfo.vue'
import CustomerAdd from '@/views/CustomerAdd.vue'
import CustomerUpdate from '@/views/CustomerUpdate.vue'

const routes = [
  { // root 로 들어왔을 때 실행하고 자 하는 컴포넌트 설정 
    path : '/',
    redirect : {name : 'customerList'}
  },

  {
    path : '/customerList',
    name : 'customerList',
    component :CustomerList

  },
  { //query 방식 사용 
    path : '/customerInfo', 
    name : 'customerInfo',
    component : CustomerInfo
  },
  {
    path : '/customerAdd',
    name : 'customerAdd',
    component :CustomerAdd
  },
  { // params 방식 사용 (경로에 데이터 저장)
    path : '/customerUpdate/:customerId',
    // params ==> /customerInfo/:customerId ==> pathvaraible 형태로 데이터 넘김 [http://localhost:8081/customerInfo/3 해당 모양으로 넘어감 ]
    name : 'customerUpdate',
    component :CustomerUpdate
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
