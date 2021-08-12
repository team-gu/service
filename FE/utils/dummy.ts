import { DateTime } from 'luxon';
import { Code, Project } from '@utils/type';

export const DUMMY_PROJECTS: Project[] = [
  {
    id: 1,
    stage: {
      code: 105,
      codeName: '5기',
    },
    project: {
      code: 101,
      codeName: '공통',
    },
    track: [
      {
        code: 101,
        codeName: '웹 기술',
      },
      {
        code: 102,
        codeName: '웹 디자인',
      },
      {
        code: 103,
        codeName: '웹 IoT',
      },
    ],
    activeDate: '2021-07-28',
    startDate: '2021-08-02',
    endDate: '2021-08-30',
  },
  {
    id: 2,
    stage: {
      code: 105,
      codeName: '5기',
    },
    project: {
      code: 102,
      codeName: '특화',
    },
    track: [
      {
        code: 104,
        codeName: '인공지능',
      },
      {
        code: 105,
        codeName: '빅데이터',
      },
      {
        code: 106,
        codeName: '블록체인',
      },
    ],
    activeDate: '2021-08-28',
    startDate: '2021-09-10',
    endDate: '2021-10-30',
  },
];

export const ADMIN_TEAM_DATA = [
  {
    title: '전체',
    data: [
      { name: '완성', value: 31 },
      { name: '미완성', value: 71 },
    ],
  },
  {
    title: '서울',
    data: [
      { name: '완성', value: 5 },
      { name: '미완성', value: 22 },
    ],
  },
  {
    title: '대전',
    data: [
      { name: '완성', value: 1 },
      { name: '미완성', value: 12 },
    ],
  },
  {
    title: '구미',
    data: [
      { name: '완성', value: 2 },
      { name: '미완성', value: 5 },
    ],
  },
  {
    title: '광주',
    data: [
      { name: '완성', value: 2 },
      { name: '미완성', value: 7 },
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
export const DUMMY_STAGE: Code[] = [
  {
    code: 101,
    codeName: '1기',
  },
  {
    code: 102,
    codeName: '2기',
  },
  {
    code: 103,
    codeName: '3기',
  },
  {
    code: 104,
    codeName: '4기',
  },
  {
    code: 105,
    codeName: '5기',
  },
];

export const DUMMY_CATEGORY: Code[] = [
  {
    code: 101,
    codeName: '공통',
  },
  {
    code: 102,
    codeName: '특화',
  },
  {
    code: 103,
    codeName: '필드',
  },
  {
    code: 104,
    codeName: '자율',
  },
];

export const DUMMY_TRACK: Code[] = [
  {
    code: 101,
    codeName: '웹 기술',
  },
  {
    code: 102,
    codeName: '웹 디자인',
  },
  {
    code: 103,
    codeName: '웹 IoT',
  },
  {
    code: 104,
    codeName: '인공지능',
  },
  {
    code: 105,
    codeName: '빅데이터',
  },
  {
    code: 106,
    codeName: '블록체인',
  },
];
