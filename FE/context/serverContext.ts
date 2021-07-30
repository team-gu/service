import Axios from 'axios';
import { loadItem } from '@utils/storage';

interface ApiParameter {
  url: string;
  type: string;
  param?: any;
}

interface ApiHeaders {
  'Content-Type': string;
  Authorization?: string;
  'Access-Control-Allow-Origin': string;
  'Access-Control-Allow-Methods': string;
  'Access-Control-Allow-Headers': string;
}

export const SERVER_URL: string = 'http://i5a202.p.ssafy.io:8080';

const api = ({ url, type = 'get', param }: ApiParameter) => {
  const accessToken = loadItem('accessToken');
  const headers: ApiHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers':
      'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
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
