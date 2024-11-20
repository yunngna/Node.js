<!--app.vue  :사이트의 전체 레이아웃 (대문) -->
<template>
  <div>
    <!-- # header component-->

    <!--root 에 연결된 기본 라우터를 적어준다.-->
    <router-link to="/customerList">전체조회 | </router-link>
    <router-link to="/customerAdd">등록</router-link>

    <!-- # content component-->

    <!-- 직접 component 연결 (1) -->
    <!-- <CustomerInfo/> -->
    <!-- <CustomerList/> -->
  
    <!-- router  통해서 component 연결 (2)-->
    <router-view/>

    <!-- # footer component-->

  </div>

</template>

<script>
//직접 component 연결 (1) 

// import CustomerList from './views/CustomerList.vue';
// import CustomerInfo from './views/CustomerInfo.vue';

// export default{
//   components : {
//     CustomerList,
//     CustomerInfo
//   }
// }

</script>
