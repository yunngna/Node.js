//router/user_router.js
// 라우터 부분을 따로 빼서 만들어준다 주제별로 (e.g 회원,재고,게시판)
//라우팅  = 사용자 요청 (URL + METHOD) + Service + view  (해당 세가지 내용을 결정하는 것 ) 
//        = 사용자가 어떤 url 와 방법으로 접근해서 어떤 기능을 실행해서 불러올지를 결정하는 것 
//     e.g 레스토랑에서 서버 역할 (고객에게 주문을 받고(레스토랑의 메뉴를 설명하고) 주방에 전달한 후 주방의 음식을 다시 고객에게 전달하는 역할) 
// 실행순서 (1)

const express = require('express'); // 모듈 express 불러오기
const router = express.Router(); // express의 라우터 불러오기 
const userService = require('../service/user_service.js'); // 서비스 불러오기

//전체조회
router.get('/users',(req,res)=>{
    /* 방법1 (해당 방법은 에러가 사용자에게 그대로 다 노출된다.)
    let userList = await userService.findAll();
    res.send(userList);*/
    //방법2 (비동기방법을 사용 | 이 방법을 사용하면 에러 발생시 사용자에게 에러를 알리되 무엇이 에러인지 숨기기 위해서 사용)
    userService
        .findAll()
        .then(list => {
            res.send(list);
        })
        .catch(err=>{
            res.status(500).send('Fail Process');
        })
});

// 단건조회
router.get('/users/:no',async(req,res)=>{
    let userNo = req.params.no;
    let info = await userService.findByUserNo(userNo);
    res.send(info);
});
// 등록
router.post('/users',async(req,res)=>{
    let userInfo = req.body;
    let result = await userService.createNewUser(userInfo);
    res.send(result);
});

//수정
router.put('/users/:no',async(req,res)=>{
    let userNo = req.params.no;
    let info = req.body;
    let result = await userService.updateUserInfo(userNo,info);
    res.send(result);
});


//삭제 
router.delete('/users/:no',async(req,res)=>{
    let userNo = req.params.no;
    let info = await userService.delUserInfo(userNo);
    res.send(info);
});


// routing 부분을 외부에서 접근 가능하게 export해주기
module.exports = router; 