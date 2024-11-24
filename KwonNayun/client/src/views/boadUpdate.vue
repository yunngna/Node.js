<!--boardUpdate.vue-->
<!--views/boardAdd.vue-->
<template>
    <div class="container">
        <table  class="table table-bordered table-striped">
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
                <td><input type="text" v-model="boardInfo.writer"  class="form-control"></td>
            </tr>
            <tr>
                <th>내용</th>
                <td><input type="text" v-model="boardInfo.content"  class="form-control"></td>
            </tr>
            <tr>
                <th>작성일</th>
                <td>{{ dateFormat(boardInfo.created_date,'yyyy-MM-dd')}}</td>
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
            boardInfo : {}
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

            //this.boardInfo.created_date
               // = this.dateFormat(this.boardInfo.created_date,'yyyy-MM-dd');
        },
        async UpdateBoardInfo(){
            let obj ={
                title : this.boardInfo.title,
                writer : this.boardInfo.writer,
                content : this.boardInfo.content
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