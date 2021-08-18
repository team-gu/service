import { ReactElement } from 'react';
import { AdminLayout } from '@organisms';
import { useAuthState } from '@store';

export default function Admin(): ReactElement {
  const { user : { role }} = useAuthState();

  return (
    <>
      {role !== 3 && role !== 4 ? (
        <div style={{
          padding: '50px',
        }}>
          권한이 없습니다. 다시 로그인 한 후에 시도해주세요.
        </div>
      ) : (
        <AdminLayout />
      )}
      
    </>
  );
}
