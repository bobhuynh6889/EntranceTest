import * as types from './ActionTypes';

export function saveDataSignUp(dataSignUp) {
  return {
    type: types.SAVE_SIGN_UP_DATA,
    dataSignUp,
  };
}

export function saveLSCategoriesSelected(categoriesSlt) {
  return {
    type: types.SAVE_LIST_CATEGORIES_SELECTED,
    categoriesSlt,
  };
}