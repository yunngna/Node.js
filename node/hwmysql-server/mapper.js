//mapper.js

const mysql = require('mysql');
const sqlList = require("./sql.js");

const pool = mysql.createPool({
    host : `localhost`,
    port : `3306`,
    user : `dev01`,
    password : `1234`,
    database : `dev`,
    connectionLimit : 10
});

// 퀴리문 실행 할 함수 형성 (promise = 비동기작업)

const query = (sql,values)=>{
    return new Promise((resolve,reject)=>{
        let excuteSql = sqlList[sql];
        console.log(excuteSql);
        pool.query(excuteSql,values,(err,results)=>{
            if(err){
                console.log(err);
                reject({err});
            }else{
                resolve(results);
            }
        });
    });
};

module.exports = {
    query
}