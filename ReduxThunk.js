const { default: axios } = require("axios");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

// constens
const TODO_SUCCES = "TODO_SUCCS";
const TODO_FAILD = "TODO_FAILD";
const TODO_REQUEST = "TODO_REQUEST";
const TODO_URL = "https:jsonplaceholder.typicode.com/todos";

// state
const initialTodoState = {
  todos: [],
  isLodding: true,
  error: null,
};

// action
const todoRequest = () => {
  return {
    type: TODO_REQUEST,
  };
};
const todoSucces = (todos) => {
  return {
    type: TODO_SUCCES,
    payload: todos,
  };
};
const todoFaild = (error) => {
  return {
    type: TODO_FAILD,
    payload: error,
  };
};

// reducer

const todosReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case TODO_REQUEST:
      return {
        ...state,
        isLodding: true,
      };
    case TODO_SUCCES:
      return {
        isLodding: false,
        todos: [...state.todos, action.payload],
        error: null,
      };
    case TODO_FAILD:
      return {
        ...state,
        isLodding: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// fetch Data
const fetchData = () => {
  return (dispatch) => {
    dispatch(todoRequest());
    axios
      .get(TODO_URL)
      .then((res) => {
        const todos = res.data;
        const titles = todos.map((todo) => todo.title);
        dispatch(todoSucces(titles));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(todoFaild(errorMessage));
      });
  };
};

// store

const store = createStore(todosReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchData());
