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
  if (image) return image;
  return 'https://i5a202.p.ssafy.io:8080/api/file/display?url=profile/c21f969b5f03d33d43e04f8f136e7682.png';
};

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
    title: '전체 사용자 관리',
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

export const ROUTE_TO_KOREAN = {
  humanpool: '인력풀',
  team: '팀풀',
  mypage: '마이페이지',
  userdetail: '유저정보',
  notice: '공지사항',
};

export const skillColor = new Map([
  ['Java', ['#fff', '#E05141']],
  ['Python', ['#F2C63E', '#346E9E']],
  ['C', ['#fff', '#014079']],
  ['C++', ['#fff', '#014079']],
  ['C#', ['#fff', '#611F74']],
  ['Vue', ['#405061', '#00C180']],
  ['React', ['#fff', '#61DAFB']],
  ['JavaScript', ['#000', '#DAB92C']],
  ['Kotlin', ['#000', '#3C7AD1']],
  ['HTML', ['#000', '#E44D26']],
  ['CSS', ['#000', '#0B74B8']],
  ['SQL', ['red', '#2677C7']],
  ['PHP', ['#000', '#7075AA']],
  ['Ruby', ['#EEC89A', '#E30D12']],
  ['Dart', ['#3DBAF2', '#035494']],
  ['Scala', ['#fff', '#B01704']],
  ['Perl', ['#fff', '#3E4067']],
  ['TypeScript', ['#fff', '#2F72BC']],
  ['.NET', ['#fff', '#621F74']],
  ['Groovy', ['#fff', '#26667F']],
  ['R', ['#B3B4B9', '#2265B5']],
  ['Swift', ['#fff', '#F2652F']],
  ['Fortran', ['#F9EED9', '#6C5E51']],
  ['MATLAB', ['#fff', '#C65F2F']],
  ['Spring', ['#fff', '#6DB43D']],
  ['MySQL', ['#D88700', '#005C84']],
  ['WebRTC', ['#000', '#AC2523']],
  ['JPA', ['#fff', '#010101']],
]);

export const TEST_ACCOUNTS = [
  {
    email: '강승현@ssafy.com',
    password: 'test',
  },
  {
    email: '안석현@ssafy.com',
    password: 'test',
  }
];