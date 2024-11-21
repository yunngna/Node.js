<!-- views/UserAdd.vue -->
<template>
    <div class="container">
        <table class="table">
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
            <button class ="btn btn info" @click="addUserInfo">등록</button>
        </div>

    </div>

</template>
<script>
import axios from 'axios';

export default{
    data(){
        return {
            userInfo : {
                user_id : "",
                user_pwd :"",
                user_name : null,
                user_gender : null,
                user_age : 0,
                join_date : null
            }
        }
    },// data 

    methods : {
        async addUserInfo (){
            // 전제조건 : 모든 데이터가 입력 된 경우
            let result = await axios.post(`/api/users`,this.userInfo)
                                    .catch(err => console.log(err));
            console.log(result.data); // 넘어오는 정보(user_no: 11) 를 확인 후 성공 조건 걸어줌 
            if(result.data.user_no > 0){
                alert ('등록되었습니다.');
                this.$router.push({name : 'userInfo' ,
                                    query : {no : result.data.user_no}
                });
            }else{
                alert('등록되지 않았습니다.')
            }
        }

    },//method
}

</script>