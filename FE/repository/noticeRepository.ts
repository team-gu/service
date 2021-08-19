import api from '@context/serverContext';

export const getNotice = async (
  page: number,
  size: number,
  title: string | undefined,
) => {
  return await api({
    url: `/api/notice?page=${page}&size=${size}&sort=createDate,DESC&title=${title}`,
    type: 'get',
  });
};

export const getNoticeDetail = async (id: string | string[] | undefined) => {
  return await api({
    url: `/api/notice/${id}`,
    type: 'get',
  });
};

export const postNotice = async (param: object) => {
  await api({
    url: '/api/notice',
    type: 'post',
    param,
  });
};

export const imageUpload = async (param: object) => {
  return await api({
    url: '/api/file/upload',
    type: 'post',
    param,
  });
};

export const updateNotice = async (
  id: number | string | string[] | undefined,
  param: object,
) => {
  await api({
    url: `/api/notice/${id}`,
    type: 'patch',
    param,
  });
};

export const deleteNotice = async (id: number) => {
  await api({
    url: `/api/notice/${id}`,
    type: 'delete',
  });
};
