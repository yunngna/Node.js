const mysql = require('mysql'); // 생성한 mysql모듈 불러오기 
const sqlList = require('./sqls/users.js'); //sql.js 파일 불러오기 

//creatConnection = 단일 서버 접속,  createPool = 다수 서버 접속 
const connectionPool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    user : process.env.MYSQL_USER,
    password :process.env.MYSQL_PWD,
    database : process.env.MYSQL_DB, 
    connectionLimit : process.env.MYSQL_LIMIT,
    debug : true // mySQL 기반으로 하는 데이터를 보내고 받는 값을 보여주는것 
});

// 소통을 위해 쿼리문을 보내는 부분 (함수생성) 
const query = (alias,values)=>{
    return new Promise((resolve, reject)=>{
        let excuteSql = sqlList[alias];  // JS객체부르는법 (노션 참고)
        connectionPool.query(excuteSql,values,(err,results,fields)=>{ // connectionpool 을 사용해서 sql.js 에 전송 
            //console.log(fields); //내부 실행한 결과값 보기
            if (err){
                console.log(err);
                reject({err});
            }else{
                resolve(results);
            }
        }); 
    });
};

module.exports = {
    query,
}