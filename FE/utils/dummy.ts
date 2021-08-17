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
    disableGroupBy: true,
  },
  {
    Header: '이름',
    accessor: 'name',
    disableGroupBy: true,
  },
  {
    Header: '이메일',
    accessor: 'email',
    disableGroupBy: true,
  },
  {
    Header: '지역',
    accessor: 'region',
  },
  {
    Header: '반',
    accessor: 'studentClass',
  },
  {
    Header: '팀 유무',
    accessor: 'teamYn',
  },
  {
    Header: '팀 번호',
    accessor: 'teamId',
  },
  {
    Header: '리더 여부',
    accessor: 'leaderYn',
  },
  {
    Header: '전공여부',
    accessor: 'major',
  },
  {
    Header: '희망 포지션',
    accessor: 'position',
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
  {
    id: 4,
    name: '장민호',
    email: 'minho@ssafy.com',
    studentNumber: '0540004',
    teamId: 0,
    classNum: 2,
    major: '전공',
    wishPosition: '백엔드',
    region: '서울',
    hasTeam: 'X',
    isLeader: 'X',
  },
  {
    id: 5,
    name: '강승현',
    email: 'kangkang@ssafy.com',
    studentNumber: '0540005',
    teamId: 21,
    classNum: 2,
    major: '비전공',
    wishPosition: '백엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'O',
  },
  {
    id: 6,
    name: '안석현',
    email: 'ahn@ssafy.com',
    studentNumber: '0540006',
    teamId: 21,
    classNum: 2,
    major: '전공',
    wishPosition: '백엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'X',
  },
  {
    id: 7,
    name: '이용재',
    email: 'yong@ssafy.com',
    studentNumber: '0540007',
    teamId: 0,
    classNum: 2,
    major: '전공',
    wishPosition: '프론트엔드',
    region: '서울',
    hasTeam: 'X',
    isLeader: 'X',
  },
  {
    id: 8,
    name: '장동균',
    email: 'jangjang@ssafy.com',
    studentNumber: '0540008',
    teamId: 11,
    classNum: 2,
    major: '비전공',
    wishPosition: '프론트엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'O',
  },
  {
    id: 9,
    name: '이동길',
    email: 'leedong@ssafy.com',
    studentNumber: '0540009',
    teamId: 11,
    classNum: 2,
    major: '전공',
    wishPosition: '백엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'X',
  },
  {
    id: 10,
    name: '에일리',
    email: 'ailee@ssafy.com',
    studentNumber: '0540010',
    teamId: 11,
    classNum: 2,
    major: '비전공',
    wishPosition: '프론트엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'X',
  },
  {
    id: 11,
    name: '현선미',
    email: 'hyun@ssafy.com',
    studentNumber: '0540011',
    teamId: 0,
    classNum: 1,
    major: '전공',
    wishPosition: '백엔드',
    region: '서울',
    hasTeam: 'X',
    isLeader: 'X',
  },
  {
    id: 12,
    name: '당현아',
    email: 'dang@ssafy.com',
    studentNumber: '0540012',
    teamId: 12,
    classNum: 1,
    major: '비전공',
    wishPosition: '프론트엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'O',
  },
  {
    id: 13,
    name: '장현웅',
    email: 'janghyun@ssafy.com',
    studentNumber: '0540013',
    teamId: 12,
    classNum: 1,
    major: '전공',
    wishPosition: '백엔드',
    region: '서울',
    hasTeam: 'O',
    isLeader: 'X',
  },
  {
    id: 14,
    name: '이태희',
    email: 'leetea@ssafy.com',
    studentNumber: '0540014',
    teamId: 0,
    classNum: 2,
    major: '비전공',
    wishPosition: '프론트엔드',
    region: '서울',
    hasTeam: 'X',
    isLeader: 'X',
  },
  {
    id: 15,
    name: '이은택',
    email: 'leeeun@ssafy.com',
    studentNumber: '0540015',
    teamId: 29,
    classNum: 3,
    major: '전공',
    wishPosition: '프론트엔드',
    region: '구미',
    hasTeam: 'O',
    isLeader: 'X',
  },
  {
    id: 16,
    name: '곽은경',
    email: 'kwak@ssafy.com',
    studentNumber: '0540017',
    teamId: 29,
    classNum: 3,
    major: '전공',
    wishPosition: '백엔드',
    region: '구미',
    hasTeam: 'O',
    isLeader: 'X',
  },
  {
    id: 17,
    name: '김영환',
    email: 'kimyoung@ssafy.com',
    studentNumber: '0540017',
    teamId: 0,
    classNum: 3,
    major: '비전공',
    wishPosition: '프론트엔드',
    region: '구미',
    hasTeam: 'X',
    isLeader: 'O',
  },
  {
    id: 18,
    name: '신주환',
    email: 'shinshin@ssafy.com',
    studentNumber: '0540018',
    teamId: 29,
    classNum: 3,
    major: '전공',
    wishPosition: '백엔드',
    region: '구미',
    hasTeam: 'O',
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
