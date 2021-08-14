import api from '@context/serverContext';

export const getAdminProject = async () => {
  console.log('getAdminProject');

  return await api({
    url: `/api/admin/project`,
    type: 'get',
  });
};

export const createAdminProject = async (param: any) => {
  console.log('createAdminProject');
  console.log(param);

  return await api({
    url: `/api/admin/project`,
    type: 'post',
    param,
  });
};

export const updateAdminProject = async (param: any) => {
  console.log('updateAdminProject');
  console.log(param);

  return await api({
    url: `/api/admin/project/${param.projectId}`,
    type: 'put',
    param: param.project,
  });
};

export const deleteAdminProject = async (param: any) => {
  console.log('deleteAdminProject');
  console.log(param);

  return await api({
    url: `/api/admin/project/${param.projectId}`,
    type: 'delete',
  });
};

export const getAdminProjectCode = async (param: any) => {
  console.log('getAdminProjectCode');
  console.log(param);

  return await api({
    url: `/api/admin/project/code`,
    type: 'post',
    param,
  });
};

export const createAdminProjectOption = async (param: any) => {
  console.log('createAdminProjectOption');
  console.log(param);

  return await api({
    url: `/api/admin/project/code/insert`,
    type: 'post',
    param,
  });
};

export const deleteAdminProjectOption = async (param: any) => {
  console.log('createAdminProjectOption');
  console.log(param);

  return await api({
    url: `/api/admin/project/code/delete`,
    type: 'post',
    param,
  });
};

export const getChartData = async (param: any) => {
  console.log('getChartData');
  console.log(param);

  return await api({
    url: `/api/admin/dashboard/${param.projectId}`,
    type: 'get',
  });
};

export const getTableData = async (param: any) => {
  console.log('getTableData');
  console.log(param);

  return await api({
    url: `/api/admin/dashboardtable/${param.projectId}`,
    type: 'get',
  });
};

export const getTeamTableData = async (param: any) => {
  console.log('getTeamTableData');
  console.log(param);

  return await api({
    url: `/api/admin/team`,
    type: 'post',
    param,
  })
}

export const uploadExcelFile = async (param: any) => {
  console.log('uploadExcelFile');
  console.log(param);

  return await api({
    url: `/api/excel/read`,
    type: 'post',
    param,
  });
};

export const registUsers = async (param: any) => {
  console.log('registUsers');
  console.log(param);

  return await api({
    url: `/api/auth/regist/users`,
    type: 'post',
    param,
  });
};

