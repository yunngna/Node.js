<!--views/ boardInfo.vue-->
<template>
    <div class="container">
        <table class="table">
            <tr>
                <th class=" text-left">번호</th>
                <td class="text-center">{{ boardInfo.no }}</td>
            </tr>
            <tr>
                <th class="table-left">작성일</th>
                <td class="text-center">{{ dateFormat(boardInfo.created_date,'yyyy-MM-dd') }}</td>
            </tr>
            <tr>
                <th class="table-left">이름</th>
                <td class="text-center">{{ boardInfo.writer }}</td>
            </tr>
            <tr>
                <th class=" text-left">제목</th>
                <td class="text-center">{{ boardInfo.title }}</td>
            </tr>
            <tr>
                <th class=" text-left">내용</th>
                <td class="text-center">{{ boardInfo.content }}</td>
            </tr>
        </table>
        <div class="text-center mt-3">
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
    },//method
    components :{
        CommentList
    }
}
</script>
