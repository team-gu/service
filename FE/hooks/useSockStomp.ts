import { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useRouter } from 'next/router';

import { useAuthState } from '@store';
import { getChatRoomMessages } from '@repository/chatRepository';
import { ChatNormal } from '@types/chat-type';

interface useSockStompProps {
  room_id?: number | undefined;
}

const URL = 'https://i5a202.p.ssafy.io:8080/stomp/chat';

export default function useSockStomp({ room_id }: useSockStompProps) {
  // TODO: login response에 profileSrc가 추가되면 store에서 가져오도록 변경
  const router = useRouter();
  const {
    user: { id },
  } = useAuthState();
  const [messageList, setMessageList] = useState<ChatNormal[]>([]);
  const [isConnectStomp, setIsConnectStomp] = useState(true);
  // TODO: clientRef 타입 정의 해야함
  const clientRef = useRef();

  const handleSendMessage = (payload: string) => {
    const newMessage = {
      room_id,
      sender_id: id,
      message: payload,
    };

    clientRef.current?.send(
      '/send/chat/message',
      {},
      JSON.stringify(newMessage),
    );
  };

  const handleSendRtcLink = async (user_id1: number, user_id2: number) => {
    clientRef.current = await Stomp.over(new SockJS(URL));

    clientRef.current?.connect({}, async () => {
      await clientRef.current?.send(
        '/send/chat/messageRTC',
        {},
        JSON.stringify({
          user_id1,
          user_id2,
        }),
      );
      router.push(`rtc/${user_id2}`);
      clientRef.current?.disconnect();
    });
  };

  useEffect(() => {
    if (room_id) {
      (async () => {
        clientRef.current = await Stomp.over(new SockJS(URL));

        clientRef.current?.connect(
          {},
          async () => {
            const {
              data: { data },
            } = await getChatRoomMessages(room_id);

            await setMessageList(data);
            await setIsConnectStomp(true);

            clientRef.current?.subscribe(
              `/receive/chat/room/${room_id}`,
              ({ body }: { body: string }) => {
                const { create_date_time, message, sender_id, sender_name } =
                  JSON.parse(body);

                const chatData: ChatNormal = {
                  create_date_time,
                  message,
                  sender_id,
                  sender_name,
                };

                setMessageList((prev: ChatNormal[]): ChatNormal[] => [
                  ...prev,
                  chatData,
                ]);
              },
            );
          },
          (error: Error) => {
            console.error(error);
          },
        );
      })();
      return () => {
        clientRef.current?.disconnect();
      };
    }
  }, [room_id]);

  return {
    clientRef: clientRef.current,
    handleSendMessage,
    handleSendRtcLink,
    messageList,
    setMessageList,
    isConnectStomp,
  };
}
