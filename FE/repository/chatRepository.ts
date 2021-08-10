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

export const postAllUserList = async (param: any) =>
  await api({
    url: '/api/auto/chat',
    type: 'post',
    param,
  });

export const postCreateRoom = async (param: any) =>
  await api({
    url: '/api/chat/room/check',
    type: 'post',
    param,
  });

export const postExitRoom = async (param: any) =>
  await api({
    url: '/api/chat/room/out',
    type: 'post',
    param,
  });
