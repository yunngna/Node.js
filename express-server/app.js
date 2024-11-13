// *터미널의 경우 서버 당 하나만 실행해야 충돌이 나지 않는다. 
// 서버 생성 

//fs(fileSystem) 기본모듈 (json데이터 불러오는데 사용)
const fs = require('fs');

// express 모듈 불러오기
const express = require('express');
const server = express();

//라우터를 경로를 찾아 받아오기 
const userRouter = require('./router/user.js');

// 서버에 라우터 적용하고 대표 경로 ('/user') 지정 why? 루트경로와 반복 되기 때문에 반복을 방지하기 위해서 따로 지정  
//http://localhost:3000/user  를 사용하면 '회원정보조회' 가 뜨는데 시작 경로를 /user 로 지정  (이렇게 미리 그룹지어서 경로 설계해서 접근 권한을 부여한다.)
server.use('/user',userRouter); 

// 지정된 폴더를 전체로 불러오는 방법 =>express.static 
//  http://localhost:3000/img/coffee.jpg 
// http://localhost:3000/img/bird/bg1.jpg 
server.use('/img',express.static('./images'));

// 에러 발생시 관리자 에게 문의 하라고 알리고 동작을 안하게 하는것 [예외처리]
server.use(function(err,req,res,next){
    res.status(500).json({statusCode : res.statusCode,
                        errMessage : err.message });
});

// 에러 발생시 경로 등록 [예외처리]
//http://localhost:3000/error
server.get('/error',(req,res,next)=>{
    next(new Error('Process Fail! Check Data!'));
});

//미들웨어 등록 (express가 제공한 보조기능 )
server.use(express.json()); // express가 가지고 있는 json parse 기능 등록 => 모든 라우터에 json 사용 가능  



// DB 설정 (현재는 db 파일이 하나라 app.js에서 진행하나 db 파일이 많은 경우 파일을 분리해서 진행 )
const jsonFile = fs.readFileSync('data.json'); // 파일을 다 읽고 진행 (동기식 진행) == 읽기
const jsonData = JSON.parse(jsonFile); // 읽은 파일 변환 (json 타입으로 변환)

const query = (crud, target, where = null)=>{
    let result = null;
  
    let emps = jsonData;
    switch(crud){
    // 조회
    case 'SELECT' :
      result = (where == null) ? emps :  emps.filter(emp => {
        return findEmp(emp, where);
      });
      break;  
  
    // 등록
    case 'INSERT' :
      emps.push(target);
      break;
    // 수정
    case 'UPDATE' :
      emps.forEach(emp => {
        if(findEmp(emp, where)){
          for(let field in target){
            emp[field] = target[field];
          }
        }
      });
      break;
    // 삭제
    case 'DELETE' :
      let selected = null;
      emps.forEach((emp, idx) => { //for 문 돌리는 중에 삭제를 하면 반복문이 이상해 질 수 있다. 
        if(findEmp(emp, where)){
          selected = idx;
        }
      });
  
      emps.splice(selected, 1); // 그래서  for 문을 통해서  idx 가져와서 splice 해준다.
      break;
    }
    return result;
  };
  
  function findEmp(emp, where){
    let fieldNum = 0; // 총 검색 조건 갯수
    let selected = 0; // true 인 검색 조건 갯수
    for(let field in where){ // for of = 배열 순환,  for in = 개체를 순환
      fieldNum++;
      if(emp[field] == where[field]){
        selected++;
      }
    }
    return (fieldNum == selected);
  }

//서버 실행 (포트(보통 3000), 콜백함수)
server.listen(3000,()=>{
    console.log('Server Start');
    console.log('http://localhost:3000');
});

// 루트 경로 (누구나 접속 가능하고 가장 먼저 접속해서 method= get 사용 ) 
server.get('/',(req,res)=>{
    //res.send('Server Connect!'); // 응답 보내기 
    res.sendFile('index.html',{root : __dirname}); // 화면을 클라이언트에게 보내기 
}); 


//&[data.json]정보를 제공 시 5가지 기능 (전체조회, 단건조회 , 추가, 삭제, 업데이트)
// &| REST  방식 사용 (method 각 다르고 url 동일 )

//전체조회 : GET , url = emps  [http://localhost:3000/emps]

        //('url', (request,response) => {})
server.get('/emps',(req,res)=>{
    //res.send(jsonData);
    res.send(query('SELECT'));
});

/* 
? req.params 속성 접근 => 처리 대상 : pathvariable (params 처리라서 원하는 대로 변수 이름을 지정 할수 있다.)
= 데이터 타입 속성 없음 (url 값으로 경로로 인식)
? req.body 속성 접근 =>  처리 대상 : JSON
= JSON :   {   } or  [  ] 
? req.query 속성 접근 => 처리 대상 : QueryString 
= QueryString(질의문자열)  (key=value & key=value & …) 
*/

//단건조회 : GET , url = emps/:id  [/:id = 값을 받는 위치 (pathvariable[경로변수] 방식)]
//[http://localhost:3000/emps/10(id값)]

server.get('/emps/:id',(req,res)=>{
    res.send(query('SELECT',null,{id : req.params.id })); 
    // req= 클라이언트로 부터 받은 파일 
});

//등록 : POST , url = emps 
server.post('/emps',(req,res)=>{
    //res.send('Emp Insert');
    console.log(req.body);
    res.send(query('INSERT',req.body)); //? json 으로 데이터 보내기 
    // 데이터가 개체로 들어온다. 
});

//수정 : PUT , url = emps/:id [/:id = 값을 받는 위치 (pathvariable[경로변수] 방식)]
server.put('/emps/:id',(req,res)=>{
    res.send(query('UPDATE',req.body,{id : req.params.id}));
});

//삭제 : DELETE , url = emps/:id [/:id = 값을 받는 위치 (pathvariable[경로변수] 방식)]
server.delete('/emps/:id',(req,res)=>{
    res.send(query('DELETE',null,{id : req.params.id}));
});