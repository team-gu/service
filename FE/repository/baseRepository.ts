import api from '@context/serverContext';
import { Skill, Team, MemberOption } from '@utils/type';

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
        profileSrc: '/profile.png',
        name: '이용재',
        leader: true,
        id: 1,
        email: 'lee@naver.com',
      },
      {
        profileSrc: '/profile.png',
        name: '장동균',
        leader: false,
        id: 2,
        email: 'jang@gmail.com',
      },
      {
        profileSrc: '/profile.png',
        name: '장민호',
        leader: false,
        id: 3,
        email: 'minho9301@naver.com',
      },
      {
        profileSrc: '/profile.png',
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

export const getTeams = async (
  sortBy: string,
  sortAsc: boolean,
  containsUserId?: number,
) => {
  console.log('팀 가져오는 API 호출');
  console.log('정렬 기준 :', sortBy);
  console.log('오름차순 :', sortAsc);
  console.log('포함하는 사용자 아이디 :', containsUserId);

  return new Promise<Team[]>((resolve) => {
    const dummy = [
      {
        id: 1,
        name: '웹기술 할거에요',
        introduce: '현재 TEAM 테이블에 팀 소개 컬럼이 존재하지 않습니다',
        completeYN: 0,
        nowNumber: 2,
        maxNumber: 3,
        leaderId: 1,
        trackName: '웹 기술',
        teamMembers: [
          {
            id: 1,
            name: '안석현',
            img: 'default',
            email: 'naannaan@naver.com',
            profileSrc: '/profile.png',
          },
          {
            id: 3,
            name: '박싸피',
            img: null,
            email: 'parkssafy@naver.com',
            profileSrc: '/profile.png',
          },
        ],
        skills: [
          {
            id: 1,
            name: 'React',
          },
          {
            id: 2,
            name: 'Spring',
          },
          {
            id: 3,
            name: 'MySQL',
          },
          {
            id: 4,
            name: 'WebRTC',
          },
        ],
      },
      {
        id: 2,
        name: '웹 디자인 할거에요',
        introduce: '현재 TEAM 테이블에 팀 소개 컬럼이 존재하지 않습니다',
        completeYN: 0,
        nowNumber: 2,
        maxNumber: 3,
        leaderId: 2,
        trackName: '웹 디자인',
        teamMembers: [
          {
            id: 2,
            name: '김싸피',
            img: null,
            email: 'kimssafy@naver.com',
            profileSrc: '/profile.png',
          },
          {
            id: 4,
            name: '강싸피',
            img: null,
            email: 'kangssafy@naver.com',
            profileSrc: '/profile.png',
          },
        ],
        skills: [
          {
            id: 5,
            name: 'JPA',
          },
          {
            id: 6,
            name: 'HTML',
          },
          {
            id: 7,
            name: 'CSS',
          },
          {
            id: 8,
            name: 'JavaScript',
          },
        ],
      },
    ];


    resolve(dummy);
  });
  // TODO: api 연결 백엔드 미완.
  // return await api({
  //   url: `/path/to/get-teams`,
  //   type: 'get',
  // });
};

export const createTeam = async (param: object) => {
  console.log('팀 생성 API 호출: ');
  console.log(param);

  // TODO: api 연결 백엔드 미완.
  // return await api({
  //   url: `/path/to/create-team`,
  //   type: 'post',
  //   param,
  // });
};
