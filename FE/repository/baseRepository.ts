import api from '@context/serverContext';

export const postLoginApi = async (param: object) =>
  await api({
    url: `/api/auth/login`,
    type: 'post',
    param,
  });

export const getUserInfo = async () =>
  await api({
    url: `/api/v1/users/me`,
    type: 'get',
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
