<!--components/PageContent.vue-->
<!--게시글 상세보기 / 자식 컴퍼넌트-->
<template>
    <table>
        <tbody>
            <tr>
                <th>제목</th>
                <td>{{ title }}</td>
                <th>조회수</th>
                <td>{{ readInfo }}</td>
            </tr>
            <tr>
                <th>작성자</th>
                <td>{{ writer }}</td>
                <th>작성일자</th>
                <td>{{ regdate }}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td width="200px" height="100px">{{ content }}</td>
            </tr>
            <tr>
                <button type="button" v-on:click="updateInfo">업데이트</button>
            </tr>
        </tbody>      
    </table>
</template>
<script>
export default{
    // props의 값은 부모로 부터 받는 값 

    //props 배열 타입
    // props : ['title','count','writer','regdate','content'],

    // props 객체 타입
    // 자식이 props에 부모로 부터 받는 데이터의 조건 (강제성은 아니나 유지보수를 위해 지정하는 것이 좋다. e.g default)
    // 데이터 조건 위배시 Vue warn으로 화면이 안뜨는 것은 아니다.
    props : {
        title : String, // title을 String 타입으로 부모로 부터 데이터를 받고 싶다.

        count : { // 받는 데이터의 조건이 여러개 인 경우 객체 형식으로 지정 
            type : Number,
            default :0 // 혹시 라도 부모가 count 값을 넘겨 주지 않는 경우의 값 
        },

        writer : {
            type : [String, Object], // 데이터 타입이 String or object 형식 
            default : function(){
                //객체나 배열의 기본 값은 항상 팩토리 함수로부터 반환되어야 함
                return {first : 'Adward', second : 'Ian'}
            }
        },

        regdate : {
            required : true, // 무조건 함수 값으로 넘어와야 한다. 
            validator : function(value){ // 유효성 체크 
                //yyyy-MM-dd 해당 포맷에 맞게 날짜 출력 되게 하기
                let format = /[1-2][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/ // 정규표현식 [1에서2사이의 값][0에서9의값]  
                return format.test(value);
            }
        },
        content : String, 

    },
    computed : {
        readInfo(){
            // count는 읽기 전의 값이고 버튼을 눌러서 읽으면 자동으로 1 증가 한 값이 readInfo가 되어야 한다.
            return this.count + 1;
        }
    },
    methods : {
        updateInfo(){
            // 자식이 부모에게 요청하는 이벤트 전달 => this.$(emit)('전달할 이벤트 이름','전달 하고자 하는 데이터');
            this.$emit ('update-info',this.readInfo);
        }
    }
}
</script>