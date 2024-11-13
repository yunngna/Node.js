//router/user.js
// 계정과 관련된 기능 추가 

const express = require('express');
const router = express.Router(); // router은 express 에서 불러온다 

// /user + / => /user/
//http://localhost:3000/user 
router.get('/',(req,res)=>{
    res.send('회원정보조회');
});

//  /user + /insert => /user/insert
//http://localhost:3000/user/insert
router.post('/insert', (req,res)=>{
    res.send('회원등록');
});

module.exports = router; 
//! router 는 독립된 형태로 모듈식으로 나타낸다. (라우터모듈 로 설정)
//! | 항상 종료를 의미 하며 뒤에는 작성하는 코드는 deadCode이다.
