import { createSlice } from '@reduxjs/toolkit';

const uiReducer = createSlice({
  name: 'ui',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading(state, { payload: { isLoading } }) {
      return {
        ...state,
        isLoading,
      };
    },
  },
});

export const { setLoading } = uiReducer.actions;
export default uiReducer.reducer;
