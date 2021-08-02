import api from '@context/serverContext';

export const getChatLists = async (param: string | number) =>
  await api({
    url: `/api/chat/${param}`,
    type: 'get',
  });

export const getChatRoomMessages = async (param: string | number) =>
  await api({
    url: `/api/chat/room/${param}`,
    type: 'get',
  });
