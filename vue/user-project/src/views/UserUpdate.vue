<!-- views/UserUpdate.vue.vue -->
<template>
    <div class="container">
        <table class="table">
            <tr> <!--no 의 경우 수정 값이 아니라 그냥 display -->
                <th class="text-right">NO</th>
                <td class="text-center">{{ userInfo.user_no }}</td>
            </tr>
            <tr>
                <th class="text-right">아이디</th>
                <td class="text-center"><input type="text" v-model="userInfo.user_id"></td>
            </tr>
            <tr>
                <th class="text-right">비밀번호</th>
                <td class="text-center"><input type="password" v-model="userInfo.user_pwd"></td>
            </tr>
            <tr>
                <th class="text-right">이름</th>
                <td class="text-center"><input type="text" v-model="userInfo.user_name"></td>
            </tr>
            <tr>
                <th class="text-right">성별</th>
                <td class="text-center">
                    <input type="radio" value="M" v-model="userInfo.user_gender">남자
                    <input type="radio" value="F" v-model="userInfo.user_gender">여자
                </td>
            </tr>
            <tr>
                <th class="text-right">나이</th>
                <td class="text-center"><input type="text" v-model="userInfo.user_age"></td>
            </tr>
            <tr>
                <th class="text-right">가입일자</th>
                <td class="text-center"><input type="date" v-model="userInfo.join_date"></td>
            </tr>
        </table>
        <div class ="text-center">
            <button class ="btn btn info" @click="UpdateUserInfo">저장</button>
        </div>

    </div>

</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            userInfo : {}
        }
    }, //data

    created(){
        //userInfo와 동일  (수정할 데이터 불러오기)
        //1) 사용자가 선택한 대상을 확인(UserList에서 user_no 가져오기 )
        /**  this.$router.push({ name : 'userUpdate'},params:{userNo : userNo}) from userUpdate.vue
         *  route는 각 component 마다 주어지며, userList의 route를 가져오기*/
        let selected = this.$route.params.userNo;
        

        //2) 실제 데이터 서버에서 가져옴
        this.getUserInfo(selected); 

    },// created

    methods :{
        async getUserInfo(userNo){
            //수정할 데이터 값 출력 
            let result = await axios.get(`/api/users/${userNo}`)
                                    .catch(err => console.log(err));
            this.userInfo = result.data;

            //join_date => yyyy-DD-mm타입으로 변경 
            this.userInfo.join_date
                = this.dateFormat(this.userInfo.join_date,'yyyy-MM-dd');
        },
        //수정사항 저장 
        async UpdateUserInfo(){
            // 전제조건 : 모든데이터가 존재 
            //1) 보낼 데이터 정리 (user_no 은 경로, 나머지 수정 값은 req.body)
            let obj = {
                user_id : this.userInfo.user_id,
                user_pwd : this.userInfo.user_pwd,
                user_name : this.userInfo.user_name,
                user_gender : this.userInfo.user_gender,
                user_age : this.userInfo.user_age,
                join_date : this.userInfo.join_date
            }
            //2) 서버에 통신 
            let result = await axios.put(`/api/users/${this.userInfo.user_no}`,obj)
                                    .catch(err=>console.log(err));
                console.log(result.data);
                // result.data 의 값은 result: true ==> boolean타입,  target: {user_no: '11'}
                let updateRes = result.data;
                if(updateRes.result){
                    alert('정상적으로 수정 되었습니다.')
                }else{
                    alert('수정사항이 없거나 수정되지 않았습니다. ')
                }
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
        
    }, //method
}//export
</script>