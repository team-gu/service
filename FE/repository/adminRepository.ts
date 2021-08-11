import api from '@context/serverContext';

export const getAdminProject = async () => {
  console.log('getAdminProject');

  return await api({
    url: `/api/admin/project`,
    type: 'get',
  })
}

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