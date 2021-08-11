import api from '@context/serverContext';

export const getAdminProjectOptions = async (param: any) => {
  console.log('getAdminProjectOptions');
  console.log(param);

  // return await api({
  //   url: `/api/admin/projectOption`,
  //   type: 'get',
  // });
};

export const createAdminProjectOption = async (param: any) => {
  console.log('createAdminProjectOption');
  console.log(param);

  // return await api({
  //   url: `/api/admin/projectOption`,
  //   type: 'post',
  //   param,
  // });
};

export const deleteAdminProjectOption = async (param: any) => {
  console.log('createAdminProjectOption');
  console.log(param);

  // return await api({
  //   url: `/api/admin/projectOption`,
  //   type: 'delete',
  //   param,
  // });
};