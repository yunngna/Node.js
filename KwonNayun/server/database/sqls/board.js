//board.js (sql)
//전체조회 
const boardList = 
`SELECT  no
        ,title
        ,writer
        ,content
        ,created_date
        ,updated_date
FROM T_BOARD_BOARD
ORDER BY no`;

//단건조회 
const boardInfo = 
`SELECT  no
        ,title
        ,writer
        ,content
        ,created_date
        ,updated_date
FROM T_BOARD_BOARD
WHERE no =? `;

//등록 
const boardInsert =
`INSERT INTO T_BOARD_BOARD      
                        (title,
                        writer,
                        content,
                        created_date)
VALUES (?
        ,?
        ,?
        ,NOW())`;

//수정 
const boardUpdate = 
`UPDATE T_BOARD_BOARD
SET     title =?
        ,writer =?
        ,content=?
        ,updated_date = NOW()
WHERE no =?`;

//댓글 게시글 마다 조회 
const commentList =
`SELECT  no
        ,writer
        ,content
        ,created_date
        ,updated_date
        ,bno
FROM t_comment_board
WHERE bno = ? 
ORDER BY no` ;



module.exports={
    boardList,
    boardInfo,
    boardInsert,
    boardUpdate,
    commentList
}
