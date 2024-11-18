<!--ListBinding.vue-->
<!--리스트 랜더링 (v-for) = for directive -->
<template>
    <div>
        <button v-on:click="addData">+</button> 
        <!--vue는 addEventListener을 호출 하지 않고 v-on:click & v-on:change  함수 생성하는  인라인 방식을 사용한다.-->
        <!--addData() 을 적으면 추가한 데이터가 넘어 오지 않는다. 그러므로 여러개의 이벤트를 등록하는 경우 아닌경우 addData로 적는다.
        why? 인라인 방식 onclick 속성 이다. -->
        <table>
            <thead>
                <tr>
                    <th>제품명</th>
                    <th>가격</th>
                    <th>카테고리</th>
                    <th>배송료</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for= "(prod,idx) in products"
                    v-bind:key="idx"> 
                    <!--key 사용 이유 ? 변경(수정)유무를 확인 해서 정확하게 tr 값을 수정하기 위해 사용 -->
                    <!-- 원래는 idx 를 key 값으로 사용하면 안된다. 각 항목을 식별할 수 있는 것을 key 값으로 사용해야 한다.-->
                    <td>{{ prod.product_name}}</td>
                    <td>{{ prod.price}}</td>
                    <td>{{ prod.category}}</td>
                    <td>{{ prod.delivery_price}}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script>
    let data = [
        {
            product_name : "기계식키보드",
            price : 25000,
            category : "노트북/태블릿",
            delivery_price : 5000
        },
        {
            product_name : "무선마우스",
            price : 12000,
            category : "노트북/태블릿",
            delivery_price : 5000
        },
        {
            product_name : "아이패드",
            price : 725000,
            category : "노트북/태블릿",
            delivery_price : 5000
        },
    ];

    export default {
        data(){
            return{
                products : data,
            }
        },
        methods : {
            // 함수 등록해서 내보내기
            addData(event){
                console.log(event);
                let obj = {
                    product_name : '무선충전기',
                    price : 25000,
                    category : "노트북/태블릿",
                    delivery_price : 3000,
                }
                let index = this.products.length;
                this.products[index] = obj;
            }
        }

    }

</script>