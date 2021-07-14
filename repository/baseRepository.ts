import api from '@context/serverContext';

export const postLoginApi = async (param: object) =>
  await api({
    url: `/api/v1/auth`,
    type: 'post',
    param,
  });

export const postSignUp = async (param: object) =>
  await api({
    url: `/users`,
    type: 'post',
    param,
  });

export const getCheckIdDuplicate = async (param: string) =>
  await api({
    url: `/users/${param}`,
    type: 'get',
  });
