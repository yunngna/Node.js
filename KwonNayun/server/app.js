//app.js

require('dotenv').config({path:'./database/mysql.env'});

const express = require('express');
const app = express();
const boardRouter = require('./router/board_router.js');

app.use(express.json());

app.use('/',boardRouter);

//서버실행 
app.listen(3000,()=>{
    console.log('Server Start');
    console.log('http://localhost:3000');
});

//root 라우팅 등록
app.get('/',(req,res)=>{
    res.send('Welcome');
})