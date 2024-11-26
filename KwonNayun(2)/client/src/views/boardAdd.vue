<!--views/boardAdd.vue-->
<template>
    <div class="container">
        <table class="table">
            <tr>
                <th>NO.</th>
            </tr>
            <tr>
                <th>제목</th>
                <td><input type="text" v-model="boardInfo.title " class="form-control"></td>
            </tr>
            <tr>
                <th>작성자</th>
                <td><input type="text" v-model=" boardInfo.writer " class="form-control"></td>
            </tr>
            <tr>
                <th>내용</th>
                <td><input type="text" v-model="boardInfo.content" class="form-control" rows="3" cols="200"></td>
            </tr>
            <tr>
                <th>작성일</th>
                <td>{{ dateFormat('yyyy-MM-dd')}}</td>
            </tr>
        </table>
        <div class ="text-center">
            <button class ="btn" @click="addBoard">저장</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    data(){
        return {
            boardInfo : { 
                title : "",
                content : "",
                writer : "",
                created_date : ""

            }
        }
    },

    methods :{
        async addBoard(){
            this.boardInfo.created_date = this.dateFormat('yyyy-MM-dd');
            let result = await axios.post(`/api/boards`,this.boardInfo)
                                    .catch(err => console.log(err));
            console.log(result.data);
            if(result.data.user_no > 0){
                alert('등록되었습니다.');
                this.$router.push({name : 'boardInfo',
                                    query : {no : result.data.no}
                });
            }else{
                alert('등록되지 않았습니다.')
            }
        },

        dateFormat(format){
            let date = new Date();
            let year = date.getFullYear();
            let month = ('0' + (date.getMonth()+1)).slice(-2);
           // let month = ('0' + (date.getMonth()+1)) ==> 011 로 앞 자리 잘라주는 것  
            let day = ('0' + date.getDate()).slice(-2);

            let result = format .replace('yyyy',year)
                                .replace('MM',month)
                                .replace('dd',day);
            return result;
        },
    },//method
}
</script>