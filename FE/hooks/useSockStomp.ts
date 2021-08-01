import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';
import { DateTime } from 'luxon';

import { useAuthState } from '@store';
import { getChatRoomMessages } from '@repository/chatRepository';
import { CHAT_DUMMY_DATA } from '@utils/constants';

interface useSockStompProps {
  userId: number;
}

interface Message {
  type?: string;
  key?: number;
  id?: number;
  userName?: string;
  profileSrc?: string;
  time?: string;
  message?: string;
}

// TODO: stomp URL 확정되면 반영
const URL = '';

export default function useSockStomp({ userId }: useSockStompProps) {
  // TODO: login response에 profileSrc가 추가되면 store에서 가져오도록 변경
  const {
    user: { id, name },
  } = useAuthState();
  const [messageList, setMessageList] = useState<Message[]>(CHAT_DUMMY_DATA);
  const [isConnectStomp, setIsConnectStomp] = useState(false);
  // TODO: clientRef 타입 정의 해야함
  const clientRef = useRef();

  const handleSendMessage = (payload: string) => {
    const newMessage = {
      type: 'MESSAGE',
      id,
      userName: name,
      profileSrc: '/profile.png',
      time: DateTime.now().toString(),
      message: payload,
    };

    clientRef.current?.send('/pub/chat', {}, JSON.stringify(newMessage));
  };

  useEffect(() => {
    clientRef.current = Stomp.over(new SockJS(URL));

    clientRef.current?.connect(
      {},
      async () => {
        const { data } = await getChatRoomMessages(userId);

        await setMessageList(data);
        await setIsConnectStomp(true);

        clientRef.current?.subscribe(
          `/sub/room/${userId}`,
          ({ body }: { body: string }) => {
            const { id, userName, profileSrc, time, message } =
              JSON.parse(body);

            const chatData: Message = {
              key: messageList.length,
              id,
              userName,
              profileSrc,
              time,
              message,
            };

            setMessageList((prev: Message[]): Message[] => [...prev, chatData]);
          },
        );
      },
      (error: Error) => {
        console.error(error);
      },
    );
    return () => {
      clientRef.current?.disconnect();
    };
  }, [userId]);

  return {
    clientRef: clientRef.current,
    handleSendMessage,
    messageList,
    setMessageList,
    isConnectStomp,
  };
}
