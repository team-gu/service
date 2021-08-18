import api from '@context/serverContext';

/////////////// 프로젝트 관리

export const getAdminProject = async () =>
  await api({
    url: `/api/admin/project`,
    type: 'get',
  });

export const createAdminProject = async (param: any) =>
  await api({
    url: `/api/admin/project`,
    type: 'post',
    param,
  });

export const updateAdminProject = async (param: any) =>
  await api({
    url: `/api/admin/project/${param.projectId}`,
    type: 'put',
    param: param.project,
  });

export const deleteAdminProject = async (param: any) =>
  await api({
    url: `/api/admin/project/${param.projectId}`,
    type: 'delete',
  });

export const getAdminProjectCode = async (param: any) =>
  await api({
    url: `/api/admin/project/code`,
    type: 'post',
    param,
  });

export const createAdminProjectOption = async (param: any) =>
  await api({
    url: `/api/admin/project/code/insert`,
    type: 'post',
    param,
  });

export const deleteAdminProjectOption = async (param: any) =>
  await api({
    url: `/api/admin/project/code/delete`,
    type: 'post',
    param,
  });

/////////////// 프로젝트 관리

/////////////// 대시보드

export const getChartData = async (param: any) =>
  await api({
    url: `/api/admin/dashboard/${param.projectId}`,
    type: 'get',
  });

export const getProjectUserTableData = async (param: any) =>
  await api({
    url: `/api/admin/project/${param.projectId}`,
    type: 'get',
  });

/////////////// 대시보드

/////////////// 팀 관리

export const getTeamTableData = async (param: any) =>
  await api({
    url: `/api/admin/team`,
    type: 'post',
    param,
  });

export const exportTeamData = async (param: any) =>
  await api({
    url: `/api/excel/team/export`,
    type: 'post',
    param,
  });

/////////////// 팀 관리

/////////////// 교육생 관리

export const addStudentToProject = async (param: any) =>
  await api({
    url: `/api/admin/project/add`,
    type: 'post',
    param,
  });

export const excludeStudentFromProject = async (param: any) =>
  await api({
    url: '/api/admin/project/exclude',
    type: 'post',
    param,
  });

export const exportUserData = async (param: any) =>
  await api({
    url: `/api/excel/user/export`,
    type: 'post',
    param,
  });

export const importUserData = async (param: any) =>
  await api({
    url: `/api/excel/userproject/insert`,
    type: 'post',
    param,
  });

export const getProjectUsersContainsName = async (param: any) =>
  await api({
    url: `/api/admin/project/search`,
    type: 'post',
    param,
  });

/////////////// 교육생 관리

/////////////// 전체 교육생 관리

export const getUserTableData = async (param: any) =>
  await api({
    url: `/api/admin/user`,
    type: 'post',
    param,
  });

export const createUser = async (param: any) =>
  await api({
    url: `/api/admin/user/add`,
    type: 'post',
    param,
  });

export const updateUser = async (param: any) =>
  await api({
    url: `/api/admin/user/${param.userId}`,
    type: 'put',
    param,
  });

export const getAdminClassOption = async (param: any) =>
  await api({
    url: `/api/admin/user/class`,
    type: 'post',
    param,
  });

export const createAdminClassOption = async (param: any) =>
  await api({
    url: `/api/admin/user/class/add`,
    type: 'post',
    param,
  });

export const deleteAdminClassOption = async (param: any) =>
  await api({
    url: `/api/admin/user/class/${param.classId}`,
    type: 'delete',
    param,
  });

export const signupUsersByExcel = async (param: any) =>
  await api({
    url: `/api/excel/user/insert`,
    type: 'post',
    param,
  });
