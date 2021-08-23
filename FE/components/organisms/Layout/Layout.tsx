import { Navbar, Footer } from '@organisms';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useUiState, useAppDispatch, setChatOpen, useAuthState } from '@store';
import { ChatRoute } from '@organisms';
import { FloatingButton } from '@molecules';
import { VIDEO_CHAT_PATH_PREFIX, ADMIN_PATH_PREFIX } from '@utils/constants';
import { respondTo } from '@styles/respondTo';

interface LayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled(motion.div)`
  min-height: calc(100vh - 160px);
  margin-top: 130px;
`;

const Narrow = styled.div`
  width: 70%;
  margin-left: 15%;
  ${respondTo.mobile`
    width: 90%;
    margin-left: 5%;
  `}
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
      {router.pathname.startsWith(VIDEO_CHAT_PATH_PREFIX) ||
      router.pathname.startsWith(ADMIN_PATH_PREFIX) ? (
        <>{children}
          {isChatOpen && id !== 0 && <ChatRoute />}
            {id !== 0 && (
              <FloatingButton
                func={() => dispatch(setChatOpen({ isChatOpen: true }))}
                id={id}
              />
            )}
        </>
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
            <Narrow>{children}</Narrow>
            {isChatOpen && id !== 0 && <ChatRoute />}
            {id !== 0 && (
              <FloatingButton
                func={() => dispatch(setChatOpen({ isChatOpen: true }))}
                id={id}
              />
            )}
          </Wrapper>
          <Footer />
        </>
      )}
    </>
  );
}
