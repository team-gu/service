import api from '@context/serverContext';

export const getEachFiltersCodeList = async (param: string) =>
  await api({
    url: `/api/codeDetail/user/${param}`,
    type: 'get',
  });

export const postByFilteredUsers = async (param: any) =>
  await api({
    url: '/api/userPool/search',
    type: 'post',
    param,
  });

export const postSearchUserListByName = async (param: {
  target: string;
  studentNumber: string;
  project: number;
  region: number[];
  position: number[];
  track: number[];
  skills: number[];
  isMajor: number;
}) =>
  await api({
    url: `/api/userPool/search/name`,
    type: 'post',
    param,
  });
