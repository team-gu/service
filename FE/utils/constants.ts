export const MODALS: {
  ALERT_MODAL: string;
  PROJECT_MODAL: string;
  AWARD_MODAL: string;
  HOC_MODAL: string;
  CHANGEPASSWORD_MODAL: string;
  FINDPASSWORD_MODAL: string;
} = {
  ALERT_MODAL: 'alertModal',
  PROJECT_MODAL: 'projectModal',
  AWARD_MODAL: 'awardModal',
  HOC_MODAL: 'hocModal',
  CHANGEPASSWORD_MODAL: 'changePasswordModal',
  FINDPASSWORD_MODAL: 'findPasswordModal',
};

export const PROJECT_CODE: any = {
  공통: 101,
  특화: 102,
  필드: 103,
  자율: 104,
};

export const FILTER_TITLE: any = {
  스킬: 'skills',
  프로젝트: 'project',
  지역: 'region',
  역할: 'position',
  트랙: 'track',
  '전공/비전공': 'isMajor',
};

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

export const ADMIN_MENU_CONTENT = [
  {
    id: 0,
    title: '전체 교육생 관리',
  },
  {
    id: 1,
    title: '프로젝트 관리',
  },
  {
    id: 2,
    title: '대시보드',
  },
  {
    id: 3,
    title: '교육생 관리',
  },
  {
    id: 4,
    title: '팀 관리',
  },
  {
    id: 5,
    title: '공지사항 관리',
  },
];
