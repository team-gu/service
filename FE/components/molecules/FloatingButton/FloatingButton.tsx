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

interface FloatingButtonProps {
  func?: MouseEventHandler<HTMLSpanElement>;
  isRtc?: boolean;
  id: number;
}

const Wrapper = styled(motion.div)<{ isRtc: boolean }>`
  ${({ theme: { flexRow } }) => flexRow()}

  position: fixed;
  &,
  i {
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
    background-color: white;

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
  id,
}: FloatingButtonProps): ReactElement {
  const [unreadCount, setUnreadCount] = useState(0);
  const [shake, setShake] = useState(false);
  const unreadCountRef = useRef<number>(0);

  useEffect(() => {
    unreadCountRef.current = unreadCount;
  });

  const handleGetNotificationNumber = async () => {
    try {
      if (id !== 0) {
        const {
          data: {
            data: { unreadcount },
          },
        } = await getNotificationNumber(id);
        console.log(unreadCountRef.current, unreadcount);
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
    }, 5000);

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
