//05_reduce.js (누적값을 반환)
let points = [40,100,1,5,25,10];

let sum = points.reduce((total,currentVal)=>{
    // total = 내앞에서 작업한 결과값, currentVal = 현재 배열에서 가져온 값 
    
    return total + currentVal; // 첫번째 0 + 40  두번째 40 + 100 세번째 140 + 1  ... 마지막 total + 10 => sum 으로 넘어간다.   

}, 0);
// 0 = initial value 초기값 (즉, total을 0부터 시작하겠다 의미)

console.log(sum);

// reduce 와 for 문은 동일하다.
let total = 0;
for (let point of points){
    total = total + point ;
}
console.log(total);

