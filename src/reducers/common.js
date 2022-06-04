import * as types from '../actions/ActionTypes';

const INITIAL_STATE = {
  dataSignUp: {},
  categoriesSlt: []
};

const common = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SAVE_SIGN_UP_DATA:
      return {
        ...state,
        dataSignUp: action.dataSignUp
      }
    case types.SAVE_LIST_CATEGORIES_SELECTED:
      return {
        ...state,
        categoriesSlt: action.categoriesSlt
      }
    default:
      return state;
  }
};

export default common;
