//mapper.js [sql.js 에서 등록한 sql 실행 부분] = mapper.java(interface)
// 전체조회, 단건조회, 등록, 삭제, 수정 모든 것 관계없에 메소드 1개로 실행 
//실행 순서 (2)

const mysql = require('mysql'); // mysql 모듈 가져오기 
const sql = require('./sql.js'); //등록한 sql 가져오기 

//? connection  =  서버(클라이언트) 와 db 사이의 관계에서의 통로  
// 서버와 브라우저 사이에 세션이 발생 
//? connection pool = db와 연결해서 받은 모든 데이터를 모아두는 공간 
//(db는 상대해야 할 양이 정해져 있어서 무한정으로 클라이언트에게 보내 줄 수 없다. 그래서 서버가  mysql 에서 가지고 있는 데이터(db)를 미리 예약(선점)해 두는 것 이다 
// 선점 해두지 않으면 db가 서버를 감당 하지 못해서 delay 걸린다. )

//! 동시다발적으로 들어오는 서버를 감당해야 하기 때문에 creatPool 형성  (여러개의 길 만들기)
const pool = mysql.createPool({
    //mysql 의 정보에 대해 입력 (경로생성하는데 필요한 정보)
    host : `localhost`,
    port : `3306`,
    user : `dev01`,
    password : `1234`,
    database : `dev`, // 접속하고자하는 database 
    connectionLimit : 10 // 선점하고자 하는 최대 데이터의 갯수 (최대란 무조건 최대 갯수가 아니라 mysql 가 바빠서 5개 정도 밖에 안되면 5개 선점 가능)
}); 


// 쿼리문을 실행 할 객체(함수) 형성
            // alias = customerList (sql.js파일에 export로 넘겨 받은 것)
const query = (alias,values)=>{ //쿼리 선택 시, 메소드이름(e.g 전체조회) 와 매개변수(조건의 값 e.g 단건조회의 id)
    return new Promise((resolve,reject)=>{ // 비동기작업이라 promise 가 동작 해야 한다.  [await 거는 것]
        
        let excuteSql = sql[alias];
        console.log(excuteSql);
        
        // sql = 실행할 sql, values = 값을 받아오는 것
        pool.query(excuteSql,values,(err,results)=>{  // err: 오류 | results : 실행한 결과
            //실제로 실행한 결과를 반환 (비동기 작업이라 promise 방식으로 진행)
            if(err){
                console.log(err);
                reject({err}); 
            }else{
                resolve(results);
            }
        });
    }); 
};



// 모듈을 외부에 실행하도록 해주는 부분 
module.exports = {
    query
};