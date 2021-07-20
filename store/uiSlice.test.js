import uiSlice, { setLoading } from './uiSlice';

describe('uiSlice에서', () => {
  context('각 프로퍼티가', () => {
    it('setLoading를 사용해 isLoading을 수정할 수 있다', () => {
      const initialState = {
        isLoading: false,
      };

      const state = uiSlice(
        initialState,
        setLoading({
          isLoading: false,
        }),
      );

      expect(state.isLoading).toEqual(false);
    });
  });
});
