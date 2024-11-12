const express= require('express'); // express모듈 불러오기
const app = express(); // express 실행 을 app 을 생성해서 실행 시킨다. 

// 서버가 제공하는 서비스 http://localhost:3000/ ==>  / (루트) 경로로 접근 할 경우 'Server Connect'을 답으로 보내준다.
app.get('/',(req,res)=>{ //req = request , res = respond
    res.send('Server Connect');
});

//실제 서버가 실행(listen) 되는 구간 : 무슨 포트 (3000)를 열어서 어떤 서버를 열어줄지 결정해주는 부분 , 그리고 콜백 함수(서버 접속 확인 및 접속할 경로 안내) 를 사용 해준다
app.listen(3000,()=>{
    console.log('서버가 실행됩니다.');
    console.log('http://localhost:3000');
});

// http://localhost:3000/yedam 의 경우 없는 페이지라 에러가 뜨는데 여기서 404로 표시 안되는 이유는 에러 그 자체를 그냥 출력 되기 때문 