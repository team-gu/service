import { configureStore, combineReducers } from '@reduxjs/toolkit';

import modalReducer, {
  displayModal,
  removeModal,
  setContent,
} from './modalSlice';
import authReducer, { setName, setLogin } from './authSlice';

const reducers = combineReducers({
  modal: modalReducer,
  auth: authReducer,
});

const store = configureStore({ reducer: reducers });

export default store;
export { displayModal, removeModal, setContent, setName, setLogin };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
