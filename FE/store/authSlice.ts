import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { postLoginApi, getUserInfo } from '@repository/baseRepository';
import { AppDispatch } from '@store';
import { NextRouter } from 'next/router';
import { saveItem, removeItem } from '@utils/storage';
import { setLoading } from '@store';

interface AuthState {
  awards: object[];
  email: string;
  id: number;
  img: string;
  introduce: string;
  major: number;
  name: string;
  projects: object[];
  role: number;
  skills: string[];
  studentNumber: string;
  userClass: number | null;
  wishPositionCode: string;
  wishTrack: string[];
}

const initialState: AuthState = {
  awards: [],
  email: '',
  id: 0,
  img: '',
  introduce: '',
  major: 0,
  name: '',
  projects: [],
  role: 0,
  skills: [],
  studentNumber: '',
  userClass: null,
  wishPositionCode: '',
  wishTrack: [],
};

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    user: initialState,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authReducer.actions;
export default authReducer.reducer;

export const setLogin =
  (param: object, router: NextRouter) => async (dispatch: AppDispatch) => {
    dispatch(setLoading({ isLoading: true }));
    try {
      const { data } = await postLoginApi(param);
      saveItem('accessToken', data.accessToken);
      // TODO: 리프레시 토큰 사용이 후순위로 밀려서 후에 이 부분에 대한 수정과 사용이 필요합니다.
      // saveItem('refreshToken', data.refreshToken);
      dispatch(setUser(data.userInfo));
      data.userInfo.introduce === ''
        ? router.push('/userdetail')
        : router.push('/humanpool');
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  };

export const setUserInfo = () => async (dispatch: AppDispatch) => {
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

export const setLogout = () => (dispatch: AppDispatch) => {
  dispatch(setUser(initialState));
  removeItem('accessToken');
  removeItem('refreshToken');
};
