//app.js (실제로 파일을 실행하는 곳 )
//대문역할  실행 순서(0)

require('dotenv').config({path:'./database/mysql.env'}); // db 위치 env 파일 불러오기

const express = require('express');
const app = express();
const userRouter = require('./router/user_router.js'); // 라우터 파일 불러오기

//미들웨어 등록
app.use(express.json()); // content-type = application/json  데이터 처리 타입

//라우터 등록 
app.use('/',userRouter);



//서버실행
app.listen(3000, () =>{
    console.log('Server Start');
    console.log('http://localhost:3000');
})


//라우팅 
//root 에 대한 라우팅 등록
app.get('/',(req,res)=>{
    res.send('Welcome!!');
})