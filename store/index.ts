import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

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

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useModalState = () =>
  useSelector<RootState, RootState['modal']>((state) => state.modal);
export const useAuthState = () =>
  useSelector<RootState, RootState['auth']>((state) => state.auth);
export const useUiState = () =>
  useSelector<RootState, RootState['ui']>((state) => state.ui);
