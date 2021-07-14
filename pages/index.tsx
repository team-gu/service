import { ReactElement, useEffect } from 'react';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Modal, Login } from '@organisms';
import { MODALS } from '@utils/constants';

import { get } from '@utils/snippet';
import GlobalStyle from '@styles/globalStyles';

const Title = styled.h1`
  font-size: 50px;
  color: ${({
    theme: {
      colors: { black },
    },
  }) => black};
`;

export default function Home(): ReactElement {
  const { content } = useAppSelector(get('modal'));

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <>
      <GlobalStyle />
      <Title>My page</Title>
      <Login />
      <Modal modalName={MODALS.ALERT_MODAL} />
    </>
  );
}
