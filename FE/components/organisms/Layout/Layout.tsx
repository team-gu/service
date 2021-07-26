import { Navbar, Footer } from '@organisms';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled(motion.div)`
  min-height: calc(100vh - 150px);
  margin-top: 100px;
`;

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Wrapper
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
      >
        {children}
      </Wrapper>
      <Footer />
    </>
  );
}
