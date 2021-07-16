import { ReactElement, useEffect } from 'react';

import styled from 'styled-components';
import { useAppSelector } from '@hooks';
import { LoginComponent } from '@organisms';

import { get } from '@utils/snippet';

const Title = styled.h1`
  font-size: 50px;
  color: ${({
    theme: {
      colors: { black },
    },
  }) => black};
`;

export default function Login(): ReactElement {
  const { content } = useAppSelector(get('modal'));

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <>
      <LoginComponent />
    </>
  );
}
