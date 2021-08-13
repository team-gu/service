import { useEffect } from 'react';
import { Navbar, Footer } from '@organisms';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useUiState, useAppDispatch, setChatOpen, useAuthState } from '@store';
import { ChatRoute } from '@organisms';
import { FloatingButton } from '@molecules';
import { VIDEO_CHAT_PATH_PREFIX, ADMIN_PATH_PREFIX } from '@utils/constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Wrapper = styled(motion.div)`
  min-height: calc(100vh - 150px);
  margin-top: 130px;
`;

const Narrow = styled.div`
  width: 70%;
  margin-left: 15%;
`;
export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isChatOpen } = useUiState();
  const {
    user: { id },
  } = useAuthState();

  useEffect(() => {
    const path = router.route;
    const requireAuthPath = [
      '/team',
      '/humanpool',
      '/userdetail',
      `/userdetail/${/\d+/}`,
    ];
    const isNotLogIn = !id || id === 0;
    const isRequireAuthPath = requireAuthPath.some((p) => path.startsWith(p));

    if (isNotLogIn) {
      if (isRequireAuthPath) {
        // alert('잘못된 접근입니다. 홈으로 이동합니다.');
        router.push('/');
      }
    }
  });

  return (
    <>
      {router.pathname.startsWith(VIDEO_CHAT_PATH_PREFIX) ||
      router.pathname.startsWith(ADMIN_PATH_PREFIX) ? (
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
