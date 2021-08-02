export const MODALS: { ALERT_MODAL: string } = {
  ALERT_MODAL: 'alertModal',
};

export const FILTER_IN_TEAMPAGE: any = {
  프로젝트: {
    공통: false,
    특화: false,
    필드: false,
    자율: false,
  },
  지역: {
    서울: false,
    대전: false,
    광주: false,
    구미: false,
  },
  희망역할: {
    프론트엔드: false,
    백엔드: false,
    임베디드: false,
  },
  희망트랙: {
    웹기술: false,
    웹디자인: false,
    웹IoT: false,
  },
  스킬: {
    javascript: false,
    spring: false,
  },
  '전공/비전공': {
    전공: false,
    비전공: false,
  },
};


export const TEAMPAGE_CARD_DUMMY_DATA = [
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

export const VIDEO_CHAT_PATH_PREFIX = '/rtc';

export const CHAT_DUMMY_DATA = [
  {
    id: '0',
    userName: '김싸피',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message: 'asdfsd',
    isMe: false,
  },
  {
    id: '1',
    userName: 'Me',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message: 'asdfsd',
    isMe: true,
  },
  {
    id: '2',
    userName: '김싸피',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message: 'asdfsd',
    isMe: false,
  },
  {
    id: '3',
    userName: '김싸피',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message: 'asdfsd',
    isMe: false,
  },
  {
    id: '4',
    userName: '김싸피',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message: 'asdfsd',
    isMe: false,
  },
  {
    id: '5',
    userName: 'Me',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message: 'asdfsd',
    isMe: true,
  },
  {
    id: '6',
    userName: '김싸피',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message: 'asdfsd',
    isMe: false,
  },
  {
    id: '7',
    userName: '김싸피',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message:
      'asdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsdasdfsd',
    isMe: false,
  },
  {
    id: '8',
    userName: '김싸피',
    profileSrc: '/profile.png',
    time: '2021-07-28T17:41:27.699+09:00',
    message: 'request',
    isMe: false,
  },
];

export const USER_DUMMY_DATA = [
  {
    name: '공지사항',
    content: '팀빌딩을 위해서 ...',
    isActive: false,
    time: '2021-07-28T17:41:27.699+09:00',
    alertNumber: 10,
  },
  {
    name: '김싸피',
    content: 'ㅎㅇㅎㅇ',
    isActive: true,
    time: '2021-07-28T17:41:27.699+09:00',
    alertNumber: 2,
  },
];
