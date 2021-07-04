import { get } from './snippet';

test('react-redux useSelector 사용을 단순화하는 get의 동작이 올바르게 되는지 확인한다', () => {
  const state = {
    name: 'number',
  };

  const f = get('name');
  const g = get('age');

  expect(f(state)).toBe('number');
  expect(g(state)).toBeUndefined();
});
