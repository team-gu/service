import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useAppDispatch, useAuthState, setLoading, setUser } from '@store';
import { saveItem, loadItem } from '@utils/storage';
import { getUserDetailbyRefresh } from '@repository/userprofile';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuthState();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const accessToken = loadItem('accessToken');
    if (accessToken && !user.name) {
      (async () => {
        try {
          const path = router.route;
          const {
            data: { data },
          } = await getUserDetailbyRefresh();
          saveItem('accessToken', data.accessToken);
          dispatch(setUser(data.userInfo));
          router.push(path);
        } catch (e) {
          console.error(e);
        }
      })();
    } else {
      setFlag(true);
      router.push('/');
    }
  }, []);

  useEffect(() => {
    const start = () => {
      dispatch(setLoading({ isLoading: true }));
    };
    const end = () => {
      dispatch(setLoading({ isLoading: false }));
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    const path = router.route;
    const requireAuthPath = [
      '/team',
      '/humanpool',
      '/userdetail',
      `/userdetail/${/\d+/}`,
      `/rtc/${/\d+/}`,
      '/admin',
    ];
    const isNotLogIn = !user.id || user.id === 0;
    const isRequireAuthPath = requireAuthPath.some((p) => path.startsWith(p));

    if (isNotLogIn) {
      if (isRequireAuthPath) {
        router.push('/');
      }
    }
  });

  if (user.name || flag) {
    return children;
  }
  return null;
}
