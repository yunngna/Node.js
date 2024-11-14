//app.js => express 서버에서 호출 하는 부분 
// service 를 통해서 mapper 을 호출 해야 한다(원래)
//실행 순서 (1)

const express = require('express');
const app = express(); // 인스턴스 생성 
const mysql = require('./mapper.js');

//content-type : application/json | rest 기반 서버라서 json 형식의 데이터 주고 받음 
app.use(express.json());

//서버 실행 코드 (여기서 비어있는 포트 번호가 필요하다.) 밑에 형성된 라우팅이 뭐든지 간에 서버 실행은 여기서 부터 실행 
app.listen(3000,()=>{
    console.log('Server start');
    console.log('http://localhost:3000');
});
// REST 방식 
//전체조회
app.get('/customers',async(req,res)=>{
    let list = await mysql.query('customerList'); // 퀴리문 가져오기(db정보 가져오기)
    res.send(list);
    //await 를 걸어주는 이유는 let list = mysql.query('customerList'); 값을 가져오기 전에 res.send(list); 가 먼저 실행 
});

//단건조회
app.get('/customers/:id',async(req,res)=>{
    let selected = req.params.id; // 경로의 /:id 값 가져오기
    let info = (await mysql.query('customerInfo',selected))[0]; // mapper.js 으로 이동 해서 실행 
    // 화면에 출력 하는 값이 배열로 나오기 때문에 배열을 없애기 위해서 앞에 await 부분 감싸주고 [0] 넣어준다 = 강제 변환
    res.send(info);
});

//등록 (객체로 데이터 넘겨줘야 한다.)
app.post('/customers',async(req,res)=>{
    let newObj = req.body; // 받은 값을 body 에 담아서 객체 타입으로 보낸다. 
    // content-type : application/json 이기 때문에  body 에 담아야 한다.
    console.log(newObj);
    let info = await mysql.query('customerInsert',newObj);
    res.send(info);
    
});

//수정 (배열로 데이터 넘겨줘야 한다.)
app.put('/customers/:id',(req,res)=>{
    
});

//삭제
app.delete('/customers/:id',async(req,res)=>{
    let selected = req.params.id; // 경로의 /:id 값 가져오기
    let info = await mysql.query('customerDelete',selected); // mapper.js 으로 이동 해서 실행 
    res.send(info);
    
});
