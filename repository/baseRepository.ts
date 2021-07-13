import api from '@context/serverContext';

export const postLoginApi = async (param: object) =>
  await api({
    url: `/api/v1/auth`,
    type: 'get',
    param,
  });
