import authReducer, {
  setUser,
  // TODO: 아래 3가지에 대해 테스트 작성
  // setLogin,
  // setUserInfo,
  // setLogout,
} from './authSlice';

describe('authReducer에서', () => {
  context('각 프로퍼티가', () => {
    it('setUser를 사용해 userId, name, position, department를 수정할 수 있다', () => {
      const initialState = {
        userId: '',
        name: '',
        position: '',
        department: '',
      };

      const state = authReducer(
        initialState,
        setUser({
          userId: 'dummy',
          name: 'dummy',
          position: 'dummy',
          department: 'dummy',
        }),
      );

      expect(state.userId).toEqual('dummy');
      expect(state.name).toEqual('dummy');
      expect(state.position).toEqual('dummy');
      expect(state.department).toEqual('dummy');
    });
  });
});
