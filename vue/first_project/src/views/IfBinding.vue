<!-- views/IfBinding.vue-->
<!-- if directive & show directive (토글용)-->

<template>
    <div>
        <!--if directive-->
        <input type="number" v-model="grade">
        <p v-if = "grade >= 90">성적 : A</p>
        <p v-else-if = "grade >= 80">성적 : B</p>
        <p v-else-if = "grade >= 70">성적 : c</p>
        <p v-else>성적 : D</p> 
        <!-- 기존의 p태그를 삭제하고 새로운 p 태그를 만드는 것(생성) -->
        
        <hr>
        <!--show directive -->
        <input type="checkbox" v-model="chData">선택
        <p v-show="chData">Hello, World!!</p>
        <!--p 태그를 가지고 있는 style 속성을 건드는 것 (display=none [덮었다가 보였다가 하는 것])-->
    </div>
</template>

<script>
export default{
    data(){
        return{
            grade : 50,
            chData : false
        }
    }
}

</script>