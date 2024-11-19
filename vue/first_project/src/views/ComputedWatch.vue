<!--views/ComputedWatch.vue-->
<template>
    <div>
        <input type="number" v-model="price">원
        <br>
        <input type="number" v-model="count">개
        <p>과세금액 : {{ amount }}</p>
        <p>부과세 10% : {{ tax }}</p>
        <p>결제금액 : {{ total }}</p>
    </div>
</template>

<script>
// const computed ={
    // price, count 에 따라서 amount, tax , total 고정 값
//     data(){
//         return{
//             //변경 가능한 항목 (값을 받아올 항목)
//             price : 0,
//             count : 0
//         }
//     },
//     computed : {
//         // 새로운 데이터를 생성 (함수 형태로 생성)[readonly]
//         amount(){
//             return this.price * this.count;
//         },
//         tax(){
//             return this.amount * 0.1;
//         },
//         total(){
//             return this.amount + this.tax;
//         }

//     }
// };

const watch ={
     // price, count 에 따라서 amount, tax , total 고정 이 아니라 각각 요소가 변경이 가능하다. 
     // 스케줄러 (시간과 함께)할때 사용 한다. (e.g 로그인 개인 인증 (5분안에 인증시간) 에 사용 )
    data(){
        return{
            // 데이터 모두 정의 해야 한다.
            price : 0,
            count : 0,
            amount : '',
            tax : '',
            total : ''
        }
    },
    watch : {
        //감시하는 모든 데이터를 정의 해 줘야 한다. 
        price(){
            this.amount = this.price * this.count;
        },
        count(){
            this.amount = this.price * this.count;
        },
        amount(){
            this.tax = this.amount * 0.1;
            this.total = this.amount + this.tax;
        }
    }

};

//export default computed;
export default watch;


</script>