import { ReactElement, useRef } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { RegisterComponent } from '@organisms';

export default function User(): ReactElement {
  return (
    <>
      <RegisterComponent />
    </>
  );
}
