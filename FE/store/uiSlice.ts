import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  isChatOpen: boolean;
}

const initialState: UIState = {
  isLoading: false,
  isChatOpen: false,
};

const uiReducer = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, { payload: { isLoading } }) {
      return {
        ...state,
        isLoading,
      };
    },
    setChatOpen(state, { payload: { isChatOpen } }) {
      return {
        ...state,
        isChatOpen,
      };
    },
  },
});

export const { setLoading, setChatOpen } = uiReducer.actions;
export default uiReducer.reducer;
