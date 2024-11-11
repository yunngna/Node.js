//03_sort.js

let fruits = ["Banana", "Orange" , "Apple" ,"Mango"];
fruits.sort();
console.log(fruits); // "Apple","Banana","Mango","Orange"

let points = [40,100,1,5,25,10];
points.sort();
console.log(points); // 예상 1,5,10,25,40,100 | BUT 해당 경우 1,10,100,25,40,5 로 오름차순 이 나옴 그래서 sort의 경우 문자에 적합함 

// sort 숫자 정렬시 사용 (양수인지 음수인지 따라 위치 변경, 음수 인 경우에만 값이 변경 ) [숫자 뿐만 아니라 객체의 경우에도 사용 가능]
//숫자 정렬
points.sort(function (a,b){
    return a - b;
})
console.log(points);

//객체 정렬 (eid, name 를 기준으로 정렬 가능 그러므로 sort적용시 eid 와 name중 어느것을 기준으로 정렬해야 하는지 모를 수 있다.)
let emps = [
    { eid : 200,
     name : "Edward"        
    },
    { eid : 100,
    name : "King"        
    },
    { eid : 300,
    name : "Han"        
    }
];
//eid값으로 비교 
emps.sort((pre,next)=>{
    return pre.eid - next.eid;
});
console.log(emps);


