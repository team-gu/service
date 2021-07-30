import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { postLoginApi, getUserInfo } from '@repository/baseRepository';
import { AppDispatch } from '@store';
import { NextRouter } from 'next/router';
import { saveItem, removeItem } from '@utils/storage';
import { setLoading } from '@store';

interface AuthState {
  chat: string[];
  conference: string[];
  email: string;
  fromuserFollows: string[];
  id: number;
  introduce: string;
  name: string;
  notices: string[];
  quizScores: number[];
  quizs: string[];
  role: number;
  skills: string[];
  studentNumber: number;
  teams: number[];
  toUserFollows: string[];
  userAward: string[];
  userChat: string[];
  userClass: number[];
  userFile: string;
  userProject: string[];
  userTeams: string[];
  wishPosition: number;
  wishTracks: string[];
}

const initialState: AuthState = {
  chat: [],
  conference: [],
  email: '',
  fromuserFollows: [],
  id: 0,
  introduce: '',
  name: '',
  notices: [],
  quizScores: [],
  quizs: [],
  role: 0,
  skills: [],
  studentNumber: 0,
  teams: [],
  toUserFollows: [],
  userAward: [],
  userChat: [],
  userClass: [],
  userFile: '',
  userProject: [],
  userTeams: [],
  wishPosition: 0,
  wishTracks: [],
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
      saveItem('refreshToken', data.refreshToken);
      dispatch(setUser(data.userInfo));
      data.userInfo.name === '팀구'
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
