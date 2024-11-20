<!--views/CustomerInfo.vue-->
<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class ="col-6">
                        아이디 
                    </div>
                    <div class ="col-6">
                        {{ customer.id }}
                    </div>
                </div>
                <div class="row">
                    <div class ="col-6">
                        이름 
                    </div>
                    <div class ="col-6">
                        {{ customer.name }}
                    </div>
                </div>
                <div class="row">   
                    <div class ="col-6">
                        이메일 
                    </div>
                    <div class ="col-6">
                        {{ customer.email }}
                    </div>
                </div>
                <div class="row">
                    <div class ="col-6">
                        연락처  
                    </div>
                    <div class ="col-6">
                        {{ customer.phone }}
                    </div>
                </div>
                <div class="row">
                    <div class ="col-6">
                        주소 
                    </div>
                    <div class ="col-6">
                        {{ customer.address }}
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <button type="button" class ="btn btn-info"
                    @click="goToUpdateForm">수정</button>
            </div>
            <div class="col-4">
                <button type="button" class ="btn btn-light"
                    @click="goToCustomerList">목록</button>
            </div>
            <div class="col-4">
                <button type="button" class ="btn btn-danger"
                    @click="delInfo">삭제</button>
            </div>
        </div>
        
    </div>

</template>
<script>
import axios from 'axios';

export default {
    data(){
        return {
            customer : {}
        }
    },

    //단건 조회 
    //값을 customerList.vue로 보내주는 데이터는  객체 생성후 에 해당 데이터를 넣어준다. 
    created(){
        let selected = this.$route.query.customerId;
        //console.log(selected);
        this.getCustomerInfo(selected);
    }, //created

    methods :{
        //단건 조회 
        async getCustomerInfo(id) {
                //result = 서버 응답  + 네트워크 정보 포함 ( 데이터 가져오기) 
                // axios ==> 여기서는 node> mysql-server > app.js 에서 /api/customers/${id} 을 찾아 데이터 받아온다. 
                let result = await axios.get(`/api/customers/${id}`)
                                        .catch(err => console.log(err));
                this.customer = result.data;
            },

        //삭제  
        //조회를 하고 난 후 이미 조회된 페이지에서 삭제 하기 때문에 값을 넘겨 받을 필요는 없다. 
        async delInfo(){
            let result = await axios.delete(`/api/customers/${this.customer.id}`)
                                    .catch(err => console.log(err));
            //console.log(result.data);
            let sqlRes = result.data;
            if(sqlRes.affectedRows >= 1 
                && sqlRes.changedRows == 0 ) {
                // 삭제 성공시 
                alert ('정상적으로 삭제 되었습니다.');
                this.$router.push({name : 'customerList'}); 
                //$router = 컴포넌트 선택 (vue> index.js(라우터) 폴더에서 name 을 찾아서 이동 ) 
                // = ReDirect (리다이렉트) 효과
            }else{
                alert ('삭제 되지 않았습니다.')
            }
        },
        //목록
        goToCustomerList(){
            this.$router.push({name : 'customerList'}); 
            // = ReDirect (리다이렉트) 효과
        },

        //수정
        goToUpdateForm(){
            this.$router.push({name : 'customerUpdate',
                            params : {customerId : this.customer.id} // index.js 인 라우터에 등록한 이름으로 key 값 줘야 한다. 
                            })
        }

    },//method

        
}
</script>