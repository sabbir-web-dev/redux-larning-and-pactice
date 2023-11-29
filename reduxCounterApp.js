const { createStore } = require('redux');


const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESED = "RESED";


const counter = {
  count : 0
}

const incrementAction = () =>{
  return{
    type: INCREMENT
  }
}

const decrementAcrion = () => {
  return{
    type: DECREMENT
  }
}

const resedAction = () => {
  return{
    type: RESED
  }
}

const reducer = (state = counter, action) => {
  switch (action.type) {
    case INCREMENT:
      return{
        ...state,
        count: state.count + 1
      }
    case DECREMENT:
      return{
        ...state,
        count: state.count - 1
      }
    case RESED:
      return{
        ...state,
        count: state.count = 0
      }

  
    default:
     return state;
  }
}

const store = createStore(reducer);

store.subscribe(()=>{
  console.log(store.getState());
});



store.dispatch(incrementAction());
store.dispatch(decrementAcrion());
store.dispatch(resedAction());
