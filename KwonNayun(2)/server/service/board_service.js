//board_service.js 
const mysql = require('../database/mapper.js');

//전체조회
const findAll = async()=>{
    let list = await mysql.query('boardList');
    return list;
}
//단건조회 
const findByNo = async(no)=>{
    let list = await mysql.query('boardInfo',no);
    let info = list[0];
    return info;
}
//등록 
const AddNewBoard = async(boardInfo)=>{
    let result = await mysql.query('boardInsert',boardInfo);
    if(result.insertId > 0){
        return { user_no : result.insertId};
    }else{
        return {};
    }
}
//수정 
const updateBoard = async(no,updateInfo)=>{
    let data = [updateInfo, no];
    let result = await mysql.query('boardUpdate',data);
    let returnData ={};
    if(result.changedRows == 1){
        returnData.target = {'no' : no};
        returnData.result = true;
    }else{
        returnData.result = false;
    }
    return returnData;
}

//댓글 전체 출력 
const commentList = async(bno)=>{
    let list = await mysql.query('commentList',bno);
    return list;
}



module.exports = {
    findAll,
    findByNo,
    AddNewBoard,
    updateBoard,
    commentList
}