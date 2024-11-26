<!--views/CommentList.vue-->
<template>
    <template v-if="commentList.length == 0" >
        <h5 class="text-center"> 댓글이 없습니다. </h5>
    </template>
    <table class="table">
        <tbody class="text-center">
            <tr v-for="commentInfo in commentList"
            :key="commentInfo.no">
                <td>{{ commentInfo.writer }}  </td>
                <td>{{ commentInfo.content }} </td>
                <td>{{dateFormet(commentInfo.created_date,'yyyy-MM-dd')}}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import axios from 'axios';

export default {
    data(){
        return{
            commentList : []
        }
    },
    created (){
        let selected = this.$route.query.no;
        this.getCommentList(selected);
    },
    methods:{
        async getCommentList(no){
            let result = await axios.get(`/api/comments/${no}`)
                                    .catch(err => console.log(err))
            this.commentList = result.data
        },
        dateFormet(value, format) {
            let date = value == null ? new Date() : new Date(value)
            let year = date.getFullYear();
            let month = ("0" + (date.getMonth() + 1)).slice(-2)
            let day = ("0" + date.getDate()).slice(-2)
            let result = format.replace("yyyy", year).replace("MM", month).replace("dd", day)
            return result
        }
    },

}
</script>