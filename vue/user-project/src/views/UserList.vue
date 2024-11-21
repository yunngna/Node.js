<!--views/UesrList.vue-->
<template>
    <div class="container">
        <table class="table">
            <caption>Total : {{ count }}</caption>
            <thead>
                <tr>
                    <th>NO</th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>성별</th>
                    <th>가입날짜</th> <!-- yyyy-MM-dd -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="(userInfo) in userList"
                    :key = "userInfo.user_no"
                    v-on:click="goToDetailInfo(userInfo.user_no)">
                    <td>{{ userInfo.user_no}}</td>
                    <td>{{ userInfo.user_id}}</td>
                    <td>{{ userInfo.user_name}}</td>
                    <td>{{ userInfo.user_gender }}</td>
                    <td>{{ dateFormat(userInfo.join_date,'yyyy년-MM월-dd일') }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            //html 부분에 출력할 데이터 
            userList : [] 
        }
    }, //data
    computed : {
        count(){
            //데이터 갯수 생성 
            return this.userList.length;
        },

    },//computed

    created (){ 
        // 객체 생성 완료 시점 (화면에 그려지기 바로 전)에 초기화 데이터 호출 
        // 코드를 직접적으로 작성하기 보다는 함수로 진행 
        this.getUserList();
    },//creaetd 

    methods : {
        async getUserList(){
            let result = await axios.get('/api/users')
                                    .catch(err => console.log(err));
            this.userList = result.data;
        },

        //날짜 yyyy-DD-mm 으로 메소드(함수)로 변경 
        dateFormat(value,format){
            let date = value == null ? new Date() : new Date(value);

            let year = date.getFullYear();
            let month = ('0' + (date.getMonth()+1)).slice(-2);
            //month = ('0' + (date.getMonth()+1)) ==> 011 로 앞 자리 잘라주는 것  
            let day = ('0' + date.getDate()).slice(-2);

            let result = format .replace('yyyy',year)
                                .replace('MM',month)
                                .replace('dd',day);
            return result;
        },

        // userinfo 로 컴포넌트 전환 및 userInfo.user_no 데이터 보내주기 
        goToDetailInfo(userNo){
            // vue 내의 router(index.js) 를 name 을 사용해 위치 찾고 query로 데이터 같이 보내주기
            // query : { key : value } 주는 쪽과 받는 쪽 이름이 동일 해야 한다. 
            this.$router.push({name:'userInfo' , query : {no : userNo}})
        }
    },//method


}
</script>