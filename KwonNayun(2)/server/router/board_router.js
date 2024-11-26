// board_router.js
const express = require('express');
const router = express.Router();
const boardService = require('../service/board_service.js');

//전체조회
router.get('/boards',(req,res)=>{
    boardService
        .findAll()
        .then(list => {
            res.send(list);
        })
        .catch(err =>{
            res.status(500).send('Fail Process');
        })
})

//단건조회
router.get('/boards/:no',async(req,res)=>{
    let userNo = req.params.no;
    let info = await boardService.findByNo(userNo);
    res.send(info);
})

//등록 
router.post('/boards',async(req,res)=>{
    let boardInfo = req.body;
    let result = await boardService.AddNewBoard(boardInfo);
    res.send(result);
});
//수정
router.put('/boards/:no',async(req,res)=>{
    let boardNo = req.params.no;
    let info = req.body;
    let result = await boardService.updateBoard(boardNo,info);
    res.send(result);
});

//댓글전체조회
router.get('/comments/:bno',async(req,res)=>{
    let boardBno = req.params.bno;
    let info = await boardService.commentList(boardBno);
    res.send(info);
});

module.exports= router;