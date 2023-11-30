const { createStore, applyMiddleware } = require("redux");
const { default: logger } = require("redux-logger");

// state varible
const GET_ITEM = "GET_ITEM";
const ADD_ITEM = "ADD_ITEM";

// initial state
const initialState = {
  items: ["Pen", "Book"],
  itemCount: 2,
};

// action
const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};
const getItem = () => {
  return {
    type: GET_ITEM,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
      };
    case ADD_ITEM:
      return {
        ...state,
        cards: [...state.items, action.payload],
        itemCount: state.itemCount + 1,
      };

    default:
      return state;
  }
};

// store create
const store = createStore(reducer,applyMiddleware(logger));
store.subscribe(() => {
  console.log(store.getState());
});

// dispatch
store.dispatch(getItem());
store.dispatch(addItem("Penchel"));
