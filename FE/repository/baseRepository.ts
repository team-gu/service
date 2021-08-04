import api from '@context/serverContext';

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
  // TODO: 타입 정의
  return new Promise<any>((resolve) => {
    const dummy = [
      {
        name: '장민호',
        email: 'minho9301@naver.com',
        id: 1,
      },
      {
        name: '이용재',
        email: 'lee@naver.com',
        id: 2,
      },
      {
        name: '장동균',
        email: 'jang@naver.com',
        id: 3,
      },
      {
        name: '장민호',
        email: 'minhoho@gmail.com',
        id: 4,
      },
    ];

    const userOptions = dummy.map((item) => {
      return {
        label: `${item.name} (${item.email})`,
        value: item.name,
        id: item.id,
      };
    });

    resolve(userOptions.filter((i) => i.value.includes(param)));
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

  return new Promise<any>(resolve => {
    const dummy = [
      {
        skill: 'React',
        id: 1,
      },
      {
        skill: 'IoT',
        id: 2,
      },
      {
        skill: 'Spring',
        id: 3,
      },
      {
        skill: 'WebRTC',
        id: 4,
      },
      {
        skill: 'MySQL',
        id: 5,
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

export const getTeams = async () => {

  return new Promise<object[]>(resolve => {
    const dummy = [
      {
        members: [
          {
            profileSrc: '/profile.png',
            name: '이용재',
            leader: true,
          },
          {
            profileSrc: '/profile.png',
            name: '장동균',
            leader: false,
          },
          {
            profileSrc: '/profile.png',
            name: '장민호',
            leader: false,
          },
        ],
        skills: ['React', 'Spring', 'MySQL'],
        track: '웹기술',
        description:
          '저희 팀의 목표는 1등입니다. 자신있는 벡엔드 개발자 DM주세요. 다들 화이팅입니다 👏👏👏',
        isCompleted: false,
      },
      {
        members: [
          {
            profileSrc: '/profile.png',
            name: '강승현',
            leader: true,
          },
          {
            profileSrc: '/profile.png',
            name: '안석현',
            leader: false,
          },
          {
            profileSrc: '/profile.png',
            name: '이동길',
            leader: false,
          },
          {
            profileSrc: '/profile.png',
            name: '현선미',
            leader: false,
          },
        ],
        skills: ['Spring', 'STOMP', 'JPA'],
        track: '웹기술',
        description: '🔥🔥월화수목금금금🔥🔥 보내실 프론트엔드 구합니다. ',
        isCompleted: true,
      },
    ];

    resolve(dummy);
  })
  // TODO: api 연결 백엔드 미완.
  // return await api({
  //   url: `/path/to/get-teams`,
  //   type: 'get',
  // });
}