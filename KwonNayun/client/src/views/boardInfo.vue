<!--views/ boardInfo.vue-->
<template>
    <div class="container">
        <table class="tabel">
            <tr>
                <th>번호</th>
                <td>{{ boardInfo.no }}</td>
            </tr>
            <tr>
                <th>작성일</th>
                <td>{{ dateFormat(boardInfo.created_date,'yyyy-MM-dd') }}</td>
            </tr>
            <tr>
                <th>이름</th>
                <td>{{ boardInfo.writer }}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td>{{ boardInfo.title }}</td>
            </tr>
            <tr>
                <td>{{ boardInfo.content }}</td>
            </tr>
        </table>
        <div class ="text-center">
            <button class ="btn" @click="goToUpdateForm(boardInfo.no)">수정</button>
        </div>
    </div>
    <CommentList/>
</template>
<script>
import axios from 'axios';
import CommentList from './CommentList.vue';

export default{
    data(){
        return{
            boardInfo : {}
        }
    },//data

    created(){
        let selected = this.$route.query.no;

        this.getBoardInfo(selected);
    },

    methods:{
        async getBoardInfo(no){
            let result = await axios.get(`/api/boards/${no}`)
                                    .catch(err => console.log(err));
            this.boardInfo = result.data
        },
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

        //수정 처리 
        async goToUpdateForm (no){
            this.$router.push({ name : 'boardUpdate',
                                params : {no : no}
            })
        }
    },
    components :{
        CommentList
    }
}
</script>
<style scoped>
.input-field {
  width: 100%; /* 입력 칸의 너비를 100%로 설정하여 화면에 맞게 늘림 */
  height: 35px; /* 입력 칸의 높이를 설정 */
  padding: 5px; /* 내부 여백을 추가 */
  border: 1px solid #ccc; /* 테두리 스타일 */
  border-radius: 4px; /* 둥근 테두리 */
  font-size: 16px; /* 폰트 크기 */
}
</style>
