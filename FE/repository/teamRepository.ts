import api from '@context/serverContext';

export const getTeams = async (
  sortBy: string,
  sortAsc: boolean,
  containsUserId?: number,
) => {
  console.log('팀 조회 API 호출');
  console.log('정렬 기준 :', sortBy);
  console.log('오름차순 :', sortAsc);
  console.log('포함하는 사용자 아이디 :', containsUserId);

  // TODO: 필터링 추가
  return await api({
    url: `/api/team`,
    type: 'get',
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
  console.log('create team: ', param);

  return await api({
    url: `/api/team/add`,
    type: 'post',
    param,
  });
};

export const updateTeam = async (param: any) => {
  console.log('update team: ', param);

  return await api({
    url: `/api/team/${param.id}`,
    type: 'put',
    param,
  });
};

export const deleteTeam = async (param: any) => {
  console.log('delete team: ', param);

  return await api({
    url: `/api/team/${param.id}`,
    type: 'delete',
  });
};

export const exitTeam = async (param: any) => {
  console.log('exit team: ', param);

  return await api({
    url: `/api/team/exitTeam`,
    type: 'put',
    param,
  });
};

export const addUserToTeam = async (param: any) => {
  console.log('add user to team:', param);

  return await api({
    url: `/api/team/member`,
    type: 'post',
    param,
  })
}