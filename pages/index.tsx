import styled from 'styled-components';

const Title = styled.h1`
  font-size: 50px;
  color: ${({
    theme: {
      colors: { gray },
    },
  }) => gray};
`;

export default function Home() {
  return <Title>My page</Title>;
}
