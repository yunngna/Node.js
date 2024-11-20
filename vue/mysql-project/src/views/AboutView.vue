<!-- customer 테이블의 전체조회 (연습)-->
<template>
  <div class="about">
    <template :key="info.id" 
              v-for="(info ,idx) in list">
      <p v-if ="idx % 2 == 0">{{ info }}</p>
    </template>
  </div>
</template>
<script>
import axios from 'axios'; // axios 는 모듈이라  불러오기 해줘야 한다. 

export default {
    data(){
      return{
        list : []
      } 
    },
    // vue에서 cors를 무력화시켜야 한다 why? 포트가 다르기 때문 
    // 개발을 하는동안 cors가 적용되지 않도록 우회하는 방법  = vpn 
    created(){ // vue 객체가 완성된 상태 = create 
      //그래서 mount 전에 화면에 뿌져질 데이터 가 필요해서 axios를 활용해서 데이터를 가져온다.
      axios.get('/api/customers') // get,post,put,delete 등 method 방식 적기 
      // 'http://localhost:3000/customers' -- > '/api/customers' 으로 바꿔주면서 proxyserver로 위임 하는 것이다. 
          .then(result => {
            //console.log(result);
            this.list = result.data; // 데이터 넘기기 
          })
          .catch(err => console.log(err));
  }
} 

</script>
