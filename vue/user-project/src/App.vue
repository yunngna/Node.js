<template>
  <nav>
    <headerComponent/>
  </nav>
  <router-view/>
</template>
<script>
import HeaderComponent from './layouts/HeaderComponent.vue';

export default{
  components : {
    HeaderComponent
  }
}
</script>