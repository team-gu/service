import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  isChatOpen: boolean;
  passedOpponentId: number;
}

const initialState: UIState = {
  isLoading: false,
  isChatOpen: false,
  passedOpponentId: 0,
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
    setChatOpen(state, { payload: { isChatOpen, passedOpponentId } }) {
      return {
        ...state,
        isChatOpen,
        passedOpponentId,
      };
    },
  },
});

export const { setLoading, setChatOpen } = uiReducer.actions;
export default uiReducer.reducer;
