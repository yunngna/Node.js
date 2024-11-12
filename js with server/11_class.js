//11_class.js


// 생성자 함수
function User(name,age,city){
    //필드 
    this.name = name;
    this.age = age;
    this.city = city;
    //메소드
    this.getInfo= ()=>{
        return `${this.name},${this.age},${this.city}`;
    }
} 

let hong = new User("Hong",30,"Daegu");
console.log(hong.getInfo());

let kim = new User("Kim",25,"Jeju");
console.log(kim.getInfo());

//class 문법 
class Emp { // 클래스 이름과 함께 선언
    constructor(id,name,dept){
        // 해당 클래스가 가지는 필드 등록 (생성자)
        //자바스크립트는 접근 지시자가 없기 때문에 private으로 접근 을 제한 하기 위해서 _을 사용해서 나타낸다 (consttuctor로 선언 되는 경우 _ 을 사용해서 선언)
        // ( _로 시작하는 대상들은 모두 숨겨진 속성값이며 직접적인 접근은 하지 않는 것 + get set을 활용해서 접근한다. )
        this._id = id;
        this._name = name;
        this._dept = dept;
    }
    // get 와 id 사이에는 공백이 있다. 그래서 메소드 취급 하지 않는다.
    // 직접 데이터 값에 접근을 하는 게 아니라 접근 권한을 체크하는 것(접근제어자) 
    //  _을 사용하지 않고 그냥 id로 가짜 접근자(필드)를 만들어 준다. 실제로 값을 변경을 막을 수 없기 때문에 readonly로 사용할 지 값을 변경을 허용할지를 get,set을 활용한 가짜 필드를 만들어서 제한 둔다. 
    get id(){
        return this._id;
    }

    set name(name){
        this._name = name;
    }

    get name(){
        return this._name;
    }

    setDept(dept){
        this._dept = dept;
    }

    getDept(){
        return this._dept;
    }
}

// 인스턴스 생성 
let kang = new Emp(100,"Kang","Sales");
kang.id = 200; // 값이 변경 되지 않는 이유는 get만 있고 set이 없기 때문에 내부에서 변경할 권한을 가지지 못한다.
kang.name = "King"; // 반면 get, set 둘 다 있는 name 은 값이 변경이 된다.
kang.setDept("Marketing");
console.log(kang);