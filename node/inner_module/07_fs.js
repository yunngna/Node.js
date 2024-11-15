//07_fs.js
const fs = require('fs');

// 기본은 비동기 작업 (작업종료가 먼저 수행 ==  코드 전체 수행 한 후 파일생성작업 시행)

const data = "Hello, World!!";

//파일생성 (작성하고자 하는 생성될 파일 , 작성 내용, encoding방식, 작성하고 나서 난 후 콜백 함수 (오류가 생기면 매개변수 err 가 넘어온다)  
fs.writeFile('./sample.txt',data,'utf8',(err)=>{
    if(err){
        throw err;
    }
    console.log('파일쓰기완료!');
});

//* 파일은 데이터베이스(동시접속허용) 가 아니다. 파일의 경우 한사람만 순차적으로 사용해야 한다.
//파일 읽기 (읽을 파일에 저장된 파일의 encoding 값에 맞게 적용해줘야 한다.
// e.g 영어로 작성 (utf8) ->utf16le encoding으로 읽으면 읽을 수 없다. )
fs.readFile('./sample.txt','utf8',(err,result)=>{
    if(err){
        throw err;
    }
    console.log(result);
});
console.log('작업종료');