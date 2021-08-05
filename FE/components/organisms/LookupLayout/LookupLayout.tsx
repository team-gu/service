import { ReactElement, JSXElementConstructor } from 'react';
import styled from 'styled-components';

interface LookupLayoutProps {
  children: ReactElement<any, string | JSXElementConstructor<any>> | any;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto;
  gap: 20px;

  .filter-container {
  }

  .team-status-header {
    display: grid;
    grid-template-columns: auto 150px 100px;
    align-items: center;
    justify-items: center;
    gap: 10px;

    > div {
      width: 100%;
    }
  }

  .team-status-list-container {
    > div {
      margin-bottom: 20px;
    }
  }
`;

export default function LookupLayout({
  children,
}: LookupLayoutProps): ReactElement {
  return <Wrapper>{children}</Wrapper>;
}
