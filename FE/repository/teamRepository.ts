import api from '@context/serverContext';
import { MemberOption } from '@utils/type';

export const getTeams = async (param: any) => {
  console.log('getTeams: ', param);

  return await api({
    url: `/api/team`,
    type: 'get',
  });
};

export const getTeamsFiltered = async (param: any) => {
  console.log('getTeamsFiltered: ', param);

  return await api({
    url: `/api/team`,
    type: 'post',
    param,
  });
};

export const getUserHasTeam = async (param: any) => {
  console.log('getUserHasTeam:', param);

  return await api({
    url: `/api/team/${param.userId}`,
    type: 'post',
    param,
  });
};

export const createTeam = async (param: any) => {
  console.log('createTeam: ', param);

  return await api({
    url: `/api/team/add`,
    type: 'post',
    param,
  });
};

export const updateTeam = async (param: any) => {
  console.log('updateTeam: ', param);

  return await api({
    url: `/api/team/${param.id}`,
    type: 'put',
    param,
  });
};

export const deleteTeam = async (param: any) => {
  console.log('deleteTeam: ', param);

  return await api({
    url: `/api/team/${param.id}`,
    type: 'delete',
  });
};

export const exitTeam = async (param: any) => {
  console.log('exitTeam: ', param);

  return await api({
    url: `/api/team/exitTeam`,
    type: 'put',
    param,
  });
};

export const addUserToTeam = async (param: any) => {
  console.log('addUserToTeam:', param);

  return await api({
    url: `/api/team/member`,
    type: 'post',
    param,
  });
};

export const getUserListByNameContains = async (param: any) => {
  console.log('getUserListByNameContains:', param);

  return await api({
    url: `/api/team/search`,
    type: 'post',
    param,
  });
};
