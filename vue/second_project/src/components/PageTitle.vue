<!--components/PageTitle.vue-->
<template>
    <!--손자 컴포넌트-->
    <h2>{{ title }}</h2>
</template>
<script>
export default {
    // data(){
    //     return{
    //         'title' : 'Hello, World!'
    //     }
    // },

    props : ['title'], // 부모가 넘겨준 값들 
    // props는 배열 [] (여러개의 경우) 와 객체 {} 를 사용 가능 하다. 
    
    created (){
        console.log('PageTitle.vue Created');
    },
    mounted(){
        console.log('PageTitle.vue Mounted');
    },
}
</script>