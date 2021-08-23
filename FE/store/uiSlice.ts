import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isLoading: boolean;
  isChatOpen: boolean;
  passedOpponentId: number;
  payload: {
    project?: string;
    studentNumber?: string;
    sort?: string;
    pageNum?: number;
    pageSize?: number;
    skills?: number[];
    region?: number[];
    track?: number[];
    position?: number[];
    isMajor?: number;  
  } 
}

const initialState: UIState = {
  isLoading: false,
  isChatOpen: false,
  passedOpponentId: 0,
  payload: {},
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
    setPayload(state, { payload }) {
      state.payload  = payload;
    }
  },
});

export const { setLoading, setChatOpen, setPayload } = uiReducer.actions;
export default uiReducer.reducer;
