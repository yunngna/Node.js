<!--views/CustomerAdd.vue-->
<!--등록이기 때문에 아이디 필요 없음 (아이디 자동 생성)-->
<template>
    <div class ="container">
        <div class="row">
            <label>이름</label>
            <input type="text" v-model.trim="info.name"> <!--trim 앞뒤로 붙는 불필요한 공백 제거-->
            <!-- css : display:none 사용해서 표시 -->
            <div class="form-test" :class="{'warning' : nameOK}">
                이름이 입력되지 않았습니다. 
            </div>
            <div class="form-test" :class="{'warning' : !nameOK}">
                사용 가능한 이름입니다. 
            </div>
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
            <button type="button" class="btn btn-success"
            v-on:click="addCustomer"
            :disabled="!(nameOK&&phoneOK)">등록</button>
            <!-- nameOK , phoneOK 둘다 true  가 아닌 경우 버튼 비활성화-->
        </div> 
    </div>
</template>
<script>
import axios from 'axios';

export default{
    data(){
        return{
            info : {
                //입력된 데이터는 여기에 저장
                name : null,
                email : null,
                phone : null,
                address : null
            }
        }
    },//data

    computed : {
        nameOK(){
            return this.info.name != null && this.info.name != '';
            // boolean 값이라 맞으면 true 값 리턴 
        },
        phoneOK(){
            return this.info.phone != null && this.info.phone != '';
        }
    },//computed

    methods: {
        // axios 로 보내는 방법 (1)
        async addCustomer(){
            //axios는 application/json 파일로 전송 되기 때문에 body에 안하고 바로 보내도 된다
            /**axios 사용하면  headers : {
                'content-type' : 'application/json' 
                                    },
                                    body : JSON.stringify(this.info)
                                    }) 이 작업이 생략 된다. */
            let result = await axios.post('/api/customers',this.info) // 단 
                                    .catch(err => console.log(err));

            let sqlRes = result.data;
            let customerId = sqlRes.insertId; // Mysql의 Auto_increment사용시 insertId 라는 값이 있다.

            if(customerId > 0){
                alert('정상적으로 등록 되었습니다.')
                this.$router.push({name : 'customerInfo',
                                query: {customerId : customerId }
                })
            }else{
                alert('정상적으로 등록 되지 않았습니다.')
            }
        },
        // fetch 로 보내는 방법 (2) 
        // 무조건 데이터 타입을 설정 해야 한다. 

        // async fetchVer(){
        //     let result = await fetch('',{
        //                             method : 'post',
        //                             headers : {
        //                                 'content-type' : 'application/json' 
        //                             },
        //                               body : JSON.stringify(this.info)
        //                             })
        //                             .then (res => res.json())
        //                             .catch(err => console.log(err));
        // }, 


    },//method
}//export
</script>
<style>
.warning{
    display: none;
}
</style>