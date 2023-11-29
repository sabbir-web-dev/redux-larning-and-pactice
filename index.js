
const {createStore} = require("redux");
const ADD_USER = "ADD_USER";

const users = {
  users: ["sabbir"],
  count: 1
}

const addUserAction = (value) => {
  return{
    type: ADD_USER,
    payload: value
  }
}

const usersReducer = (state = users, action) => {
  switch (action.type) {
    case ADD_USER:
      return{
        ...state,
        users : [...state.users,action.payload],
        count : state.count + 1
      }
  
    default:
    return  state;
  }
}

const store = createStore(usersReducer);
store.subscribe(()=>{
  console.log(store.getState())
})

store.dispatch(addUserAction("tamin"));
store.dispatch(addUserAction("mahfuj"));
