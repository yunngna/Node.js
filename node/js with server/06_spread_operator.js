//06_spread_operator.js
// 펼침 연산자 : Spread Operator = 분해  
// 배열, 문자 가능 하다. | 모두다 펼쳐서 나온다 (몇개만 빼는 것은 불가하다.)

//배열 
let arr1 = [4,5,6];
let arr2 = [1,2,3];
// arr3에 arr1 + arr2 합치는 방법 [기존]
let arr3 = [];
arr1.forEach(val => arr3.push(val));
arr2.forEach(val => arr3.push(val));

console.log(arr3);


// 펼침 연산자 사용 
let newArr = [...arr1, ...arr2];
//            4,5,6,   1,2,3 
console.log(newArr);




// 문자 (문자를 각각 쪼개져서 개별 배열로 들어간다.)
let str = "CD";
let strAry = [...str];
console.log(strAry);
console.log(str[0]); // 문자열을 배열의 index로 접근해 나타날 수 있다. 