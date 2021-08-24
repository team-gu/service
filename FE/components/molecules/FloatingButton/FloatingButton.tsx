import {
  ReactElement,
  MouseEventHandler,
  useEffect,
  useState,
  useRef,
} from 'react';
import { motion } from 'framer-motion';

import styled from 'styled-components';

import { Notification } from '@molecules';
import { Icon } from '@atoms';
import { getNotificationNumber } from '@repository/chatRepository';
import { useUiState } from '@store';

interface FloatingButtonProps {
  func?: MouseEventHandler<HTMLSpanElement>;
  isRtc?: boolean;
  id: number;
}

const Wrapper = styled(motion.div)<{ isRtc: boolean }>`
  ${({ theme: { flexRow } }) => flexRow()}
  background-color: ${({
    theme: {
      colors: { samsungLightBlue },
    },
  }) => samsungLightBlue};

  position: fixed;
  &,
  i {
    color: white;
    cursor: pointer;
  }
  ${({ isRtc }) =>
    isRtc
      ? `
    bottom: 50px;
    right: 30px;

    width: 50px;
    height: 50px;
    border-radius: 60px;

    opacity: 1;

    :hover {
      opacity: 0.75;
    }
  `
      : `
    bottom: 20px;
    right: 20px;

    width: 80px;
    height: 80px;
    border-radius: 80px;

    box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.1);

    :hover {
      opacity: 0.8;
    }
    .notification {
      position: absolute;
      top: 0;
      right: 0;
    }
  `}
`;

const variants = {
  alert: { rotate: [0, 15, -15, 15, -15, 0] },
  normal: { opacity: 100 },
};

export default function FloatingButton({
  func = () => {},
  isRtc = false,
  id = 0,
}: FloatingButtonProps): ReactElement {
  const { isChatOpen } = useUiState();

  const [unreadCount, setUnreadCount] = useState(0);
  const [shake, setShake] = useState(false);
  const unreadCountRef = useRef<number>(0);
  const isChatOpenRef = useRef<boolean>(false);

  useEffect(() => {
    unreadCountRef.current = unreadCount;
    isChatOpenRef.current = isChatOpen;
  });

  const handleGetNotificationNumber = async () => {
    try {
      if (id !== 0 && !isRtc && !isChatOpenRef.current) {
        const {
          data: {
            data: { unreadcount },
          },
        } = await getNotificationNumber(id);

        if (unreadCountRef.current < unreadcount) {
          await setShake(true);
          setTimeout(() => {
            setShake(false);
          }, 500);
        }
        setUnreadCount(unreadcount);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetNotificationNumber();
    const interval = setInterval(() => {
      handleGetNotificationNumber();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper
      onClick={func}
      whileTap={{ rotate: 90, scale: 0.9 }}
      animate={shake ? 'alert' : 'normal'}
      variants={variants}
      isRtc={isRtc}
    >
      <Icon iconName="message" size="24px" />
      {!isRtc && <Notification alertNumber={unreadCount} />}
    </Wrapper>
  );
}
