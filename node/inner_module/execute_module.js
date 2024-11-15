//execute_module.js

// require 로 불러와야 모듈로 인식한다.

//방법1 ) 모듈 불러오기 (모듈 전체 가져오기) 
const cal = require('./calculator.js'); // . 하나인경우 같은 폴더 내에서 찾기 | .. 인 경우 상위폴더 

// module exports로 내보낸 모듈만 사용 가능해서 add, mul만 사용 가능하다.
let result = cal.add(10,5);
let mulResult = cal.mul(5,4);

console.log("result:",result);
console.log("mulResult:",mulResult);

//방법2) 모듈 불러오기 (해당 모듈 중 하나만 가져오기) => 이런 경우 이름이 중복 되서 충돌이 날 수 있다. (갯수가 많이 않다면 당장 필요한것만 불러서 사용)
const {add} = require('./calculator.js');
const {mul} = require('./calculator.js');
result = add(20,50);
mulResult = mul(10,4);

console.log("result:",result);
console.log("mulResult:",mulResult);






