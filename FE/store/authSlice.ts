import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postLoginApi, getUserInfo } from '@repository/baseRepository';
import { NextRouter } from 'next/router';
import { saveItem, removeItem } from '@utils/storage';
import { setLoading } from '@store';

interface AuthState {
  userId: string;
  name: string;
  position: string;
  department: string;
}

const initialState: AuthState = {
  userId: '',
  name: '',
  position: '',
  department: '',
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(
      state,
      {
        payload: { userId, name, position, department },
      }: PayloadAction<AuthState>,
    ) {
      state.userId = userId;
      state.name = name;
      state.position = position;
      state.department = department;
    },
  },
});

export const { setUser } = authReducer.actions;
export default authReducer.reducer;

// TODO: 추후 dispatch 타입 변경
export const setLogin =
  (param: object, router: NextRouter) => async (dispatch: any) => {
    dispatch(setLoading({ isLoading: true }));
    try {
      const {
        data: { name, accessToken },
      } = await postLoginApi(param);

      saveItem('accessToken', accessToken);

      router.push('/main');
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  };

export const setUserInfo = () => async (dispatch: any) => {
  dispatch(setLoading({ isLoading: true }));
  try {
    const {
      data: { user_id: userId, name, position, department },
    } = await getUserInfo();

    dispatch(setUser({ userId, name, position, department }));
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setLoading({ isLoading: false }));
  }
};

export const setLogout = () => () => {
  setUser({ userId: '', name: '', position: '', department: '' });
  removeItem('accessToken');
};
