import { ReactElement, JSXElementConstructor } from 'react';
import styled from 'styled-components';

interface LookupLayoutProps {
  children: ReactElement<any, string | JSXElementConstructor<any>> | any;
  showTeamCreateBtn: boolean;
}

const Wrapper = styled.div<{ showTeamCreateBtn: boolean }>`
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: auto;
  gap: 20px;

  .sort-container {
    display: flex;
    align-items: center;
    gap: 10px;
    .sort-icon {
      flex: 1;
      transform-origin: center;
      transition: all 0.3s ease-in;
    }
    .rotated {
      transform: rotate(0.5turn);
    }
    .sort-select {
      flex: 9;
    }
  }

  .team-status-header {
    display: grid;
    ${({ showTeamCreateBtn }) =>
      showTeamCreateBtn
        ? 'grid-template-columns: auto 150px 100px;'
        : 'grid-template-columns: auto 150px;'}
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
  showTeamCreateBtn,
}: LookupLayoutProps): ReactElement {
  return <Wrapper showTeamCreateBtn={showTeamCreateBtn}>{children}</Wrapper>;
}
