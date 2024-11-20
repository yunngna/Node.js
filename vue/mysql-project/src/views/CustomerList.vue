<!--views/CustomerList.vue-->
<!-- customer 테이블의 전체조회 -->
<template>
    <div class ="container">
        <table class="table">
            <caption> Total : {{ count }}</caption> <!--출력 한 데이터의 갯수 -->
            <thead>
                <tr>
                    <th>No</th>
                    <th>아이디</th>
                    <th>이름</th>
                    <th>연락처</th>
                </tr>
            </thead>
            <tbody>
                <!--출력할 데이터  (query collum명 과 일치 해야한다.)-->
                <template v-if="count > 0">
                    <tr v-for="(info,idx) in customerList"
                    :key ="info.id"
                    v-on:click="goToCustomerInfo(info.id)">
                    <!-- (1) customerInfo component 호출 (컴퍼넌트의 교체가 필요 [부모자식 관계가 아닌 동등 관계]) ==> id값과 함께 vue.router을 사용해준다.-->
                        <td>{{ idx }}</td>
                        <td>{{ info.id }}</td>
                        <td>{{ info.name  }}</td>
                        <td>{{ info.phone }}</td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="4">
                        ※ 현재 데이터가 존재하지 않습니다 ※
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'; // => Ajax를 실행하기 위한 모듈 (비동기작업) 
//SPA = 화면이 랜더링이 되고 데이터가 도착해서 반영되는 것으로 새로고침이 없다. 

export default {
    data(){
        return{
            customerList : []
        }
    },
    computed : {
        count(){ // count는 새로 생성된 게 아니라 customerList 의 길이를 가져오는것
            return this.customerList.length;
        }
    },
    created(){ // creat에서는 데이터 호출만 실행하고 작업은 함수에서 해준다. why? 실제 create가 어디까지 실행 될지 모르기 때문이다.
        // 컴포넌트가 초기화할 데이터 호출 
        this.getCustomerList();
    },
    methods : {
        async getCustomerList(){
            //result = 서버 응답  + 네트워크 정보 포함 ( 데이터 가져오기)
            let result = await axios.get('/api/customers')  //http://localhost:8081/api/customers 이다 그런데 proxy 에서 origin 다음의 /api 를 / 로 바꿔준다 [ pathRewrite]]. 
                                .catch(err => console.log(err));
            this.customerList = result.data; //result에서 정확한 데이터만 가져오기 
            // 원래 customerList = data.customerList 이다 
        },

        //(2)라우터를 기반으로 컴포넌트 이동 (매개값과 함께)
        // 라우터로 데이터를 넘기는 것은 put,post,delete 방식으로 넘기는게 불가 + req.body 넘기는거도 불가 
        // 라우터를 기반으로 데이터를 보내려면 query, params 를 사용 해야 한다.  
        // vue 가 가지고 있는 라우터를 말한다. 
        goToCustomerInfo(id){
            //console.log(id); 
            // push = router 에게 데이터를 입력  | $router = 컴포넌트 선택 (vue> index.js(라우터) 폴더에서 name 을 찾아서 이동 )
            this.$router.push({ name : 'customerInfo',
                                query : { customerId : id},  
            //http://localhost:8081/customerInfo?customerId=3 => 경로에서 ? 이후 질의 문자(queryString)생성   |query 의 경우 값이 없어도 문제가 되지 않는데, params의 경우 값이 없으면 아무것도 뜨지 않는다.
            // query  (값이 있을 수도 없을 수도 있는 경우 사용)
            // : {key : value} e.g  query : { customerId : id} => ? key =value 
            // params  (값이 있어야 하는 강제성이 있다. )
            // 1) path속성 : '/target/:uId' 
            // 2) params : {uId : value} e.g params : { customerId : id}  => /target/value

                            });  
            // $ 붙으면 옵션이 되고 숨겨진 필드 이다. 특별한 목적을 가지고 접근하는 것을 제외하고는 원래는 몰라야 하는 속성 (즉, vue가 직접 접근해도 되는 대상과 숨겨져 있는 대상을 구분 해뒀다.)
        }
    }

}
</script>