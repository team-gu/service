import { configureStore, combineReducers } from '@reduxjs/toolkit';

import modalReducer, {
  displayModal,
  removeModal,
  setContent,
} from './modalSlice';

const reducers = combineReducers({
  modal: modalReducer,
});

const store = configureStore({ reducer: reducers });

export default store;
export { displayModal, removeModal, setContent };
