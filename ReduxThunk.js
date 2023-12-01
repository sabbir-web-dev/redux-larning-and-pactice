const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

// constenst
const TODOS_REQUEST = "TODOS_REQUEST";
const TODOS_SUCCESS = "TODOS_SUCCESS";
const TODOS_FAILD = "TODOS_FAILD";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

// state
const initialTodosState = {
  todos: [],
  isLodding: true,
  error: null,
};

// action
const todosRequest = () => {
  return {
    type: TODOS_REQUEST,
  };
};
const todosSuccess = (todos) => {
  return {
    type: TODOS_SUCCESS,
    payload: todos,
  };
};
const todosFaild = (error) => {
  return {
    type: TODOS_FAILD,
    payload: error,
  };
};

// reducer
const todosReducer = (state = initialTodosState, action) => {
  switch (action.type) {
    case TODOS_REQUEST:
      return {
        ...state,
        isLodding: true,
      };
    case TODOS_SUCCESS:
      return {
        isLodding: false,
        todos: [...state.todos, action.payload],
        error: null,
      };
    case TODOS_FAILD:
      return {
        ...state,
        isLodding: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// fetch data
const fetchTodos = () => {
  return (dispatch) => {
    dispatch(todosRequest());
    axios
      .get(TODOS_URL)
      .then((res) => {
        const todos = res.data;
        const title = todos.map((todo) => todo.title);
        dispatch(todosSuccess(title));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(todosFaild(errorMessage));
      });
  };
};

// store
const store = createStore(todosReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchTodos());
