import api from '@context/serverContext';

//TODO 중복이 너무 많기 때문에 두 개씩 하나의 함수로 묶는 리팩토링이 필요합니다.
export const postProject = async (param: object) =>
  await api({
    url: '/api/auth/project',
    type: 'post',
    param,
  });

export const updateProject = async (param: object) =>
  await api({
    url: '/api/auth/project',
    type: 'put',
    param,
  });

export const deleteProject = async (id: number) =>
  await api({
    url: `/api/auth/project/${id}`,
    type: 'delete',
  });

export const postAward = async (param: object) =>
  await api({
    url: '/api/auth/award',
    type: 'post',
    param,
  });

export const updateAward = async (param: object) =>
  await api({
    url: '/api/auth/award',
    type: 'put',
    param,
  });

export const deleteAward = async (id: number) =>
  await api({
    url: `/api/auth/award/${id}`,
    type: 'delete',
  });

export const updateDetailInformation = async (param: object) => {
  return await api({
    url: '/api/auth/userInfo',
    type: 'put',
    param,
  });
};

export const getUserDetail = async (id: string | string[] | undefined) => {
  return await api({
    url: `/api/auth/userInfo/${id}`,
    type: 'get',
  });
};

export const getUserDetailbyRefresh = async () => {
  return await api({
    url: '/api/auth/reqInfo',
    type: 'get',
  });
};

export const changePassword = async (param: object) => {
  await api({
    url: '/api/auth/password',
    type: 'put',
    param,
  });
};
