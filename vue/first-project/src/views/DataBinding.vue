<!--views/DataBinding.vue (component 이름은 대문자로 시작)-->
<template>
<!--html-->
    <div>
        <!--tag의 속성-->
        <!-- 데이터 바인딩 된 변수는 title, tagList-->

        <!--바인딩 디렉티브 (v-bind directive) -->
        <h1>{{ title + '!!!! ' }}</h1> <!--text속성 바인딩하기 방법 1 |  자바스크립트를 작성하고 자 하면 {{ 이중괄호}} 로 안에 작성 [템플릿 리터럴과 유사 하며 자바스크립트 연결 인 + 사용] (값이 변하지 않는 경우 사용 )-->
        <!--directive : Vue의 명령 수행 , 'v-' 접두어를 사용하는 경우 (명령어 종류 중 하나이다.)-->
        <h2 v-text="title" id="home"/> <!--text속성 바인딩하기 방법 2 | v-text = 접두어 : 데이터를 바인딩 하지 않고 리터럴 값으로 주는 것 (vue가 가지고 있는 변수를 활용)-->
        <p v-html="tagList"/>
        <!-- <p v-bind:text="tagList"/> -->
        <p v-text="tagList" v-bind:class="textStyle"/> <!--v-bind directive(디렉티브) = 단방향(변수 변경시 태그에 강제로 값을 일방적으로 집어 넣는 것) -->
        <hr>

        <!--v-model directive (디렉티브) = 양방향 (입력태그 :input 에 사용 하며 사용자가 입력하는 값이 즉각적으로 값 변경이 반영 되는 것)-->
        <input type="text" v-model="valueModel"> <!-- input의 value 의 기본 값 = string-->
        <p>{{ valueModel }},{{ typeof valueModel }}</p>

        <!-- input의 value 의 기본 값 = string 을 자동으로 parse해줘서 숫자로 바꿔준다-->
        <input type = "number" v-model.lazy="numberModel"> 
        <!--lazy = 수식어 (해당 디렉티브 옆에 보조로 사용) 
        = delay거는 걸로 enter치거나 focus가 바뀌는 경우 반응해서 변경해준다. [실시간으로 계속 바꾸면 계속 이벤트 처리를 해줘야 해서 그것을 방지 하기 위해 사용]
        (즉, defalut로 된 입력 이벤트로 변경사항을 변경해주는 것을 바꿔주는것 )-->
        <p>{{ numberModel }},{{ numberModel + 10000 }}</p>

        <select v-model="selectModel">
            <option value="summer">여름</option>
            <option value="winter">겨울</option>
        </select>
        <p>{{ selectModel }}</p>

        <textarea v-model="textModel"></textarea>
        <hr>

        <!--v-model directive (디렉티브) 의 라디오, 체크박스 ==> value 값이 따로 있기 때문에 변수가 가져야 할 값은 checked가 된다.-->
        <!-- 하나의 경우 | 선택 시 true , 선택 해제시 false 가 기본 값 (boolean 타입) -->
        <!-- <input type ="checkbox" v-model="chData"> -->
        <input type ="checkbox" v-model="chData"
            true-value = "여" false-value = "남"> <!--true, false 값을 지정해서 덮어 쓰기-->
        <p>{{ chData }}</p>
        <!-- 다수의 선택의 경우(여러개 보기 중에 다수의 값 선택 시 )-->
        <div>
            <input type ="checkbox" value="서울" v-model="city">서울
            <input type ="checkbox" value="대구" v-model="city">대구
            <p>{{ city }}</p>
        </div>
        <div>
            <input type="radio" value="독서" v-model="hobby">독서
            <input type="radio" value="영화" v-model="hobby">영화
            <input type="radio" value="운동" v-model="hobby">운동
            <p>{{ hobby }}</p>

        </div>

        <hr>
        <!--v-bind style and class-->
        <img v-bind:style = "styleData" v-bind:src="imgUrl">

        <div class="container"
            v-bind:class="{'active': isActive, 'text-red': hasError}">
        class Binding First</div>
        <!--isActive, hasError 로 객체 스타일로 클래스를 줘서 사용자의 요청 및 연산의 결과 값으로 true, false 변경시 실시간으로 변경 가능하도록 하는것이다.-->

        <div class="container"
            v-bind:class="myClass">class Binding Second</div>
    </div>

</template>

<script>
//js
export default { // 외부로 내 보내주는 것 
    data(){ 
    // data속성을 사용 해서 html객체와 연결 할 것을 적어준다 [기본] 
    //  데이터 바인딩에 사용할 데이터들 (CRUD[제한없음] = create, read , update, delete)
        return{
            title : "Hello, Vue.js",
            tagList : '<strong>Today is .... </strong>',
            textStyle : "text-red",

            valueModel : 'Korea',
            numberModel : '0',
            selectModel : 'winter',
            textModel : "백견불여일타",

            chData : '', // 하나의 값만 선택 가능해서 string
            city : [], // 다수의 값 선택 가능해서 배열(array)
            hobby : '',  // 하나의 값만 선택 가능해서 string

            styleData:{ // style 속성 이며 객체 형식 (값을 변경이 가능하다. = 데이터 바인딩을 사용 하는 이유)
                //backgroundColor : 'skyblue', // 케밥 표기법 (back-ground) 가 아닌 카멜표기법으로 설정해준다.
                'background-color' : 'skyblue', // 케밥 표기법으로 작성하려면 ' ' 사용해야 한다. 
                width : '200px'
            },
            //인라인 스타일로 적용 (문장 하나로 넣기 때문에 값을 변경하기 어렵다.)
            backSetting : 'background-color: skyblue; width: 200px;',


            imgUrl : 'https://kr.vuejs.org/images/logo.png',
            isActive : false,
            //hasError : !this.isActive, // 해당 경우의 경우 초기값만 세팅 (isActive 의 반대값을 hasError에 적용) -> 이후에는 연결 끊어짐
            myClass : 'active'
        }
    },
    //[option (옵션)]
    //toggle형식으로 isActive 의 반대값을 hasError에 적용 (isActive 값이 변경 되면 자동으로 실행)
    computed : { // 이미 존재하는 데이터를 기반으로 계사한 결과값 (read only) 
    //데이터 바인딩에 사용할 데이터들 (R [Readonly로 읽는것만을 제한])
        hasError : function(){
            return !this.isActive;
        }
    },

    methods : {}, // 컴포넌트 내부에서 사용하는 기능 및 함수 
    watch : {}, // 감시자 = 변수들을 감시(바인딩된 데이터를 감시해서 변경된 사항을 연속적으로 처리해주는 역할)
    components : {}, // 하위 컴포넌트 목록 (화면 구성에 사용하는 자식 컴포넌트 등록 [기존에 존재하는 컴포넌트 불러오기])
    props : [], // 부모로부터 넘겨 받은 데이터들 

}

</script>

<style>
.text-red {
    color: red;
}
.text-blue{
    color: blue;
}

.container{
    width: 100%;
    height: 200px;
}

.active{
    background-color: aquamarine;
    font-weight: bold;
}
</style>
