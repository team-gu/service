import api from '@context/serverContext';

export const getEachFiltersCodeList = async () =>
  await api({
    url: '/api/codeDetail/user',
    type: 'get',
  });
