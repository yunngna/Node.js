<!--components/StoreComponent.vue-->
<template>
    <div>
        <form>
            <label>제품ID : 
                <input type="text" v-model="prodInfo.product_id">
            </label>
            <br>
            <label>제품명 : 
                <input type="text" v-model="prodInfo.product_name">
            </label>
            <br>
            <label>카테고리 : 
                <input type="radio" value="A" v-model="prodInfo.category"> A
                <input type="radio" value="B" v-model="prodInfo.category"> B
            </label>
            <br>
            <button type="button" @click="addCart">추가</button>

        </form>
        <table>
            <thead>
                <caption>total: {{ total }}</caption>
                <tr>
                    <th>카테고리</th>
                    <th>제품ID</th>
                    <th>제품명</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="info.product_id" 
                    v-for="info in products">
                    <td>{{ info.category }}</td>
                    <td>{{ info.product_id }}</td>
                    <td>{{ info.product_name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                prodInfo : {
                    product_id : '',
                    product_name : '',
                    category : 'A'
                }
            }
        },
        computed : {
            products(){
                // $store = root 에 있는 vuex 저장소를 말한다. [index.js]
                return this.$store.state.cart;
            },
            total(){
                return this.$store.getters.cartCount;
            }
        },
        methods : {
            addCart(){
                let obj = {
                    product_id  : this.prodInfo.product_id,
                    product_name : this.prodInfo.product_name,
                    category : this.prodInfo.category

                }
                // dispatch 는 actions 함수 호출 
                // | this.prodInfo 로 참조타입으로 넘기면(=데이터 주소) 중앙저장소의 값도 변경이 되기 때문에 
                // 무조건 새로운 객체를 형성해서 넘겨준다 = obj
                this.$store.dispatch('addProduct',obj);
            }
        }
    }
</script>