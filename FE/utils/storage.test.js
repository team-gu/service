import { saveItem, loadItem, removeItem } from './storage';

describe('storage', () => {
  jest.spyOn(Object.getPrototypeOf(window.sessionStorage), 'setItem');

  beforeEach(() => {
    Object.getPrototypeOf(window.sessionStorage).setItem = jest.fn();
    Object.getPrototypeOf(window.sessionStorage).getItem = jest.fn();
    Object.getPrototypeOf(window.sessionStorage).removeItem = jest.fn();
  });

  describe('saveItem', () => {
    it('calls sessionStorage setItem', () => {
      saveItem('key', 'value');

      expect(sessionStorage.setItem).toBeCalledWith('key', 'value');
    });
  });

  describe('loadItem', () => {
    it('calls sessionStorage getItem', () => {
      loadItem('key');

      expect(sessionStorage.getItem).toBeCalledWith('key');
    });
  });

  describe('removeItem', () => {
    it('calls sessionStorage removeItem', () => {
      loadItem('key');

      expect(sessionStorage.getItem).toBeCalledWith('key');

      removeItem('key');

      expect(sessionStorage.getItem).toBeCalledWith('key');
    });
  });
});
