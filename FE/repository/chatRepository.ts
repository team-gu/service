import api from '@context/serverContext';

export const getChatLists = async () =>
  await api({
    url: `/chat`,
    type: 'get',
  });

export const getChatRoomMessages = async (param: string) =>
  await api({
    url: `/chat/${param}`,
    type: 'get',
  });
