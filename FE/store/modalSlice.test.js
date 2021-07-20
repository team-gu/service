import { MODALS } from '@utils/constants';
import modalReducer, {
  displayModal,
  removeModal,
  setContent,
} from './modalSlice';

describe('modalReducer에서', () => {
  context('각 프로퍼티가', () => {
    it('displayModal 사용해 true, false 및 content를 변경할 수 있다', () => {
      const initialState = {
        [MODALS.ALERT_MODAL]: false,
        content: '',
      };

      const state = modalReducer(
        initialState,
        displayModal({
          modalName: MODALS.ALERT_MODAL,
          content: 'hello',
        }),
      );

      expect(state[MODALS.ALERT_MODAL]).toEqual(true);
      expect(state.content).toEqual('hello');
    });

    it('removeModal을 사용해 false로 변경 및 content를 삭제한다', () => {
      const initialState = {
        [MODALS.ALERT_MODAL]: true,
        content: 'hello',
      };
      const state = modalReducer(
        initialState,
        removeModal({
          modalName: MODALS.ALERT_MODAL,
        }),
      );

      expect(state[MODALS.ALERT_MODAL]).toEqual(false);
      expect(state.content).toEqual('');
    });
    it('setContent를 사용해 content를 변경할 수 있다', () => {
      const initialState = {
        [MODALS.ALERT_MODAL]: false,
        content: '',
      };

      const state = modalReducer(
        initialState,
        setContent({
          content: 'something',
        }),
      );

      expect(state.content).toEqual('something');
    });
  });
});
