//const.js const 는 상수 선언시 많이 사용 
const user = {
    "id" : "Hong",
    "age" : 25
};

user.id = "Kang";
user.age = 20;
user.ssn = "981015"; // 객체 값을 등록, 변경은 가능하다. 

user = {}; // 객체 자체를 바꾸는 것은 불가능 하다. 

console.log(user);