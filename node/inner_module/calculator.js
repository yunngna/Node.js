//calculator.js
//간단한 사칙연산 기능을 가진 모듈(라이브러리)
// 모듈 : 외부에서는 노출하고자 하는 값만 노출되고 접근이 불가능 하게 자신만의 공간을 가지는 것 을 말한다.( 범위의 차이)
const defaultNum = 1;

function add(x,y){
    return x + y;
}

function minus(x,y){
    return x - y;
}

function multi(x,y){
    return x * y;
}

function divide(x,y){
    return x / y;
}

// 모듈을 모아 하나로 처리하는 방법 (모듈을 외부에서 사용 가능하게 open)
module.exports = { // module.exports 는 {객체 값}을 가진다. 
    add, // =  "add" : add  =>  key 와 value로 구성 되어 있는데 해당 두 값의 이름이 동일한 경우 한번만 작성한다.
    "mul" : multi  //  별도로 이름 지정시 따로 key value값 적어줘야 한다.
};
