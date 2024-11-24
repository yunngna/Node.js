<!--views/boardList.vue-->
<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th>NO.</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일자</th>
                    <th>댓글수</th>
                </tr>
            </thead>
                <tr v-for="(boardInfo) in boardList"
                    :key = "boardInfo.no"
                    v-on:click="goToBoardInfo(boardInfo.no)">
                    <td>{{ boardInfo.no }}</td>
                    <td>{{ boardInfo.title }}</td>
                    <td>{{ boardInfo.writer }}</td>
                    <td>{{ dateFormat(boardInfo.created_date,'yyyy-MM-dd')}}</td>
                    <td>{{ boardInfo.comments }}</td>
                </tr>
        </table>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            boardList : []
        }
    },//data
    created (){
        this.getBoardList();
    },

    methods : {
        async getBoardList(){
            let result = await axios.get('/api/boards')
                            .catch (err => console.log(err));
            this.boardList = result.data;
            // 글 하나하나 for 문 사용해 댓글 수 찾기 
            for(let i = 0; i < this.boardList.length; i++ ){
                this.boardList[i].comments = await this.countComment (this.boardList[i].no);
                console.log(this.boardList.comments);
            }
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

        async countComment(no){
            let result = await axios.get(`/api/comments/${no}`)
            return result.data.length;
        },

        // 단건 조회로 이동 
        goToBoardInfo(boardNo){
            this.$router.push({name:'boardInfo', query : {no : boardNo}})
        }

    },//methods

}
</script>