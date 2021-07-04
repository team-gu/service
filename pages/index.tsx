import { useEffect } from 'react';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Modal } from '@organisms';
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

export default function Home() {
  const { content } = useSelector(get('modal'));

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <>
      <GlobalStyle />
      <Title>My page</Title>
      <Modal modalName={MODALS.ALERT_MODAL} />
    </>
  );
}
