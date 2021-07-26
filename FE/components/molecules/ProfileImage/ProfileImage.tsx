import { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface ProfileImageProps {
  src: string;
  size?: number;
  isActive?: boolean;
}

const Wrapper = styled.div<{ size: number; isActive: boolean }>`
  border-radius: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  ${({
    isActive,
    theme: {
      colors: { daangn },
    },
  }) => isActive && `border: 3px solid ${daangn};`}
`;

export default function ProfileImage({
  src = '/profile.svg',
  size = 50,
  isActive = false,
}: ProfileImageProps): ReactElement {
  return (
    <Wrapper size={size} isActive={isActive}>
      <Image src={src} alt="profile" width={size} height={size} />
    </Wrapper>
  );
}
