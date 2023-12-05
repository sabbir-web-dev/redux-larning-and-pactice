const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

// constent
const TODOS_URL= "https://jsonplaceholder.typicode.com/todos";
const TODOS_REQUEST= "TODOS_REQUEST";
const TODOS_SUCCESS= "TODOS_SUCCESS";
const TODOS_FAILD= "TODOS_FAILD";


// inisial state 
const inisialTodoState  = {
  isLodding : true,
  todos:null,
  error:false
}

// action 
const todosRequest = () => {
  return{
    type:TODOS_REQUEST
  }
}

const todosSuccess = (todos) => {
  return{
    type: TODOS_SUCCESS,
    payload:todos
  }
}

const todosFaild = (error) => {
  return{
    type:TODOS_FAILD,
    payload:error
  }
}

// reducer 
const todosReducer = (state = inisialTodoState, action) => {
  switch (action.type) {
    case TODOS_REQUEST:
      return{
        ...state,
        isLodding: state.isLodding = true
      }
    case TODOS_SUCCESS:
      return{
        ...state,
        isLodding: false,
        todos: action.payload,
      }
    case TODOS_FAILD:
      return{
        ...state,
        isLodding:false,
        error: action.payload
      }
    default:
      return state;
  }
}

// fetch Todos 
const fetchTodos = () => {
  return (dispatch) =>{
    dispatch(todosRequest());
    axios
      .get(TODOS_URL)
      .then(res=> {
        const todos = res.data;
        dispatch(todosSuccess(todos))
      })
      .catch(err => dispatch(todosFaild(err.message)))
  }
}


const store = createStore(todosReducer, applyMiddleware(thunk))
store.subscribe(() => {
  console.log(store.getState());
})

store.dispatch(fetchTodos())