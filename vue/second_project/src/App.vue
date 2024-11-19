<template>
  <!--조부모 컴퍼넌트-->
  <div>
    <!-- 동적 컴퍼넌트 다루기 : input태그에 자식 컴퍼넌트 입력 받아 해당 컴퍼넌트로 이동 -->
    <input type ="text" v-model.lazy ="selected">
    <component v-bind:is = "selected"></component>
  </div>
</template>
<script>
//App.vue
import PropsCom from "@/components/PropsComponent.vue";
import StoreCom from "./components/StoreComponent.vue";
import TextModal from "./views/TextModal.vue";

export default{
  name : 'app',
  data(){
    return{
      selected : 'PropsCom'
    }
  },
  components :{ //자식 컴포넌트 등록 
    PropsCom, 
    StoreCom,
    TextModal
  },
  created (){
    console.log('App.vue Created');
  },
  mounted(){
    console.log('App.vue Mounted');
  },

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
