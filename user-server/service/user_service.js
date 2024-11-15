//service/user_service.js
// 기능 = 함수 등록 (함수 선언문이 아니라 등록식 즉 function을 사용하지 않음)
//실행 순서 (2)

 // 주문 결제 과정 시 컨트롤러(프로세스 반영 되면 안되고 연결만 하는 기능이다.)에서 진행하는게 아니라 service에서 포함해줘야 한다.
    //why? 기능이 바뀌기 때문에 기능을 다루는 service에서 처리해줘야 한다.
    //service 는 또다른 service를 호출 가능하다. (e.g 결제 api 호출 => 개인정보조회 기능 호출)
    // 1) 결제 API호출 
    // 2) DB에 저장 


const mysql = require('../database/mapper.js');  // mapper을 불러오는 부분 

//전체조회
const findAll = async()=>{
    let list =await mysql.query('userList');
    return list;
}
//단건조회
const findByUserNo = async(userNo)=>{
    let list = await mysql.query('userInfo',userNo); 
    let info = list[0]; // 실제로 값이 두개 보내었기 때문에 배열로 돌아오기 때문에 값을 한건만 나오게 하기 위해 idx 0 만 나오게 한다.
    return info; 
}

//등록
const createNewUser = async(userInfo)=>{ // userInfo = 객체 라고 가정
    let result = await mysql.query('userInsert',userInfo);
    if(result.insertId > 0){ // insertId = 새로 등록 된 건에 대해 autoIncrement 로 인해서 증가한 값에 대한 것 
        return {user_no : result.insertId};
    }else{ // 실패한 경우 빈 객체 보내 주기 
        return {};
    }
   

}
//수정
const updateUserInfo = async(userNo, updateInfo )=>{
    let data = [updateInfo , userNo]; // 업데이트는 ? 가 두 개 임으로, 배열로 값이 들어가야 한다. 그래서 배열로 만들어 준다.
    let result = await mysql.query('userUpdate',data);
    let returnData = {}; // 객체로 값 보내 주기 위해서 객체 만들기 
    if(result.changedRows == 1 ){ 
        returnData.target = {'user_no':userNo};
        returnData.result = true;
    }else {
        returnData.result = false;
    }
    return returnData;
}

//삭제
const delUserInfo = async(userNo)=>{
    let result = await mysql.query('userDelete',userNo);
    if(result.affectedRows == 1 && result.changedRows == 0){ // 삭제 성공 시
        return {"result" : "success", "user_no" : userNo }; 
        // return 의 경우 db 값 그대로 보낼 필요 없다. 그래서 원하는 객체{ } 나 배열[]로 보내도 된다. 
    }else {
        return {"result" : "fail" };
    }
    
}

// 필요한 내용을 export 하고 db 연결 종료 
module.exports = {
    findAll,
    findByUserNo,
    createNewUser,
    updateUserInfo,
    delUserInfo
}
