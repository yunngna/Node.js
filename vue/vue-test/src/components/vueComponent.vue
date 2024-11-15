<!--vueComponent.vue-->
<!--컴포넌트 = View(HTML) +  Data +  Code(JavaScript) -->
<template>
    <!--html 부분으로 화면에 보여지는 부분-->
    <!--주의 ! 하나의 태그만 등록 (하나의 태그가 가지는 하위 요소의 갯수는 상관이 없으나 하나의 태그만 있어야 한다.)
    e.g <div></div> 로 최상위 태그가 하나만 있어야 한다. (html 에서도 body라는 태그 안에 모든 것을 작성 한거 와 동일한 개념)-->
    
    <div>
        <label><input type="text" v-model ="msg"></label>
        <p>{{ msg }}</p>
    </div>


</template>

<script>
//데이터바인딩 작업 = 각 부분에 요소가 있어서 연결 되어 있는것 e.g msg 
    export default{ // = module.export 와 동일 한 작업 으로 "내보내기"
        name : "VueComponent",
        data(){ //data : function(){ } 와 동일 (메소드 등록 으로 익명함수(function 이름 에서 이름이 없음)이기 때문에 생략해서 적는다.)
            return{
                msg : '2024-11-15'
            }
        }
    }
</script>

<style>
    p {
        background-color: antiquewhite;
    }

</style>