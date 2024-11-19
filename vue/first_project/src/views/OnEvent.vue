<!--views/OnEvent.vue-->
<template>
    <div> <!--@ = v-on:    | msg = 클릭이벤트가 발생 했을 때 실행하는 함수-->
        <!-- a 태그 클릭 시 , p, div, form 순서대로 alert 이 뜬다 = 버블링-->
        <!-- 결합해서도 사용 가능 하다. e.g v-on:click.once.self-->
        <form v-on:click.self="msg('form')">
            <!--자신의 하위에 발생하는 이벤트에 대응하지 않고 자기자신을 클릭시에만 이벤트 발생-->
            Form
            <div @click.once="msg('div')">
                <!--한번 이벤트 발생 후 어떤 경우에도 한번만 발생 (버블링, 나 자신을 선택 을 하더라도 이벤트 안된다.)-->
                Div
                <p @click.stop="msg('p')">
                    <!--버블링을 중단 시켜준다. (a 태그 클릭시 p 까지만 나오고 div 부터는 이벤트 진행이 안된다.)-->
                    p
                    <a  @click.prevent ="msg('a')" 
                    href="http://www.naver.com">네이버</a>
                    <!-- click.prevent 적용으로 url 이동을 막음 -->
                </p>
            </div>
        </form>
        <hr>
        <button type="button"
            v-on:click="increaseCounter">Add 1</button>
            <!-- 원래 increaseCounter 은 객체 형태의 함수이기 때문에 obj.method.increaseCounter 형태이다-->
            <!--동작하고 자 하는 함수 increaseCounter -->
        <input v-model.number="num"> <!-- input의 default 속성 = text 이다. | int 로 타입 변환 : Number() , parseInt()-->
        
        <button type="button"
            @click="setCount(num,$event)">Add{{ num }}</button>
            <!-- setCount (매개변수) 인 함수 -->
            <!-- $event = 이벤트와 관련된 객체를 vue가 강제로 불러온다. 앞의 매개 변수가 숫자 이기 때문에 함수관련된 매개 변수를 명시해줘야한다.-->
        <p>The Counter is : {{ counter }}</p>
    </div>

</template>

<script>
    export default {
        data(){
            return{
                counter : 0,
                num : 7
            }
        },
        methods : {
            msg(tag){
                // tag정보 받아오는 함수
                alert(`${tag},선택!`);
            },



            increaseCounter(event){
                console.log('increase',event)
                this.coutner++;
                //this.counter += this.num;
            },
            setCount(value,event){
                console.log('setCount',event);
                this.counter += value;
            }

        }
    }
</script>
<style scoped> 
/*scoped는 위에 설정된 스타일이 일관적용이 안되도록 해주는 것*/
    form, form *{
        margin : 10px;
        border : 1px solid skyblue;
    }
</style>