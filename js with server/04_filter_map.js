//04_filter_map.js
//기본타입, 참조타입의 차이 
let persons = [
    {
        name : "유재석",
        point : 78,
        city : "서울"
    },
    {
        name : "김종국",
        point : 92,
        city : "서울"
    },
    {
        name : "양세찬",
        point : 76,
        city : "제주"
    },
    {
        name : "하하",
        point : 81,
        city : "서울"
    }
];

//1)filter : 원본배열이 가지는 데이터 타입과 같음 (숫자,객체,문자) (기존의 값을 그대로 출력 = where 과 가장 비슷 (선별)) , 배열의 크기가 줄어들 가능성이 있음 (why? true/false로 미통과(false) 되면 줄어들수 있음)
//점수가 80 점 이상 인 사람만 가져오기
let scores= persons.filter(function(val,idx){
                return val.point > 80; //boolean 타입 return 
            });
    console.log(scores);

//2) map : 원본배열이 가지는 데이터 타입과 다를 수 있음(기존의 값을 추가하거나 뺄때 사용), 배열의 크기는 동일 
let newList = persons.map(function(val,idx){ 
// 콜백 함수 : 함수 내부에서 호출하는 형태의 함수 (함수의 결과가 아닌 함수가 가지고 있는 그 자체가 넘어가는 것)

                return { // 새로운 객체배열를 생성할 경우 return 시 새로운 객체를 형성 해야 한다. 
                   
                    // 즉 [val.no = (idx+1)*100; 
                    //     return val; 이렇게 하면 원본 데이터가 수정되며 두번 호출 된다.]
                    //참조타입(주소값) 은 얕은 복사와 깊은 복사로 두가지 종류가 있다. 만약에 새로운 배열을 추가 하고 싶은 경우 새로운 배열을 선언을 하고 사용해야 한다.
                   
                    no : ((idx+1)*100),
                    name : val.name,
                    city : val.city
                }; // 새로운 배열이 가지는 값 
            });
console.log(newList);