import { useEffect, useState } from 'react';
import { Story } from '@storybook/react';
import TeamStatusCard from './TeamStatusCard';
import { Team } from '@utils/type';

export default {
  title: 'Organisms/Team Status Card',
  component: TeamStatusCard,
};

const Template: Story = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  useEffect(() => {
    setTeams(DUMMY);
  }, []);
  return (
    <>
      {teams.map((team) => (
        <TeamStatusCard
          team={team}
          onClickTeamManage={() => alert('팀 관리')}
        />
      ))}
    </>
  );
};

export const teamStatusCard = Template.bind({});

const DUMMY = [
  {
    id: 45,
    name: '2021년 8월 9일 18시',
    introduce: '2021년 8월 9일 18시',
    completeYn: 0,
    leaderId: 7,
    track: {
      code: 102,
      codeName: '웹 디자인',
    },
    teamMembers: [
      {
        id: 7,
        name: '안석현',
        img: null,
        email: 'naannaan@naver.com',
      },
    ],
    skills: [
      {
        code: 101,
        codeName: 'Java',
      },
      {
        code: 102,
        codeName: 'Python',
      },
      {
        code: 103,
        codeName: 'C',
      },
      {
        code: 104,
        codeName: 'C++',
      },
      {
        code: 105,
        codeName: 'C#',
      },
      {
        code: 106,
        codeName: 'Vue',
      },
      {
        code: 107,
        codeName: 'React',
      },
    ],
  },
  {
    id: 46,
    name: '강승현팀',
    introduce: '팀소개를 적는곳이라지',
    completeYn: 0,
    leaderId: 24,
    track: {
      code: 101,
      codeName: '웹 기술',
    },
    teamMembers: [
      {
        id: 24,
        name: '강승현',
        img: null,
        email: '강승현@ssafy.com',
      },
      {
        id: 23,
        name: '강리정',
        img: null,
        email: '강리정@ssafy.com',
      },
      {
        id: 25,
        name: '곽호근',
        img: null,
        email: '곽호근@ssafy.com',
      },
    ],
    skills: [
      {
        code: 101,
        codeName: 'Java',
      },
    ],
  },
  {
    id: 47,
    name: '짱민호',
    introduce: '웹 IoT 허쉴?',
    completeYn: 0,
    leaderId: 56,
    track: {
      code: 103,
      codeName: '웹 IoT',
    },
    teamMembers: [
      {
        id: 56,
        name: '장민호',
        img: null,
        email: '장민호@ssafy.com',
      },
      {
        id: 29,
        name: '김영환',
        img: null,
        email: '김영환@ssafy.com',
      },
    ],
    skills: [
      {
        code: 107,
        codeName: 'React',
      },
      {
        code: 125,
        codeName: 'Spring',
      },
    ],
  },
  {
    id: 48,
    name: 'webRTC',
    introduce: '웹 기술 팀입니다.',
    completeYn: 0,
    leaderId: 26,
    track: {
      code: 101,
      codeName: '웹 기술',
    },
    teamMembers: [
      {
        id: 22,
        name: '한글',
        img: null,
        email: '한글@ssafy.com',
      },
      {
        id: 36,
        name: '맹창영',
        img: null,
        email: '맹창영@ssafy.com',
      },
      {
        id: 53,
        name: '이채하',
        img: null,
        email: '이채하@ssafy.com',
      },
      {
        id: 54,
        name: '임완택',
        img: null,
        email: '임완택@ssafy.com',
      },
      {
        id: 45,
        name: '안대현',
        img: null,
        email: '안대현@ssafy.com',
      },
    ],
    skills: [
      {
        code: 101,
        codeName: 'Java',
      },
      {
        code: 102,
        codeName: 'Python',
      },
      {
        code: 103,
        codeName: 'C',
      },
      {
        code: 104,
        codeName: 'C++',
      },
      {
        code: 105,
        codeName: 'C#',
      },
      {
        code: 106,
        codeName: 'Vue',
      },
      {
        code: 107,
        codeName: 'React',
      },
      {
        code: 108,
        codeName: 'JavaScript',
      },
      {
        code: 109,
        codeName: 'Kotlin',
      },
      {
        code: 110,
        codeName: 'HTML',
      },
    ],
  },
  {
    id: 49,
    name: 'SNS ',
    introduce: '웹 디자인 팀입니다.',
    completeYn: 0,
    leaderId: 27,
    track: {
      code: 102,
      codeName: '웹 디자인',
    },
    teamMembers: [
      {
        id: 27,
        name: '김민주',
        img: null,
        email: '김민주@ssafy.com',
      },
      {
        id: 37,
        name: '목상원',
        img: null,
        email: '목상원@ssafy.com',
      },
      {
        id: 52,
        name: '이지훈',
        img: null,
        email: '이지훈@ssafy.com',
      },
      {
        id: 55,
        name: '더미장동균',
        img: null,
        email: '장동균@ssafy.com',
      },
    ],
    skills: [
      {
        code: 106,
        codeName: 'Vue',
      },
      {
        code: 107,
        codeName: 'React',
      },
      {
        code: 108,
        codeName: 'JavaScript',
      },
      {
        code: 109,
        codeName: 'Kotlin',
      },
      {
        code: 110,
        codeName: 'HTML',
      },
      {
        code: 111,
        codeName: 'CSS',
      },
      {
        code: 112,
        codeName: 'SQL',
      },
      {
        code: 113,
        codeName: 'PHP',
      },
      {
        code: 114,
        codeName: 'Ruby',
      },
      {
        code: 115,
        codeName: 'Dart',
      },
    ],
  },
  {
    id: 50,
    name: 'IoT',
    introduce: '웹 IoT 팀입니다.',
    completeYn: 0,
    leaderId: 28,
    track: {
      code: 103,
      codeName: '웹 IoT',
    },
    teamMembers: [
      {
        id: 28,
        name: '김민지',
        img: null,
        email: '김민지@ssafy.com',
      },
      {
        id: 38,
        name: '박은상',
        img: null,
        email: '박은상@ssafy.com',
      },
      {
        id: 51,
        name: '이우섭',
        img: null,
        email: '이우섭@ssafy.com',
      },
      {
        id: 44,
        name: '신주환',
        img: null,
        email: '신주환@ssafy.com',
      },
    ],
    skills: [
      {
        code: 101,
        codeName: 'Java',
      },
      {
        code: 103,
        codeName: 'C',
      },
      {
        code: 105,
        codeName: 'C#',
      },
      {
        code: 107,
        codeName: 'React',
      },
      {
        code: 109,
        codeName: 'Kotlin',
      },
      {
        code: 111,
        codeName: 'CSS',
      },
      {
        code: 113,
        codeName: 'PHP',
      },
    ],
  },
  {
    id: 51,
    name: 'zoom',
    introduce: '줌 만드실분',
    completeYn: 0,
    leaderId: 30,
    track: {
      code: 101,
      codeName: '웹 기술',
    },
    teamMembers: [
      {
        id: 30,
        name: '김우진',
        img: null,
        email: '김우진@ssafy.com',
      },
      {
        id: 39,
        name: '박지우',
        img: null,
        email: '박지우@ssafy.com',
      },
      {
        id: 50,
        name: '이용재',
        img: null,
        email: '이용재@ssafy.com',
      },
      {
        id: 35,
        name: '노희선',
        img: null,
        email: '노희선@ssafy.com',
      },
    ],
    skills: [
      {
        code: 102,
        codeName: 'Python',
      },
      {
        code: 104,
        codeName: 'C++',
      },
      {
        code: 106,
        codeName: 'Vue',
      },
      {
        code: 108,
        codeName: 'JavaScript',
      },
      {
        code: 110,
        codeName: 'HTML',
      },
      {
        code: 112,
        codeName: 'SQL',
      },
      {
        code: 114,
        codeName: 'Ruby',
      },
    ],
  },
  {
    id: 52,
    name: 'instagram',
    introduce: '인스타그램 만드실 분',
    completeYn: 0,
    leaderId: 31,
    track: {
      code: 102,
      codeName: '웹 디자인',
    },
    teamMembers: [
      {
        id: 31,
        name: '김주형',
        img: null,
        email: '김주형@ssafy.com',
      },
      {
        id: 40,
        name: '백상욱',
        img: null,
        email: '백상욱@ssafy.com',
      },
      {
        id: 49,
        name: '이동길',
        img: null,
        email: '이동길@ssafy.com',
      },
    ],
    skills: [
      {
        code: 101,
        codeName: 'Java',
      },
      {
        code: 102,
        codeName: 'Python',
      },
      {
        code: 103,
        codeName: 'C',
      },
      {
        code: 107,
        codeName: 'React',
      },
      {
        code: 108,
        codeName: 'JavaScript',
      },
      {
        code: 109,
        codeName: 'Kotlin',
      },
      {
        code: 113,
        codeName: 'PHP',
      },
      {
        code: 114,
        codeName: 'Ruby',
      },
      {
        code: 115,
        codeName: 'Dart',
      },
    ],
  },
  {
    id: 53,
    name: 'kiosk',
    introduce: '키오스크 만드실 분',
    completeYn: 0,
    leaderId: 32,
    track: {
      code: 103,
      codeName: '웹 IoT',
    },
    teamMembers: [
      {
        id: 32,
        name: '김하영',
        img: null,
        email: '김하영@ssafy.com',
      },
      {
        id: 41,
        name: '백유리',
        img: null,
        email: '백유리@ssafy.com',
      },
      {
        id: 48,
        name: '윤익선',
        img: null,
        email: '윤익선@ssafy.com',
      },
    ],
    skills: [
      {
        code: 101,
        codeName: 'Java',
      },
      {
        code: 102,
        codeName: 'Python',
      },
      {
        code: 105,
        codeName: 'C#',
      },
      {
        code: 106,
        codeName: 'Vue',
      },
      {
        code: 109,
        codeName: 'Kotlin',
      },
      {
        code: 110,
        codeName: 'HTML',
      },
      {
        code: 113,
        codeName: 'PHP',
      },
      {
        code: 114,
        codeName: 'Ruby',
      },
    ],
  },
  {
    id: 54,
    name: 'webex',
    introduce: '웨벡스 만드실분',
    completeYn: 0,
    leaderId: 33,
    track: {
      code: 101,
      codeName: '웹 기술',
    },
    teamMembers: [
      {
        id: 33,
        name: '김학영',
        img: null,
        email: '김학영@ssafy.com',
      },
      {
        id: 42,
        name: '서민영',
        img: null,
        email: '서민영@ssafy.com',
      },
      {
        id: 47,
        name: '윤영은',
        img: null,
        email: '윤영은@ssafy.com',
      },
    ],
    skills: [
      {
        code: 101,
        codeName: 'Java',
      },
      {
        code: 104,
        codeName: 'C++',
      },
      {
        code: 107,
        codeName: 'React',
      },
      {
        code: 110,
        codeName: 'HTML',
      },
      {
        code: 113,
        codeName: 'PHP',
      },
      {
        code: 116,
        codeName: 'Scala',
      },
      {
        code: 119,
        codeName: '.NET',
      },
      {
        code: 122,
        codeName: 'Swift',
      },
      {
        code: 125,
        codeName: 'Spring',
      },
      {
        code: 127,
        codeName: 'WebRTC',
      },
    ],
  },
  {
    id: 55,
    name: 'twitter',
    introduce: '트위터 만드실분',
    completeYn: 0,
    leaderId: 34,
    track: {
      code: 102,
      codeName: '웹 디자인',
    },
    teamMembers: [
      {
        id: 34,
        name: '김혜인',
        img: null,
        email: '김혜인@ssafy.com',
      },
      {
        id: 43,
        name: '서요셉',
        img: null,
        email: '서요셉@ssafy.com',
      },
      {
        id: 46,
        name: '안석현',
        img: null,
        email: '안석현@ssafy.com',
      },
    ],
    skills: [
      {
        code: 111,
        codeName: 'CSS',
      },
      {
        code: 112,
        codeName: 'SQL',
      },
      {
        code: 113,
        codeName: 'PHP',
      },
      {
        code: 114,
        codeName: 'Ruby',
      },
      {
        code: 115,
        codeName: 'Dart',
      },
      {
        code: 116,
        codeName: 'Scala',
      },
      {
        code: 117,
        codeName: 'Perl',
      },
      {
        code: 118,
        codeName: 'TypeScript',
      },
      {
        code: 119,
        codeName: '.NET',
      },
      {
        code: 120,
        codeName: 'Groovy',
      },
      {
        code: 121,
        codeName: 'R',
      },
      {
        code: 122,
        codeName: 'Swift',
      },
      {
        code: 123,
        codeName: 'Fortran',
      },
      {
        code: 124,
        codeName: 'MATLAB',
      },
      {
        code: 125,
        codeName: 'Spring',
      },
      {
        code: 126,
        codeName: 'MySQL',
      },
    ],
  },
];
