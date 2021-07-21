export function saveItem(key: string, value: any) {
  sessionStorage.setItem(key, value);
}

export function loadItem(key: string): any {
  return sessionStorage.getItem(key);
}

export function removeItem(key: string) {
  sessionStorage.removeItem(key);
}
