import { DateTime } from 'luxon';

export interface Chat {
  nickname: string;
  message: string;
  profileSrc: string;
  createAt: DateTime;
  connectionId: string | undefined;
}

export interface ChatNormal {
  id: number;
  userName: string;
  profileSrc: string;
  // TODO: 추후 타입 정의
  time: any;
  message: string;
  isMe: boolean;
}
