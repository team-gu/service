import { ReactElement } from 'react';
import { motion } from 'framer-motion';

import styled from 'styled-components';

import { Icon } from '@atoms';

interface FloatButtonProps {
  func: Function;
}

const Wrapper = styled(motion.div)`
  ${({ theme: { flexRow } }) => flexRow()}

  position: fixed;
  bottom: 20px;
  right: 20px;

  width: 80px;
  height: 80px;
  border-radius: 80px;

  box-shadow: 0 6px 12px 0 rgba(4, 4, 161, 0.1);

  &,
  i {
    cursor: pointer;
  }

  :hover {
    opacity: 0.8;
  }
`;

export default function FloatButton({ func }: FloatButtonProps): ReactElement {
  return (
    <Wrapper
      onClick={() => func()}
      whileTap={{ rotate: 90, scale: 0.9 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 1 },
      }}
    >
      <Icon iconName="message" size="25px" />
    </Wrapper>
  );
}
