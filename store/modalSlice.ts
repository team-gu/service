import { createSlice } from '@reduxjs/toolkit';
import { MODALS } from '@utils/constants';

const modalReducer = createSlice({
  name: 'modal',
  initialState: {
    [MODALS.ALERT_MODAL]: false,
    content: '',
  },
  reducers: {
    displayModal(state, { payload: { modalName, content } }) {
      return {
        ...state,
        [modalName]: true,
        content: content || '',
      };
    },
    removeModal(state, { payload: { modalName } }) {
      return {
        ...state,
        [modalName]: false,
        content: '',
      };
    },
    setContent(state, { payload: { content } }) {
      return {
        ...state,
        content,
      };
    },
  },
});

export const { displayModal, removeModal, setContent } = modalReducer.actions;
export default modalReducer.reducer;
