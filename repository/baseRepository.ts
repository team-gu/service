import api from '@context/serverContext';

export const getTemp = async () =>
  await api({
    url: `/api/temp`,
    type: 'get',
  });
