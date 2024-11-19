//index.js
// vuex가 관리하는 데이터 저장소 = store 
// vuex 는 공유데이터를 저장하면서 아무나 데이터를 수정하거나 가져 사용하지 못하게 해주는 것 (getter,setter가 있음)
//vuex 는 일회성이며 새로고침하면 데이터가 사라진다. (원래) => 그래서 새로고침을 해도 데이터가 유지되려면 별도의 라이브러리 추가 필요  

import {createStore} from 'vuex' // vuex저장소 불러와 createStore 저장소 생성 
import createPersistedState from 'vuex-persistedstate'; //vuex-persistedstate 추가

const store = createStore({
    // 데이터 정보 담는 공간 이며 네개 항목을 결정 해야 한다. 
    state(){ //vuex에서 관리하는 모든 데이터의 정의 
        return {
            //객체 타입으로 데이터를 등록
            cart : [
                {
                    product_id : 1,
                    product_name : "아이폰 거치대",
                    category : "A"
                }
            ],
            count : 0 
        }
    },
    getters : { // vues 에 저장된 변수 값을 확인(조회)하고자 할때 사용  [함수 형태로 저장]
        cartCount : (state)=>{ // state = 저장한 데이터 
            return state.cart.length;
        }
    }, 
    
    //setter 역할  [값 변경] == mutations (임의 변경이 아닌 정해진 방식으로 값을 변경하기 위해 함수 사용 
    // why? db의 무결성을 지키기 위해서 )
    mutations : {// 실제 state에 등록된 값을 변경, 단 동기식으로 진행 (변경한 history를 기록해서 추적할 수 있다.)
        increment(state){ // state = 저장소에 저장된 데이터 
            state.count++;
        },
        addProduct(state,info){ // info = 등록,변경 시의 데이터 값 
            state.cart.push(info);
        }
    },
    actions : { // 동기식으로 진행하는 mutations을 여러개 실행 하거나 비동기로 진행 
        addProduct(context,info){ // context = 저장소 전체 
            setTimeout(()=>{
                // mutations에 등록된 함수 호출 시 commit 사용  [변경사항 업데이트 = commit] | actions안의 함수 호출 시에는 dispatch 사용 
                context.commit('addProduct',info); // mutations 에 등록되어 있는 함수 호출 
            },1000);
        }
    },
    plugins : [ //PersistedState  는 plugins으로 저장
      createPersistedState({
        path : ['cart']
      })
    ]
});

//외부로 내보내기 
export default store;