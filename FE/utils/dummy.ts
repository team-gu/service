import { DateTime } from 'luxon';

export const DUMMY_PROJECTS = [
  {
    id: 1,
    name: '5기 공통 프로젝트',
    stage: '5기',
    category: '공통',
    track: ['웹 기술', '웹 디자인', '웹 IoT'],
    activateDate: DateTime.fromISO('2021-07-28T17:41:27.699+09:00'),
    startDate: DateTime.fromISO('2021-08-02T00:00:00.000+09:00'),
    endDate: DateTime.fromISO('2021-08-30T00:00:00.000+09:00'),
  },
  {
    id: 2,
    name: '5기 특화 프로젝트',
    stage: '5기',
    category: '특화',
    track: ['인공지능', '빅데이터', '블록체인'],
    activateDate: DateTime.fromISO('2021-08-28T09:00:00.000+09:00'),
    startDate: DateTime.fromISO('2021-09-10T09:00:00.000+09:00'),
    endDate: DateTime.fromISO('2021-10-30T23:59:59.000+09:00'),
  },
];

export const ADMIN_TEAM_DATA = [
  {
    title: '전체',
    data: [
      { name: '팀 완성', value: 31 },
      { name: '팀 미완성', value: 71 },
    ],
  },
  {
    title: '서울',
    data: [
      { name: '팀 완성', value: 5 },
      { name: '팀 미완성', value: 22 },
    ],
  },
  {
    title: '대전',
    data: [
      { name: '팀 완성', value: 1 },
      { name: '팀 미완성', value: 12 },
    ],
  },
  {
    title: '구미',
    data: [
      { name: '팀 완성', value: 2 },
      { name: '팀 미완성', value: 5 },
    ],
  },
  {
    title: '광주',
    data: [
      { name: '팀 완성', value: 2 },
      { name: '팀 미완성', value: 7 },
    ],
  },
];

export const ADMIN_TRACK_DATA = [
  {
    title: '웹 기술',
    data: 24,
  },
  {
    title: '웹 디자인',
    data: 14,
  },
  {
    title: '웹 IoT',
    data: 9,
  },
];

export const DUMMY_TABLE_COLUMNS = [
  {
    Header: '학번',
    accessor: 'studentNumber',
    aggregate: 'count',
    Aggregated: ({ value }: any) => `${value} (count)`,
  },
  {
    Header: '이름',
    accessor: 'name',
  },
  {
    Header: '이메일',
    accessor: 'email',
  },
  {
    Header: '지역',
    accessor: 'region',
  },
  {
    Header: '반',
    accessor: 'classNum',
  },
  {
    Header: '팀 소속 여부',
    accessor: 'hasTeam',
  },
  {
    Header: '팀 식별자',
    accessor: 'teamId',
  },
  {
    Header: '리더 여부',
    accessor: 'isLeader',
  },
  {
    Header: '전공/비전공',
    accessor: 'major',
  },
  {
    Header: '희망 포지션',
    accessor: 'wishPosition',
  },
];

export const DUMMY_TABLE_DATA = [
  {
    id: 1,
    name: '김싸피',
    email: 'kim@ssafy.com',
    studentNumber: '0540001',
    teamId: 20,
    classNum: 2,
    major: '전공',
    wishPosition: '백엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'X',
  },
  {
    id: 2,
    name: '장싸피',
    email: 'jang@ssafy.com',
    studentNumber: '0540002',
    teamId: 20,
    classNum: 2,
    major: '비전공',
    wishPosition: '프론트엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'O',
  },
  {
    id: 3,
    name: '안싸피',
    email: 'ahn@ssafy.com',
    studentNumber: '0540003',
    teamId: 0,
    classNum: 3,
    major: '전공',
    wishPosition: '백엔드',
    region: '대전',
    hasTeam: 'X',
    isLeader: 'X',
  },
];
