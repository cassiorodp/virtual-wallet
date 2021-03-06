import {
  COINS_LOADING,
  COINS_SUCCESS,
  COINS_FAIL,
  SPENT_SUCCESS,
  DELETE_ITEM,
  EDIT_ITEM,
  REPLACE_ITEM } from '../actions';

const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  editItem: false,
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case COINS_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case COINS_SUCCESS:
    return {
      ...state,
      isLoading: false,
      currencies: action.coins,
    };
  case COINS_FAIL:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  case SPENT_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.spent, id: state.expenses.length }],
      isLoading: false,
    };
  case DELETE_ITEM:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.itemId),
    };
  case EDIT_ITEM:
    return {
      ...state,
      selectedItem: state.expenses.find(({ id }) => id === action.selectedItem),
      editItem: action.editItem,
    };
  case REPLACE_ITEM:
    return {
      ...state,
      expenses: state.expenses
        .map((item) => (item.id === action.itemId ? action.updatedItem : item)),
      editItem: false,
    };
  default:
    return state;
  }
};

export default wallet;
