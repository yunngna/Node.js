<!--views / UserInfo.vue-->
<template>
    <div class="container">
        <table class="table">
            <tr>
                <th class="text-right">NO</th>
                <td class="text-center">{{ userInfo.user_no }}</td>
            </tr>
            <tr>
                <th class="text-right">아이디</th>
                <td class="text-center">{{ userInfo.user_id }}</td>
            </tr>
            <tr>
                <th class="text-right">비밀번호</th>
                <td class="text-center">{{ userInfo.user_pwd }}</td>
            </tr>
            <tr>
                <th class="text-right">이름</th>
                <td class="text-center">{{ userInfo.user_name }}</td>
            </tr>
            <tr>
                <th class="text-right">성별</th>
                <td class="text-center">{{ userInfo.user_gender == null ? null : userGender }}</td>
            </tr>
            <tr>
                <th class="text-right">나이</th>
                <td class="text-center">{{ userInfo.user_age }}</td>
            </tr>
            <tr>
                <th class="text-right">가입일자</th>
                <td class="text-center">{{ dateFormat(userInfo.join_date,'yyyy년-MM월-dd일')}}</td>
            </tr>
        </table>
        <div class ="text-center">
            <button class ="btn" @click="goToUpdateForm(userInfo.user_no)">수정</button>
            <router-link to="/userList" class="btn btn-light">목록</router-link>
            <!--목록의 경우에 그냥 router-link 사용 해서 컴포넌트 이동 해준다.-->
            <button class="btn btn-warning" @click="delUserInfo(userInfo.user_no)">삭제</button>
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

    computed : {
        userGender(){
            // 성별을 M = 남 F = 여로 변경 (단건조회(readonly)에서 만 가능  )
            return this.userInfo.user_gener == 'M' ? '남' : '여'
        }
    },//computed 

    created(){
        //# 단건 처리 
        // 객체 생성 완료 시점 (화면에 그려지기 바로 전)에 초기화 데이터 호출 
        // 코드를 직접적으로 작성하기 보다는 함수로 진행 
    
        //1) 사용자가 선택한 대상을 확인(UserList에서 user_no 가져오기 )
        /** this.$router.push({name:'userInfo' , query : {no : userNo}}) from userList.vue
         *  route는 각 component 마다 주어지며, userList의 route를 가져오기*/
        let selected = this.$route.query.no;
        

        //2) 실제 데이터 서버에서 가져옴
        this.getUserInfo(selected);
    },//created 

    methods : {
        //# 단건 처리 
        async getUserInfo(userNo){
            let result = await axios.get(`/api/users/${userNo}`)
                                    .catch(err => console.log(err));
            this.userInfo = result.data;
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

        //#삭제 처리
        async delUserInfo(userNo){
            let result = await axios.delete(`/api/users/${userNo}`)
                                    .catch(err => console.log(err));
            console.log(result.data); 
            // 삭제에 성공을 하게 되면 result : 'success' , user_no : 'no값' 이 출력 된다.
            let delRes = result.data;
            if(delRes.result == 'success'){
                alert('삭제되었습니다.');
                this.$router.push({name : 'userList'})
            }else{
                alert('삭제 되지 않았습니다.');
            }
        },
        //#수정 처리 
        async goToUpdateForm (userNo){
            this.$router.push({ name : 'userUpdate',
                                params:{userNo : userNo}
        });
        }

    }, //methods
}
</script>