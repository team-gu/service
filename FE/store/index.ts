import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import modalReducer, {
  displayModal,
  removeModal,
  setContent,
} from './modalSlice';
import authReducer, {
  setUser,
  setProjects,
  setAwards,
  setLogin,
  setUserInfo,
  setLogout,
} from './authSlice';
import uiReducer, { setLoading, setChatOpen } from './uiSlice';
import stickyReducer, { setFixed, setOffset } from './stickySlice';

const reducers = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  ui: uiReducer,
  sticky: stickyReducer,
});

const store = configureStore({ reducer: reducers });

export default store;
export {
  displayModal,
  removeModal,
  setContent,
  setUser,
  setProjects,
  setAwards,
  setLogin,
  setUserInfo,
  setLogout,
  setLoading,
  setChatOpen,
  setFixed,
  setOffset,
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
export const useStickyState = () =>
  useSelector<RootState, RootState['sticky']>((state) => state.sticky);
