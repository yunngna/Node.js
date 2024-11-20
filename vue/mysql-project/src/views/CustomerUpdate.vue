<!--views/CustomerUpdate.vue-->
<template>
    <div class ="container">
        <div class="row">
            <label>아이디</label>
            <input type="text" v-model="info.id" readonly>
        </div>
        <div class="row">
            <label>이름</label>
            <input type="text" v-model="info.name"> 
        </div>
        <div class="row">
            <label>이메일</label>
            <input type="text" v-model="info.email">
        </div>
        <div class="row">
            <label>연락처</label>
            <input type="tel" v-model="info.phone">
        </div>
        <div class="row">
            <label>주소</label>
            <input type="text" v-model="info.address">
        </div>
        <div class="row">
            <button type="button" class="btn btn-info"
                v-on:click="updateCustomer">저장</button>
        </div> 
    </div>
</template>
<script>
import axios from 'axios';

export default{
    data(){
        return{
            info : {
                id : null,
                name : null,
                email : null,
                phone : null,
                address : null
            }
        }
    },//data

    created(){
        //1) 사용자가 선택한 대상의 원래 데이터 조회 => 단건조회 
        let selected = this.$route.params.customerId;
        this.getCustomerInfo(selected);
        
    },//created

    methods:{
        //2) 사용자가 입력한 부분의 데이터를 버튼을 클릭했을 때 서버에 전송  => 등록 
        async getCustomerInfo(id) {
                //result = 서버 응답  + 네트워크 정보 포함 ( 데이터 가져오기) 
                // axios ==> 여기서는 node> mysql-server > app.js 에서 /api/customers/${id} 을 찾아 데이터 받아온다. 
                let result = await axios.get(`/api/customers/${id}`)
                                        .catch(err => console.log(err));
                this.info = result.data;
            },
        async updateCustomer(){
            //객체 새로 생성 해서 변경된 사항의 데이터를 넣어준다.
            // 이미 있던 객체(info) 에서 하나를 더하는 것은 쉬워도, 하나의 요소(id) 만 빼는 것은 어렵다 그래서 그냥 새로 만들어서 넘겨준다.
            let updateDta = {
                name : this.info.name,
                email : this.info.email,
                phone : this.info.phone,
                address : this.info.address
            }
            // 데이터 2개 (id (경로에 붙어서 전송) , data (req.body) 두 개 )※단, req.body에는 아이디가 들어가면 안된다.
            // vue 에서 객체 타입 (updateDta) -> node>mapper.js 에서 value(객체)형태라 알아서 포맷 알아서 처리 해준다.
            let result = await axios.put(`/api/customers/${this.info.id}`,updateDta) // 기존에 입력된 info에서 id 만 빼는 것은 어렵다 그래서 개체를 새로 만들어서 넣어준다.
                                    .catch(err => console.log(err))
            let sqlRes = result.data;
            if(sqlRes.changedRows > 0){
                // update 되면 changedRows 가 0 이상 
                alert ('수정되었습니다.');
            }else{
                alert('수정되지 않았습니다.')
            }
        },
    },//method
}//export
</script>