import api from '@context/serverContext';

export const getTeams = async () =>
  await api({
    url: `/api/team`,
    type: 'get',
  });

export const getTeamsFiltered = async (param: any) =>
  await api({
    url: `/api/team`,
    type: 'post',
    param,
  });

export const getUserHasTeam = async (param: any) =>
  await api({
    url: `/api/team/${param.userId}`,
    type: 'post',
    param,
  });

export const createTeam = async (param: any) =>
  await api({
    url: `/api/team/add`,
    type: 'post',
    param,
  });

export const updateTeam = async (param: any) =>
  await api({
    url: `/api/team/${param.id}`,
    type: 'put',
    param,
  });

export const deleteTeam = async (param: any) =>
  await api({
    url: `/api/team/${param.id}`,
    type: 'delete',
  });

export const exitTeam = async (param: any) =>
  await api({
    url: `/api/team/exitTeam`,
    type: 'put',
    param,
  });

export const addUserToTeam = async (param: any) =>
  await api({
    url: `/api/team/member`,
    type: 'post',
    param,
  });

export const getUserListByNameContains = async (param: any) =>
  await api({
    url: `/api/team/search`,
    type: 'post',
    param,
  });
