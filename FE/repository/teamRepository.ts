import api from '@context/serverContext';
import { Team } from '@utils/type';

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
        leaderId: 19,
        trackName: '웹 기술',
        teamMembers: [
          {
            id: 19,
            name: '장민호',
            img: '/profile.png',
            email: 'naannaan@naver.com',
          },
          {
            id: 3,
            name: '박싸피',
            img: null,
            email: 'parkssafy@naver.com',
          },
          {
            id: 6,
            name: 'idea',
            img: null,
            email: 'idea@naver.com',
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
          },
          {
            id: 4,
            name: '강싸피',
            img: null,
            email: 'kangssafy@naver.com',
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

export const updateTeam = async (param: object) => {
  console.log('팀 수정 API 호출: ');
  console.log(param);

  // TODO: api 연결 백엔드 미완.
  // return await api({
  //   url: `/path/to/create-team`,
  //   type: 'post',
  //   param,
  // });
};

export const deleteTeam = async (param: object) => {
  console.log('팀 삭제 API 호출: ');
  console.log(param);

  // TODO: api 연결 백엔드 미완.
  // return await api({
  //   url: `/path/to/delete-team`,
  //   type: 'post',
  //   param,
  // });
};

export const exitTeam = async (param: object) => {
  console.log('팀 탈퇴 API 호출: ');
  console.log(param);

  // TODO: api 연결 백엔드 미완.
  // return await api({
  //   url: `/path/to/exit-team`,
  //   type: 'post',
  //   param,
  // });
};