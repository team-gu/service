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
