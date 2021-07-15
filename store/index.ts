import { configureStore, combineReducers } from '@reduxjs/toolkit';

import modalReducer, {
  displayModal,
  removeModal,
  setContent,
} from './modalSlice';
import authReducer, {
  setUser,
  setLogin,
  setUserInfo,
  setLogout,
} from './authSlice';
import uiReducer, { setLoading } from './uiSlice';

const reducers = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  ui: uiReducer,
});

const store = configureStore({ reducer: reducers });

export default store;
export {
  displayModal,
  removeModal,
  setContent,
  setUser,
  setLogin,
  setUserInfo,
  setLogout,
  setLoading,
};
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
