import { ReactElement } from 'react';
import { LineBackground } from '@organisms';
import { Wrapper } from './index.style';

export default function Home(): ReactElement {
  return (
    <Wrapper>
      <div className="sections">
        <LineBackground />
      </div>
    </Wrapper>
  );
}
