const {createStore, combineReducers} = require("redux");

// product type 
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCT = "GET_PRODUCT";

//card type
const GET_CARD= "GET_CARD";
const ADD_CARD= "ADD_CARD";

// initial-product 
const initialProduct = {
  products : ["Tea","Sugur"],
  itemCount: 2
}

// initial-card 
const initialCards = {
  cards : ["Tea"],
  itemCount: 1
}

// card action 
const addProduct = (value) => {
  return{
    type: ADD_PRODUCT,
    payload : value
  }
}

// card action 
const addCard = (value) => {
  return{
    type: ADD_CARD,
    payload : value
  }
}

// get product
const getProduct = () => {
  return{
    type : GET_PRODUCT
  }
}

// get card
const getCard = () => {
  return{
    type : GET_CARD
  }
}

// product reducer
const productReducer = (state = initialProduct , action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return{
        ...state
      }
    case ADD_PRODUCT:
      return{
        ...state,
        products : [...state.products, action.payload],
        itemCount: state.itemCount + 1
      }  
    default:
      return state;
  }
}

// card reducer
const cardReducer = (state = initialCards , action) => {
  switch (action.type) {
    case GET_CARD:
      return{
        ...state
      }      
    case ADD_CARD: 
    return{
      ...state,
      cards : [...state.cards, action.payload],
      itemCount:state.itemCount + 1
    }
  
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  productK: productReducer,
  cardR: cardReducer
});

const store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState()));

store.dispatch(getProduct());
store.dispatch(addProduct("Milk"));

store.dispatch(getCard());
store.dispatch(addCard("Sugar"));
