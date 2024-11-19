<!--components/PropsComponent.vue-->
<!--부모컴퍼넌트-->
<template>
    <div>
        <!--<PageTitle/>--> <!--자식컴포넌트 html 위치 | <PageTitle>해당부분에는 데이터를 작성해도 전달이 되지 않는다</PageTitle> 그래서 <PageTitle/> 형식으로 적기 -->
        <PageTitle title="Hello, Vue.js!!"/> 
        <!-- (부모->자식) 방법 1) 자식인 pageTitle에게 bind디렉티브로 값을 전달 하는게 아니라 있는 그대로 자식에게 보내주는 것 (정적인 데이터)
        (즉 title이라는 속성의 값("Hello, Vue.js!!")으로 보내준다)-->

        <hr>
        <!--bind 디렉티브 로 부모 -> 자식 에게 값 넘겨주기 (개별값으로 넘기기 )-->

        <!--v-bind title = "header" 은 header 문자가 자식에게 넘어 가지 않는다 
        why? header 가 하나의 객체로 인식 하지 않고 변수로 인식해서 header라는 변수를 찾는다. 
        그렇게 때문에 만약 header 그 자체를 넘기려면 v-bind:title= "'header'" 으로 적어줘야한다
        (" " 사이는 자바스크립트라고 생각 => 그래서 객체인 ' '을 사용해야 한다.)-->

        <!-- <PageContent v-bind:title="header"
                    v-bind:count="10"
                    :writer="['Adward']"
                    :regdate="20231204"
                    :content="{frist:'Node.js',second:'Vue.js'}"/> -->

        <!--bind 디렉티브 로 부모 -> 자식 에게 값 넘겨주기 (객체로 넘기기(덩어리로)) 
        개별로 넘기다 보면 누락될 수 있어서 덩어리(객체)로 보내기-->
        <PageContent v-bind="info" v-on:update-info="handler"/> 
        <!--v-on:자식이 전달해주는 이벤트함수 이름 = "자식으로 받은 이벤트 생성시 활성화될 부모에서 생성한 이벤트함수 "
        만약 v-on:update-info="handler" 적어주지 않으면 그냥 이벤트를 받아 주지 않게된다. (오류가 발생하지는 않는다) -->

        <hr>
        <RefComponent ref="child"/> <!-- ref 의 id 지정-->
        <hr>
        <label>부모데이터 : <input type ="number" v-model="num"></label>
        <button type="button" @click="childHandler">자식 제어</button>

    </div>
</template>
<script>
import PageTitle from './PageTitle.vue'; // 자식 컴포넌트 가져오기 
import PageContent from './PageContent.vue';
import RefComponent from './RefComponent.vue';

export default {
    data(){
        return {
            header : '게시글조회',
            info : {
                // 부모가 자식에게 주는 데이터를 객체 타입으로 보내기 
                //지정 이름은 자식이 저장한 props의 이름 적기(오른쪽)
                title : 'Today is',
                count : 5,
                writer : 'Adward',
                regdate : '2024-12-04',
                content : 'No content'
            },
            num : 0 
        } 
    },
    components : { // 자식 컴포넌트 등록 하는  속성
        PageTitle,
        PageContent,
        RefComponent,
    },
    created (){
        console.log('PropsCom.vue Created');
    },
    mounted(){
        console.log('PropsCom.vue Mounted');
    },
    methods : {
        handler(info){ // 자식 컴포넌트의 emit을 기반으로 넘긴 데이터가 매개변수로 넘어온다. (e.g pageContent.vue 의 this.readInfo 값이 매개변수로 넘어온다)
            console.log(info);
            alert('자식 컴포넌트 요청');
        },
        //ref
        childHandler(){
            //this.$refs.child.plusCount();
            let RefCom = this.$refs.child;
            RefCom.$refs.btn.click();
        },
    }, 
    //ref
    watch : {
        num(){
            console.log(this.$refs);
            // num 이 변경 되면 강제로 자식의 값도 변경 되게 해준다.
            this.$refs.child.content = this.num;
            // child = id 값 
        }
    }, 
}
</script>