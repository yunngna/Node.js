//07_Destructruring.js

//1)object
let person = {
    firstName : "John",
    lastName : "Doe",
    age : 37,
    email: "john@gmail.com",
    country : "USA"
};

//{} = 객체 안에 값을 가져오겠다는 의미 (안의 값은 필드 명을 적어줘야 한다.) = 로컬변수선언 
let {lastName,email} = person; 
console.log(lastName);
console.log(email);

// 매개 변수 선언에서도 사용 가능하다. {} = 객체 안의 값을 가져오겠다.
function getFullName({firstName,lastName}){
    console.log(`${lastName},${firstName}`);
}
getFullName(person);



//2) Array (순서대로 들어간다)
let scores = [70,80,90];

// 배열 = [대괄호]
let [a, b, c] = scores;
// 70 -> a 로 80 -> b로 90 -> c로 해당 된다. 
// 만약 90 만 가져오려고 하면 가져올 방법 이 없다. 
// why?순서대로 들어오기 때문이다. let [a,b] 는 70,80 으로 무조건 순서대로 들어온다. 그러므로 밑에 처럼 그냥 하나를 골라 내는 방법을 선택해야 한다.
console.log(a);
console.log(b);
console.log(c);
