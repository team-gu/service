import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
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
const URL = 'http://211.193.45.112:8080/stomp/chat';

export default function useSockStomp({ userId }: useSockStompProps) {
  // TODO: login response에 profileSrc가 추가되면 store에서 가져오도록 변경
  const {
    user: { id, name },
  } = useAuthState();
  const [messageList, setMessageList] = useState<Message[]>(CHAT_DUMMY_DATA);
  const [isConnectStomp, setIsConnectStomp] = useState(true);
  // TODO: clientRef 타입 정의 해야함
  const clientRef = useRef();

  const handleSendMessage = (payload: string) => {
    const newMessage = {
      room_id: id,
      sender_id: name,
      message: payload,
    };

    clientRef.current?.send(
      '/send/chat/message',
      {},
      JSON.stringify(newMessage),
    );
  };

  console.log(clientRef.current);

  useEffect(() => {
    (async () => {
      clientRef.current = await Stomp.over(new SockJS(URL));

      clientRef.current?.connect(
        { 'Access-Control-Allow-Origin': '*' },
        async () => {
          const { data } = await getChatRoomMessages(userId);

          await setMessageList(data);
          await setIsConnectStomp(true);
          clientRef.current.send(
            '/send/chat/message',
            {},
            JSON.stringify('제발'),
          );
          console.log('???');
          clientRef.current?.subscribe(
            `/receive/chat/room/${userId}`,
            ({ body }: { body: string }) => {
              console.log('????');
              const { room_id, sender_id, send_date, message } =
                JSON.parse(body);

              const chatData: Message = {
                key: messageList.length,
                id: room_id,
                userName: sender_id,
                profileSrc: '/profile.png',
                time: send_date,
                message,
              };

              setMessageList((prev: Message[]): Message[] => [
                ...prev,
                chatData,
              ]);
            },
          );
        },
        (error: Error) => {
          console.log(error, '??');
        },
      );
    })();
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
