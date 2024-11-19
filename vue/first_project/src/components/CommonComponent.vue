<!--components/CommonComponent.vue-->
<!--views에서 만든 것들을 한꺼번에 모아서 정리-->
<template>
<!--component 가 가지는 html-->
</template>

<script>
//자바스크립트 영역 으로 component를 관리하는 vue 객체 정의 
export default {
    data(){ // 데이터 (CRUD = Create,Read,Update,Delete)
        //함수 형태로 값을 간단히 정의 하는 게 아니라 코드를 이용해서 값을 정의 할수 있다.
        let today = new Date();
        return{
            year : today.getFullYear(),
            month : today.getMonth() + 1,
            day : today.getDate()
        }
    },
    computed : { //기존데이터를 기반으로 연산한 결과값 (readonly), return 기반으로 함수 종료 
        AfterYear(){
            return this.year + 1;
        }
    },
    methods : { // vue가 사용하는 모든 종류의 함수 (template에서는 함수 호출이 불가능 하다. 그래서 여기에 함수를 등록을 해야 한다)

    },
    watch : {  // computed 와 다르게 감시되는 데이터를 등록해 줘야 하고 return 을 기반으로 해서 함수가 종료되면 안된다
        // 데이터 변경에 따른 추가 작업 정의
        month (){
            if(this.month < 10){
                this.month = '0' + this.month; 
            }
        }
    }
}
</script>