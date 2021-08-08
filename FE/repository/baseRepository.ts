import api from '@context/serverContext';
import { MemberOption } from '@utils/type';

export const postLoginApi = async (param: object) =>
  await api({
    url: `/api/auth/login`,
    type: 'post',
    param,
  });

export const getUserInfo = async () =>
  await api({
    url: `/api/v1/users/me`,
    type: 'get',
  });

export const postSignUp = async (param: object) =>
  await api({
    url: `/users`,
    type: 'post',
    param,
  });

export const getCheckIdDuplicate = async (param: string) =>
  await api({
    url: `/users/${param}`,
    type: 'get',
  });

export const getUserListByNameContains = async (param: string) => {
  return new Promise<MemberOption[]>((resolve) => {
    const dummy = [
      {
        img: '/profile.png',
        name: '이용재',
        leader: true,
        id: 1,
        email: 'lee@naver.com',
      },
      {
        img: '/profile.png',
        name: '장동균',
        leader: false,
        id: 2,
        email: 'jang@gmail.com',
      },
      {
        img: '/profile.png',
        name: '장민호',
        leader: false,
        id: 3,
        email: 'minho9301@naver.com',
      },
      {
        img: '/profile.png',
        name: '강승현',
        leader: true,
        id: 4,
        email: 'kangkang@naver.com',
      },
    ];

    const userOptions: MemberOption[] = dummy.map((item) => {
      return {
        label: `${item.name} (${item.email})`,
        value: item.id,
        ...item,
      };
    });

    resolve(userOptions.filter((i) => i.name.includes(param)));
  });

  // TODO: api 연결 백엔드 미완.
  // 위에 직접 필터링을 구현해서 전달하고 있다. 백엔드 구현되면 위에 필터링 작업은 지우고,
  // 잘 쓸 수 있도록 전처리 작업은 필요 할 수 있다.
  // return await api({
  //   url: `/path/to/get-user-list-by-name-contains/${param}`,
  //   type: 'get',
  // });
};
