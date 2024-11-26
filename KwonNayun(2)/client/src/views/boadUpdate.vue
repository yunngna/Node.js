<!--boardUpdate.vue-->
<!--views/boardAdd.vue-->
<template>
    <div class="container">
        <table class="table">
            <tr>
                <th>NO.</th>
                <td>{{ boardInfo.no }}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td><input type="text" v-model="boardInfo.title " class="form-control"></td>
            </tr>
            <tr>
                <th>작성자</th>
                <td><input type="text" v-model="boardInfo.writer " class="form-control"></td>
            </tr>
            <tr>
                <th>내용</th>
                <td><input type="text" v-model="boardInfo.content" class="form-control"></td>
            </tr>
            <tr>
                <th>작성일</th>
                <td>{{ boardInfo.created_date}}</td>
            </tr>
        </table>
        <div class ="text-center">
            <button class ="btn" @click="UpdateBoardInfo">저장</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default{
    data(){
        return {
            boardInfo : { }
        }
    },
    created () {
        let selected = this.$route.params.no;

        this.getUpdateInfo(selected);
    },

    methods :{
        async getUpdateInfo(no){
            let result = await axios.get(`/api/boards/${no}`)
                                    .catch(err => console.log(err));
            this.boardInfo = result.data;

            this.boardInfo.created_date
                = this.dateFormat(this.boardInfo.created_date,'yyyy-MM-dd');
        },
        async UpdateBoardInfo(){
            let obj ={
                no : this.boardInfo.no,
                title : this.boardInfo.title,
                writer : this.boardInfo.writer,
                content : this.boardInfo.content, 
                created_date : this.boardInfo.created_date
            }

            let result = await axios.put(`/api/boards/${this.boardInfo.no}`,obj)
                                    .catch(err => console.log(err));
                let updateRes = result.data;
                if(updateRes.result){
                    alert('정상적으로 수정 되었습니다.')
                }else{
                    alert('수정사항이 없거나 수정되지 않았습니다. ')
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

    },//method
}
</script>