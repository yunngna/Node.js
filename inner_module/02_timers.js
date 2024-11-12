//02_timers.js
const timeout = setTimeout(()=>{
    let today = new Date();

    let year = today.getFullYear();
    // '0' 의 의미 = 값이 1자리여도 두자리로 출력되게 하려고 넣는다
    let month = ('0' + (today.getMonth()+1)).slice(-2);
    let day = ('0' + today.getDay()).slice(-2);
    // slice 는 문자열을 자르는 것으로 e.g 01 -> 01  , 010 -> 10 으로 잘라준다.

    let hour = ('0'+ today.getHours()).slice(-2);
    let minute = ('0' + today.getMinutes()).slice(-2); 

    let current = `${year}년 ${month}월 ${day}일 ${hour}시 ${minute}분`
    console.log(current);
}, 2000);

let count = 0;
// setInterval은 정해진 기간동안 무한정 반복 (서버의 경우 무한정 반복(무한루프)하게 된다.) (ctrl + c 강제 종료 (터미널))
// setInterval 종료 = clearInterval(해당되는 변수/id 값)
// 그래서 보통 setInterval 보다는 작업 스케줄러를 사용한다. 
const interval = setInterval(() => {
    console.log('interval %d',count++);
    if (count == 3){ // 3번 작업후 종료
        clearInterval(interval);
    }
}, 1000);

//immediate 은 시간을 지정하지 않는다. 진행 되는 흐름 무시하고 당장 실행 원할 때 사용 (프로세스가 끝나는 시점(= 코드의 마지막 시점)에 실행)
const immediate = setImmediate(()=>{
    console.log('즉시 실행 요청'); 
});

console.log('마지막 코드');