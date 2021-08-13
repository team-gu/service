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

export const getSearchUserListByNameAndEmail = async (
  projectCode: number,
  studentNumber: string,
  target: string,
) =>
  await api({
    url: `/api/userPool/search?projectCode=${projectCode}&studentNumber=${studentNumber}&target=${target}`,
    type: 'get',
  });
