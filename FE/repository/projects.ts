import api from '@context/serverContext';

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
