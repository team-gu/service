import { ReactElement, useState, useMemo } from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useGroupBy,
  useSortBy,
  useExpanded,
  useAsyncDebounce,
  usePagination,
} from 'react-table';
import styled from 'styled-components';

import { Icon, Text } from '@atoms';

const Wrapper = styled.div`
  table {
    border-spacing: 0;
    border: 1px solid gainsboro;

    th {
      border-bottom: 1px solid black;
    }

    tr:hover {
      td {
        background-color: #fafafa !important;
      }
    }

    th,
    td {
      margin: 0;
      padding: 10px;
      border-bottom: 1px solid gainsboro;
      border-right: 1px solid gainsboro;
      vertical-align: middle;

      // Each cell should grow equally
      width: 1%;
      &.collapse {
        width: 0.0000000001%;
      }
    }
  }
`;

const CellWrapper = styled.td`
  .grouped-cell {
    display: flex;

    .expand-icon {
      i {
        font-size: 20px;
      }
    }

    .grouped-cell-text {
      margin-left: 5px;
      line-height: 20px;
    }
  }
`;

const TableHeaderItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .group-icon {
    i {
      font-size: 20px;
    }
  }

  .sort-icon {
    i {
      font-size: 20px;
      cursor: default;
    }

    > span {
      display: inline-block;
      transform-origin: center;
      transition: all 0.1s ease-in;
    }

    .rotated {
      // transform: rotate(0.5turn);
      transform: rotateX(180deg);
    }
  }

  .header-text {
    line-height: 24px;
    cursor: pointer;
  }
`;

const GlobalFilterWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  i {
    font-size: 20px;
    margin-right: 5px;
    cursor: default;
  }

  .global-filter-input {
    font-size: 16px;
    border: 0;
    border-bottom: 1px solid black;

    padding: 3px;

    :focus {
      outline: none;
    }
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  .pagination-text {
    display: inline-block;
    margin: 0 10px;
  }
`;

const Bold = styled.span`
  font-weight: 700;
`;

const HelpContainer = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: block;

  .help-content {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s;

    ${({ isOpen }) =>
      isOpen
        ? `visibility: visible;
            opacity: 1;`
        : `visibility: hidden;
            opacity: 0;`}

    position: absolute;
    z-index: 5;
    background-color: Ivory;
    box-shadow: 0px 0px 5px gray;
    border-radius: 5px;
    padding: 20px;
    width: 400px;
    bottom: 10px;
    right: 30px;

    > div {
      text-align: left;
      margin-bottom: 10px;
      line-height: 20px;

      :last-child {
        margin-bottom: 0;
      }

      i {
        font-size: 18px;
      }
    }
  }
`;

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <GlobalFilterWrapper>
      <Icon iconName="search" />
      <input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        className="global-filter-input"
      />
    </GlobalFilterWrapper>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

interface TableProps {
  columns: any[];
  data: any[];
}

export default function DashboardTable({ columns, data }: TableProps): ReactElement {
  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,

    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
  );

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <Wrapper>
      <table {...getTableProps()}>
        <thead>
          <tr>
            <th colSpan={visibleColumns.length}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
                <HelpContainer
                  onClick={() => setShowTooltip(!showTooltip)}
                  isOpen={showTooltip}
                >
                  <Icon iconName="help" />
                  <div className="help-content">
                    <div>
                      칼럼 이름을 클릭하면, 해당 칼럼을 기준으로{' '}
                      <Bold>정렬</Bold>됩니다.
                    </div>
                    <div>
                      여러번 클릭하여 오름차순, 내림차순을 변경할 수 있습니다.
                      또한 여러 칼럼을 선택하여 <Bold>다중 중렬</Bold>을 할 수
                      있습니다.
                    </div>
                    <div>
                      <Icon iconName="toggle_on" />를 클릭하면,{' '}
                      <Bold>그룹화</Bold>
                      (grouping)됩니다. 같은 칼럼을 가지는 데이터들을 묶어서 볼
                      수 있습니다.
                    </div>
                    <div>
                      <Icon iconName="search" />는 모든 데이터에 대해서 검색어를
                      포함하는 데이터를 <Bold>검색</Bold>할 수 있습니다.
                    </div>
                  </div>
                </HelpContainer>
              </div>
            </th>
          </tr>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <TableHeaderItem>
                    <div>
                      {column.canGroupBy ? (
                        // If the column can be grouped, let's add a toggle
                        <span className="group-icon">
                          <Icon
                            iconName={
                              column.isGrouped ? 'toggle_off' : 'toggle_on'
                            }
                            func={(event) => {
                              column.toggleGroupBy();
                              event.stopPropagation();
                            }}
                          />
                        </span>
                      ) : null}
                      <span className="sort-icon">
                        {column.isSorted ? (
                          <span
                            className={column.isSortedDesc ? 'rotated' : ''}
                          >
                            <Icon iconName="sort" />
                          </span>
                        ) : (
                          ''
                        )}
                      </span>
                    </div>

                    <span
                      className="header-text"
                      onClick={() => {
                        column.toggleSortBy(
                          typeof column.isSortedDesc === 'undefined'
                            ? false
                            : column.isSortedDesc === false
                            ? true
                            : undefined,
                          true,
                        );
                      }}
                    >
                      {column.render('Header')}
                    </span>
                  </TableHeaderItem>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <CellWrapper
                      // For educational purposes, let's color the
                      // cell depending on what type it is given
                      // from the useGroupBy hook
                      {...cell.getCellProps()}
                      style={{
                        background: cell.isGrouped
                          ? '#0aff0082'
                          : cell.isAggregated
                          ? '#ffa50078'
                          : cell.isPlaceholder
                          ? '#ff000042'
                          : 'white',
                      }}
                    >
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <div className="grouped-cell">
                          <span
                            {...row.getToggleRowExpandedProps()}
                            className="expand-icon"
                          >
                            <Icon
                              iconName={
                                row.isExpanded
                                  ? 'arrow_right'
                                  : 'arrow_drop_down'
                              }
                            />
                          </span>
                          <span className="grouped-cell-text">
                            {cell.render('Cell')} ({row.subRows.length})
                          </span>
                        </div>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render('Aggregated')
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render('Cell')
                      )}
                    </CellWrapper>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <PaginationContainer>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <div className="pagination-text">
          <Text
            text={`${state.pageIndex + 1} / ${pageOptions.length}`}
            fontSetting="n16m"
          />
        </div>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <select
          value={state.pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}개씩
            </option>
          ))}
        </select>
      </PaginationContainer>
    </Wrapper>
  );
}
