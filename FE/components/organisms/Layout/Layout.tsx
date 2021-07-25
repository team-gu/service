import { Navbar, Footer } from '@organisms';
import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled.section`
  min-height: calc(100vh - 150px);
  margin-top: 100px;
`;

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </>
  );
}
