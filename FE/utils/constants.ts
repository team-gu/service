export const MODALS: {
  ALERT_MODAL: string;
  PROJECT_MODAL: string;
  AWARD_MODAL: string;
  HOC_MODAL: string;
} = {
  ALERT_MODAL: 'alertModal',
  PROJECT_MODAL: 'projectModal',
  AWARD_MODAL: 'awardModal',
  HOC_MODAL: 'hocModal',
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
  '회원 관리',
  '팀 관리',
  '공지사항 관리',
];

export const SSAFY_REGION = ['서울', '대전', '구미', '광주'];
export const SSAFY_CLASS = ['미정', '1', '2', '3', '4', '5', '6'];
export const SSAFY_TRACK = ['웹 기술', '웹 디자인', '웹 IoT'];

export const VIDEO_CHAT_PATH_PREFIX = '/rtc';

export const CODE_ID = {
  기수: 'ST',
  트랙: 'TR',
  구분: 'PR',
};

export const getImageURL = (image: string) => {
  if (image === '' || image === 'null.null') return '/profile.png';
  return (
    `https://i5a202.p.ssafy.io:8080/api/file/display?url=profile/${image}#` +
    new Date().getTime()
  );
};
