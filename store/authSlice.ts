import { createSlice } from '@reduxjs/toolkit';
import { postLoginApi } from '@repository/baseRepository';
import { NextRouter } from 'next/router';
import { saveItem } from '@utils/storage';
const authReducer = createSlice({
  name: 'auth',
  initialState: {
    name: '',
  },
  reducers: {
    setName(state, { payload: { name } }) {
      return {
        ...state,
        name,
      };
    },
  },
});

export const { setName } = authReducer.actions;
export default authReducer.reducer;

// TODO: 추후 dispatch 타입 변경
export const setLogin =
  (param: object, router: NextRouter) => async (dispatch: any) => {
    try {
      const {
        data: { name, accessToken },
      } = await postLoginApi(param);

      saveItem('accessToken', accessToken);

      dispatch(setName({ name }));

      router.push('/main');
    } catch (error) {
      console.error(error);
    }
  };
