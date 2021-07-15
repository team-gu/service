import { ReactElement, useEffect } from 'react';

import { useAppDispatch } from '@hooks';
import { setUserInfo } from '@store';

export default function User(): ReactElement {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dispatch) {
      (async () => {
        await dispatch(setUserInfo());
      })();
    }
  }, [dispatch]);

  return <></>;
}
