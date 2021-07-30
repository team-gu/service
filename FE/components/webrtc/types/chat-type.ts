import { DateTime } from 'luxon';

export interface Chat {
  nickname: string;
  message: string;
  profileSrc: string;
  createAt: DateTime;
  connectionId: string | undefined;
}
