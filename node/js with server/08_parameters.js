
//1) Default parameter 
function say(message){
    if (message != undefined){
        console.log(message);
    }else{
        console.log("매개변수가 넘어 오지 않습니다.");
    }
}
say('Hello!');
say();

// message 가 값이 없는 경우 '매개변수가 넘어 오지 않습니다' 가 들어가는 기본 값(Default parameter)으로 설정해준다.
function printMsg(message='매개변수가 넘어오지 않습니다.'){
    console.log(message);
}

printMsg('Hello!');
printMsg();

// 2) Rest parameter : 함수를 기반으로 실행 시 몇개의 parameter을 사용할지 모를 때 사용 | 계산을 기반으로 하는 처리에 자주 사용
// 마지막부분의 매개변수 부분 ...rests (추가적으로 들어올지 안올지 모르는 경우) 
const plus = function(x, y, ...rests){ 
    let result = x + y;

    for (let rest of rests){
        result += rest;
    }
    return result;
}

console.log(plus(1,2)); // 3 
console.log(plus(1,2,3,4,5)); // 15 
console.log(plus(1,2,3,4,5,6,7,8,9,10)); // 55