//08_parameters.js
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

// 2) Rest parameter