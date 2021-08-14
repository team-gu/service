export const MODALS: {
  ALERT_MODAL: string;
  PROJECT_MODAL: string;
  AWARD_MODAL: string;
  HOC_MODAL: string;
  CHANGEPASSWORD_MODAL: string;
} = {
  ALERT_MODAL: 'alertModal',
  PROJECT_MODAL: 'projectModal',
  AWARD_MODAL: 'awardModal',
  HOC_MODAL: 'hocModal',
  CHANGEPASSWORD_MODAL: 'changePasswordModal',
};

export const PROJECT_CODE: any = {
  공통: 101,
  특화: 102,
  필드: 103,
  자율: 104,
};

export const OPTIONS: any = [
  { label: '공통', value: 101 },
  { label: '특화', value: 102 },
  { label: '필드', value: 103 },
  { label: '자율', value: 104 },
];

export const FILTER_TITLE: any = {
  스킬: 'skills',
  프로젝트: 'project',
  지역: 'region',
  역할: 'position',
  트랙: 'track',
  '전공/비전공': 'isMajor',
};

export const ADMIN_MENU_CONTENT = [
  '프로젝트 관리',
  '대시보드',
  '교육생 관리',
  '팀 관리',
  '공지사항 관리',
];

export const SSAFY_REGION = ['서울', '대전', '구미', '광주'];
export const SSAFY_CLASS = ['미정', '1', '2', '3', '4', '5', '6'];
export const SSAFY_TRACK = ['웹 기술', '웹 디자인', '웹 IoT'];

export const VIDEO_CHAT_PATH_PREFIX = '/rtc';
export const ADMIN_PATH_PREFIX = '/admin';

export const CODE_ID = {
  기수: 'ST',
  트랙: 'TR',
  구분: 'PR',
};

export const getImageURL = (image: string) => {
  if (image) return `${image}#` + new Date().getTime();
  return 'https://i5a202.p.ssafy.io:8080/api/file/display?url=profile/c21f969b5f03d33d43e04f8f136e7682.png';
};

export const ADMIN_DASHBOARD_TABLE_COLUMNS = [
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
    Header: '팀 식별자',
    accessor: 'teamId',
  },
  {
    Header: '리더 여부',
    accessor: 'leaderYn',
  },
  {
    Header: '전공/비전공',
    accessor: 'major',
  },
  {
    Header: '희망 포지션',
    accessor: 'position',
  },
];


export const REGIONS = [
  {
    name: '전국',
    code: 0,
  },
  {
    name: '서울',
    code: 104,
  },
  {
    name: '광주',
    code: 101,
  },
  {
    name: '구미',
    code: 102,
  },
  {
    name: '대전',
    code: 103,
  },
  {
    name: '부울경',
    code: 105,
  },
];

export const TEAM_TABLE_COLUMNS = [
  {
    Header: '팀 식별자',
    accessor: 'teamId',
    disableGroupBy: true,
  },
  {
    Header: '지역',
    accessor: 'region',
    disableGroupBy: true,
  },
  {
    Header: '팀 이름',
    accessor: 'teamName',
    disableGroupBy: true,
  },
  {
    Header: '트랙',
    accessor: 'track',
  },
  {
    Header: '현재 인원',
    accessor: 'memberCnt',
    disableGroupBy: true,
  },
  {
    Header: '완료 여부',
    accessor: 'completeYn',
  },
  {
    Header: '팀장',
    accessor: 'member1',
    disableGroupBy: true,
  },
  {
    Header: '팀원1',
    accessor: 'member2',
    disableGroupBy: true,
  },
  {
    Header: '팀원2',
    accessor: 'member3',
    disableGroupBy: true,
  },
  {
    Header: '팀원3',
    accessor: 'member4',
    disableGroupBy: true,
  },
  {
    Header: '팀원4',
    accessor: 'member5',
    disableGroupBy: true,
  },
  {
    Header: '팀원5',
    accessor: 'member6',
    disableGroupBy: true,
  },
];
