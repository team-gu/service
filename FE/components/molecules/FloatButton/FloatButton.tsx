import { ReactElement, MouseEventHandler } from 'react';
import { motion } from 'framer-motion';

import styled from 'styled-components';

import { Icon } from '@atoms';

interface FloatButtonProps {
  func?: MouseEventHandler<HTMLSpanElement>;
  isRtc?: boolean;
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

    :hover {
      opacity: 0.8;
    }
  `}
`;

export default function FloatButton({
  func = () => {},
  isRtc = false,
}: FloatButtonProps): ReactElement {
  return (
    <Wrapper onClick={func} whileTap={{ rotate: 90, scale: 0.9 }} isRtc={isRtc}>
      <Icon iconName="message" size="24px" />
    </Wrapper>
  );
}
