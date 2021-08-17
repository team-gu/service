import { ReactElement } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount: number;
  previousLabel: string;
  nextLabel: string;
  marginPagesDisplayed: number;
  pageRangeDisplayed: number;
  breakLabel: string;
  onPageChange: any;
  forcePage: number;
}

const Wrapper = styled.div`
  ${({ theme: { flexRow } }) => flexRow()}

  width: 100%;
  height: 50px;
  ul {
    display: inline-block;
    padding-left: 15px;
    padding-right: 15px;
  }

  li {
    display: inline-block;
    a {
      color: black;
      float: left;
      padding: 8px 16px;
      text-decoration: none;
      cursor: pointer;
    }
  }

  .selected {
    background-color: ${({
      theme: {
        colors: { samsungLightBlue },
      },
    }) => samsungLightBlue};
    > a {
      color: white;
    }
  }

  .disabled {
    > a {
      cursor: normal;
      color: gray;
    }
  }
`;

export default function Pagination({ ...rest }: PaginationProps): ReactElement {
  return (
    <Wrapper>
      <ReactPaginate {...rest} />
    </Wrapper>
  );
}
