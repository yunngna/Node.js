<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <vueComponent/>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import vueComponent from './components/vueComponent.vue'   // 모듈 불러오기 

export default {
  name: 'App',
  components: {
    //HelloWorld,
    vueComponent
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
  margin-top: 60px;
}
</style>
