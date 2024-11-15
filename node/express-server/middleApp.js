//middleApp.js [서버형성]  application/x-www-form-urlencoded  형태의 데이터 설정
const express = require('express');
const cors = require('cors'); // cors 형성

// express-session 모듈 읽어오기 
const session = require('express-session');

const app = express();

//모든 요청에 응답
app.use(cors()); // cors등록 (서버 내부에 등록 하는 정보)

// 접근 대상을 제한 해서 응답 (지정한 요청에 대해서만 응답) [same origin policy 등록]
const corsOptions = {
    origin : 'http://192.168.0.33:5500', // ip (cmd > idconfig로 확인) : vscode에서 등록한 포트번호 (5000) 
    optionsSuccessStatus : 200
}
app.use(cors(corsOptions));

//application/x-www-form-urlencoded  
//? = 통신의 가장 기본 content-type (queryString 질의문자열  (key=value & key=value & …) 
//?     =>  method구분 없이 모두 보낼 수 있는 것 (json, multipart는 body 가 있어야 보낼 수 있다.))

// 해당 서버에 queryString 질의문자열 을 처리 하려면 ' express.urlencoded({extended : false}) ' 등록이 필요하다.
// why? 서버는 비어 있기 때문에 사용시 컨텐트 타입에 따라서 등록을 해줘야 한다.
app.use(express.urlencoded({extended : false}));

app.post('/info', (req,res)=>{
    res.send(`keyword: ${req.body.search}`); // form-urlencoded 데이터 타입 + post method 
});

app.listen(3000,()=>{
    console.log('http://localhost:3000');
})

// express-session 세팅
let sessionSetting = session({
    secret : '$#@1235TSecdx',// 암호회 키 (세션을 기반으로 해서 저장을 할 때 보안을 할때 사용하는 것 )
    resave : false, // 세션의 변경사항을 재 저장 여부 (true : 빈번하게 세션 변화를 저장, false : 로그인 정보 정도 저장이면 true 필요 없음)
    saveUninitialized : true, //값을 저장하기 전에 세션 생성 (e.g 로그인 하기 전에 접속한 이력이 있으면 자동 로그인 되게 해주는 것)  
    cookie : {  // 세션을 등록하면 클라이언트의 경우 쿠키에 의해서 이력을 저장해서 사용
        httpOnly : true, // 자바스크립트 기반으로 해서 쿠키의 접근을 막음 (사실 쿠키는 오픈 되어 있음)
        secure : false, // 보안관련
        maxAge : 60000 // 쿠키의 유효기간 (localStorage 에 쿠키를 저장 하지 않는 다면 기본 유효기간은 짧다)
    }
});
//session 관련 미들웨어 등록 (미들웨어 다음에 라우팅이 와야 한다!)
app.use(sessionSetting);

// 로그인시 사용자가 작성한 아이디와 비밀번호 가져와서 session에 저장
app.post('/login',(req,res)=>{
    const {id, pwd} = req.body; //{id : 'nayun124' , pwd : '0000' }
    req.session.user = id; // user = session에 id를 저장하는 이름 
    req.session.pwd = pwd;
    req.session.save(function(err){
        if(err)throw err; // 오류 발생 시의 경우
        res.redirect('/'); // redirect = 우리서버 내부의 위치의 라우터로 이동 
    })
});
// '/' url 에 접속한 경우
app.get('/',(req,res)=>{
    res.send(req.session); // session 에 저장된 값 (user,pwd)을 같이 보내준다.
});

app.get('/logout',(req,res)=>{
    req.session.destroy(); 
    res.redirect('/');
});
