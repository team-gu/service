import { displayModal } from '@store';
import { AxiosError } from 'axios';
import { MODALS } from './constants';

export const get = (key: string) => (obj: object) => obj[key];

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const myAlert = (dispatch: any, content: string) => {
  dispatch(
    displayModal({
      modalName: MODALS.ALERT_MODAL,
      content: content,
    }),
  );
};

export const errorAlert = (dispatch: any, err: AxiosError) => {
  console.error("Response:", err.response);
  myAlert(dispatch, '에러가 발생했습니다. 다시 시도해주세요.');
};
