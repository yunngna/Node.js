//sql.js (sql 모아둘 파일) = mapper.xml 와 비슷  [sql 등록]
//`` 백팁을 사용해야 줄 바꿈이 가능 
//실행 순서 (3)

//전체조회
const customerList = 
`SELECT id 
        ,name
        ,email
        ,phone
        ,address
FROM customers
ORDER BY id`;

//단건조회
const customerInfo = 
`SELECT id 
        ,name
        ,email
        ,phone
        ,address
FROM customers
WHERE id = ?`;

//추가
const customerInsert=
`INSERT INTO customers
SET ?`;  // 값을 넣을 때 동적으로 처리할 방법이 없다 (mybatis에서 if 절 같은 조건을 사용 못함) 그래서 set ? 으로 넣어준다.
// SET 의 경우 collum 명과 값이 필요한데 객체{} 타입으로 표현 {'name'='Hong' , 'phone' = '010-4578-4512'}
//why? collum 명과 값은 하나로 무조건 묶어서 다녀야 하는데 이런경우 객체 타입으로 가져와야 한 덩어리로 인식 
// 그래서 set 절의 ?은 객체 타입으로 값을 넣어줘야 한다.

//수정
const customerUpdate=
`UPDATE customers
SET ? 
WHERE id =?`; // set=? = 객체 , id = 단일값 
// 하나의 쿼리에 객체, 단일값 이렇게 두개(? 개수) 가 들어오는 경우는 배열[]로 들어와야 한다. 
/*[{'name'='Hong' , 'phone' = '010-4578-4512'},
             1  ]      */

//삭제
const customerDelete=
`DELETE FROM customers
WHERE id =?`;

/*
체크 사항 
1) ? 갯수 
1-1 ) 1개 : 단일값
1-2 ) 2개 이상 : 배열 

2) ? 앞의 컬럼의 유무  = 명확하게 어느 collum에 들어갈지 정해져 있나 아닌가 
2-1) 명확하게 collum 이 없는 경우(e.g set ?) = 객체 
    (why? 무슨 기본데이터 타입이 들어가야 할지 못 정하는 경우 이기 때문에 객체로 들어간다.)
2-2) 명확하게 collum 이 있는 경우 = 기본 데이터 타입(숫자,문자,날짜 등)
*/

//외부에서  쿼리문 시행 한 것을 사용 하게 해주는 부분 
module.exports = {
        customerList
        ,customerInfo
        ,customerInsert
        ,customerUpdate
        ,customerDelete
    };
