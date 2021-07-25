import { ReactElement } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface ProfileImageProps {
  src: string;
  size?: number;
}

const Wrapper = styled.div<{ size: number }>`
  border-radius: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export default function ProfileImage({
  src = '/profile.svg',
  size = 50,
}: ProfileImageProps): ReactElement {
  return (
    <Wrapper size={size}>
      <Image src={src} alt="profile" width={size} height={size} />
    </Wrapper>
  );
}
