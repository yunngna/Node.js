<template>
  <nav>
    <a href="http://www.naver.com">네이버</a> | <!-- 절대 경로 (http를 사용하는 경우 )-->
    <router-link to="/">Home</router-link> |  <!--상대경로 (http를 사용하지 않는 경우 vue가 가지고 있는 router을 거쳐서 경로가 이동된다.)-->
    <router-link to="/about">About</router-link> | 
    <!--방법 2) 라우터로 불러오기-->
    <router-link to="/dataBinding">DataBinding</router-link> |
    <router-link v-bind:to="{name :'listBind'}">ListBinding</router-link> |
    <router-link :to="{path : '/ifBinding' }">IfBinding</router-link>| <!--여러번 v-bind 사용 시, (v-bind 생략가능):to-->
    <router-link to="/onEvent">OnEvent</router-link>
  </nav>
  <h1>모든 페이지에 출력</h1>
  <router-view/>
  <hr>
  <hr>
  <DataBinding/><!--dataBnding.vue를 나타나게 해주는 부분 (카멜표시법 : 노드를 지금 기반으로 사용하기 때문에 인식한다.)-->
  <!-- <data-binding/> 원래 정식 표기법 으로 | 케밥표기법 : html에서 사용 -->

</template>



<script>
// DataBinding.vue 불러오기
// 방법 1 ) 자식 컴포넌트로 등록 => 특정 페이지의 조각을 구성 

import DataBinding from './views/DataBinding.vue';


export default{
  components : {
    //DataBinding : DataBinding 와 아래 동일
    DataBinding
    //케밥 표기법 의 경우
    //"data-binding : DataBinding"
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
