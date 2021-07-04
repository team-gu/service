import Axios from 'axios';
import { loadItem } from '@utils/storage';

interface ApiParameter {
  url: string;
  type: string;
  param?: any;
}

export const SERVER_URL: string =
  process.env.REACT_APP_API_SERVER_URL || 'https://<SERVER_URL>';

const api = ({ url, type = 'get', param }: ApiParameter) => {
  const accessToken = loadItem('accessToken');

  const headers: { 'Content-Type': string; Authorization?: string } = {
    'Content-Type': 'application/json',
  };

  if (accessToken !== null) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  // TODO: 추후에 타입 정의를 다시 해야 할 필요성이 있음
  // @ts-ignore
  return Axios({
    method: type,
    url: `${SERVER_URL}${url}`,
    headers,
    data: param,
  });
};

export default api;
