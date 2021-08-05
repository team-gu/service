import api from '@context/serverContext';
import { Skill, MemberOption } from '@utils/type';

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

export const getSkillList = async () => {
  return new Promise<Skill[]>((resolve) => {
    const dummy: Skill[] = [
      {
        name: 'React',
        id: 1,
        backgroundColor: '#61DAFB',
        color: '#000',
      },
      {
        name: 'Spring',
        id: 2,
        backgroundColor: '#6DB43D',
        color: '#000',
      },
      {
        name: 'MySQL',
        id: 3,
        backgroundColor: '#005C84',
        color: '#000',
      },
      {
        name: 'WebRTC',
        id: 4,
        backgroundColor: '#AC2523',
        color: '#000',
      },
      {
        name: 'JPA',
        id: 5,
        backgroundColor: '#010101',
        color: '#fff',
      },
      {
        name: 'HTML',
        id: 6,
        backgroundColor: '#E44D26',
        color: '#000',
      },
      {
        name: 'CSS',
        id: 7,
        backgroundColor: '#0B74B8',
        color: '#000',
      },
      {
        name: 'JavaScript',
        id: 8,
        backgroundColor: '#DAB92C',
        color: '#000',
      },
      {
        name: 'Vue',
        id: 9,
        backgroundColor: '#00C180',
        color: '#000',
      },
      {
        name: 'Java',
        id: 10,
        backgroundColor: '#E05141',
        color: '#000',
      },
    ];

    resolve(dummy);
  });
  // TODO: api 연결 백엔드 미완.
  // return await api({
  //   url: `/path/to/get-skill-list`,
  //   type: 'get',
  // });
};

