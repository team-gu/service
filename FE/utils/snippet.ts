import { displayModal, useAppDispatch } from "@store";
import { AxiosError } from "axios";
import { MODALS } from "./constants";

export const get = (key: string) => (obj: object) => obj[key];

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const dispatch = useAppDispatch();
export const myAlert = (content: string) => {
  dispatch(
    displayModal({
      modalName: MODALS.ALERT_MODAL,
      content: content,
    }),
  );
};

export const errorAlert = (err: AxiosError) => {
  myAlert(
    'ERROR' +
      (err.response?.data ? ': ' + JSON.stringify(err.response.data) : ''),
  );
};
