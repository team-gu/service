import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MODALS } from '@utils/constants';

interface ModalState {
  // TODO: 타입 정의
  [MODALS.ALERT_MODAL]: boolean;
  content?: string;
}

const initialState: ModalState = {
  [MODALS.ALERT_MODAL]: false,
  content: '',
};

const modalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    displayModal(
      state,
      {
        payload: { modalName, content },
      }: PayloadAction<{ modalName: string; content: string }>,
    ) {
      // TODO: 타입 정의
      state[modalName] = true;
      state.content = content;
    },
    removeModal(
      state,
      { payload: { modalName } }: PayloadAction<{ modalName: string }>,
    ) {
      state[modalName] = false;
      state.content = '';
    },
    setContent(
      state,
      { payload: { content } }: PayloadAction<{ content: string }>,
    ) {
      state.content = content;
    },
  },
});

export const { displayModal, removeModal, setContent } = modalReducer.actions;
export default modalReducer.reducer;
