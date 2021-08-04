import { Navbar, Footer } from '@organisms';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useUiState, useAppDispatch, setChatOpen, useAuthState } from '@store';
import { ChatRoute } from '@organisms';
import { FloatingButton } from '@molecules';
import { VIDEO_CHAT_PATH_PREFIX } from '@utils/constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled(motion.div)`
  min-height: calc(100vh - 150px);
  margin-top: 100px;
`;

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isChatOpen } = useUiState();
  const {
    user: { id },
  } = useAuthState();

  return (
    <>
      {router.pathname.startsWith(VIDEO_CHAT_PATH_PREFIX) ? (
        <>{children}</>
      ) : (
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
            {isChatOpen && <ChatRoute />}
            {id !== 0 && (
              <FloatingButton
                func={() => dispatch(setChatOpen({ isChatOpen: true }))}
              />
            )}
          </Wrapper>
          <Footer />
        </>
      )}
    </>
  );
}
