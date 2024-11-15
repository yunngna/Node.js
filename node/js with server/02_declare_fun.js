//02_declare_fun.js
// 1) 함수 선언문 (가장 많이 사용) = 위에 선언 하기 보다는 밑에 선언 한다. (script방식) 
// : 이때 var와 비슷하다. 즉 함수 선언한 위치 상관 없이 어디서든지 함수 호출이 가능하다. + 함수 이름 중복이 허용된다. 
// 자바스크립트의 함수는 데이터 취급 
// 변수의 경우 값을 넣기 전에는 undefined로 초기화 되기 전을 나타내나, 함수 선언문의 경우 밑에서 호이스팅이 되어서 사용 한다. 

function plus (x, y){
    return (x+y);
}
/** 함수 호이스팅 
 * var plus = function(x,y,z){
    return (x + y + z);} */

//console.log(plus(1,2,3));

// 위의 plus 함수와 밑에 var 선언 한 plus 함수는 동일하다. (즉, 덮어쓰기가 가능하다. )
function plus (x, y, z){
    return (x + y + z);
}

var plus = function(x,y,z){
    return (x + y + z);
}

//console.log(plus(1,2,3)); 

// 2) 함수 표현식 (주로 let, const 방식으로 함수를 선언 )
// 함수를 수정 불가하게 만들 때 const방식을 사용한다. 그래서 제일 상단에 적으며 상단에 적어야 밑에서 사용이 가능하다.
const printMsg = function(keyword){
    return "result:" + keyword;
}

// 3) 화살표함수  => 일반적으로 익명 함수로 사용하며 콜백함수나 이벤트핸들러 함수로 많이 사용  [자바스크립트의 경우 () => {}] / [자바의 경우(람다식) ()->{}]

let array = [ 1, 2, 3, 4, 5];
array.forEach(val => console.log(val)); // 콜백 함수의 경우 화살표 함수 많이 사용 

array.forEach((val, idx, array)=>{
    let msg = `${idx} : ${val}, ${array}`; 
// `` = template literals (보여지는 형태 그대로 출력하겠다(공백도 유지) 라는 의미 단, 변수가 들어가야 하는 위치에는 ${}표시로 표시) 
// + : 문자 결합  
    console.log(msg);
});

const multi = (x,y) => x*y;
console.log(multi(10,5));