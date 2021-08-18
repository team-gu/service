import { createSlice } from '@reduxjs/toolkit';
import {
  postLoginApi,
  getUserInfo,
  getLogout,
} from '@repository/baseRepository';
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
  projectCodes: number[];
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
  introduce:
    'https://i5a202.p.ssafy.io:8080/api/file/display?url=profile/c21f969b5f03d33d43e04f8f136e7682.png',
  major: 0,
  name: '',
  projects: [],
  projectCodes: [101],
  role: 0,
  skills: [],
  studentNumber: '',
  userClass: null,
  wishPositionCode: '',
  wishTrack: [],
};

const ROLE_SUB_ADMIN_CODE = 3;
const ROLE_ADMIN_CODE = 4;

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    user: initialState,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setProjects(state, action) {
      state.user = {
        ...state.user,
        projects: action.payload,
      };
    },
    setAwards(state, action) {
      state.user = {
        ...state.user,
        awards: action.payload,
      };
    },
    setUserDetail(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser, setProjects, setAwards, setUserDetail } =
  authReducer.actions;
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

      if (
        data.userInfo.role === ROLE_SUB_ADMIN_CODE ||
        data.userInfo.role === ROLE_ADMIN_CODE
      ) {
        router.push('/admin');
      } else {
        data.userInfo.introduce === ''
          ? router.push('/userdetail')
          : router.push('/humanpool');
      }
    } catch (error) {
      console.error(error);
      return error.response;
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

export const setLogout =
  (router: NextRouter) => async (dispatch: AppDispatch) => {
    dispatch(setUser(initialState));

    await getLogout();
    removeItem('accessToken');
    removeItem('refreshToken');

    router.push('/');
    router.reload();
  };
