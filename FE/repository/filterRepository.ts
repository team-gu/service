import api from '@context/serverContext';

export const getEachFiltersCodeList = async () =>
  await api({
    url: '/api/codeDetail/user',
    type: 'get',
  });

export const postByFilteredUsers = async (param) =>
  await api({
    url: '/api/userPool/search',
    type: 'post',
    param,
  });
