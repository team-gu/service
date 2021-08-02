import { ReactElement, ChangeEvent } from 'react';
import styled from 'styled-components';

import { Input, Icon } from '@atoms';

const Wrapper = styled.div`
  .searchbar-container {
    display: grid;
    grid-template-columns: auto 20px 80px;

    .searchbar-input {
      grid-column: 1 / 3;
      grid-row: 1;
      .input {
        height: 40px;
        width: 90%;
      }
      input {
        font-size: 20px;
        padding: 0 50px 0 15px;
        :focus {
          outline: none;
        }
      }
    }

    .searchbar-icon {
      grid-column: 2 / 4;
      grid-row: 1;
      z-index: 10;

      box-shadow: 0px 1px 1px 2px #eeeeee;
      background-color: #eeeeee;
      cursor: pointer;
      ${({ theme: { flexCol } }) => flexCol()}
      ${({ theme: { flexRow } }) => flexRow()}

      i {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
`;

export default function SearchUserBar(): ReactElement {
  const handleChanged = ({ target }: ChangeEvent<HTMLInputElement>) => {
    console.log(target.value);
  };

  const handleKeyPressed = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      console.log('ENTER');
    }
  };

  const handleClickSearch = () => {
    console.log("SEARCH");
  }

  return (
    <Wrapper>
      <div className="searchbar-container">
        <div className="searchbar-input">
          <Input
            width="100%"
            height="30px"
            func={handleChanged}
            onKeyPress={handleKeyPressed}
          />
        </div>
        <div className="searchbar-icon">
          <Icon iconName="search" func={handleClickSearch} />
        </div>
      </div>
    </Wrapper>
  );
}
