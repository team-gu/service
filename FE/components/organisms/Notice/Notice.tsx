import {
  useEffect,
  useState,
  useRef,
  ReactElement,
  SyntheticEvent,
} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuthState } from '@store';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { getNotice, deleteNotice } from '@repository/noticeRepository';
import { Text, Input } from '@atoms';
import { Button } from '@molecules';
import { saveItem } from '@utils/storage';

interface NoticeType {
  id: number;
  title: string;
  date: Date;
}

interface NoticeProps {
  editNotice?: Boolean;
  setEditNotice?: any;
  setEditValue?: any;
  setDetailValue?: any;
}

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  justify-content: space-between;

  > div {
    display: inline-flex;
    align-items: center;
    > i {
      font-size: 30px;
    }
    > div {
      margin-right: 10px;
    }
  }

  .manage-header-export {
    > button {
      padding: 0 15px;
      box-shadow: none;
    }
  }
`;

const StyledTableCell = styled(TableCell)`
  > button {
    margin: 0 4px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  position: absolute;
  right: 16vw;

  > button {
    margin-top: -2px;
    margin-left: 12px;
    height: 28px;
  }
`;

const columns = [
  { id: 'id', label: '번호', minWidth: 100 },
  { id: 'title', label: '제목', minWidth: 300 },
  { id: 'date', label: '등록일', minWidth: 100 },
];

function createData(id: number, title: string, date: Date) {
  return { id, title, date };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: '90vh',
  },
  container: {
    maxHeight: '100%',
  },
}));

const PaginationStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: '16px',
    },
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Notice({
  editNotice,
  setEditNotice,
  setEditValue,
  setDetailValue,
}: NoticeProps): ReactElement {
  const { user } = useAuthState();
  const router = useRouter();
  const classes = useStyles();
  const paginationClasses = PaginationStyles();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await getNotice(page, 10, '');
      setRows(
        data.content.map((notice: NoticeType) => {
          return createData(notice.id, notice.title, notice.date);
        }),
      );
      setTotalPages(data.totalPages);
    })();
  }, [page]);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleDelete = async (id: number) => {
    deleteNotice(id);
    alert('삭제되었습니다');
    router.reload(window.location.pathname);
  };

  const handleDetail = (id: number) => {
    setDetailValue(id);
  };

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    const {
      data: { data },
    } = await getNotice(page, 10, searchRef?.current?.value);
    setRows(
      data.content.map((notice: NoticeType) => {
        return createData(notice.id, notice.title, notice.date);
      }),
    );
    setTotalPages(data.totalPages);
  };

  return (
    <>
      {(user.role === 3 || user.role === 4) && (
        <Header>
          <div>
            <Text text="공지사항" fontSetting="n26b" />
          </div>

          <div className="manage-header-export">
            <Button
              title="공지사항 생성"
              width="8vw"
              func={() => {
                setEditValue(-1);
                setEditNotice(!editNotice);
              }}
            />
          </div>
        </Header>
      )}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, idx) => (
                  <TableCell
                    key={idx}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {(user.role === 3 || user.role === 4) && (
                  <TableCell key="4" align="center" style={{ minWidth: '200' }}>
                    수정/삭제
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => {
                return (
                  <TableRow
                    style={{ cursor: 'pointer' }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((column, idx) => {
                      const value = row[column.id];
                      return (
                        <>
                          <TableCell
                            key={idx}
                            align="center"
                            onClick={() =>
                              router.pathname === '/notice'
                                ? router.push(`/notice/${row.id}`)
                                : handleDetail(row.id)
                            }
                          >
                            {value}
                          </TableCell>
                          {idx === columns.length - 1 &&
                            (user.role === 3 || user.role === 4) && (
                              <StyledTableCell key="4" align="center">
                                <Button
                                  width="3vw"
                                  title="수정"
                                  func={() => {
                                    setEditValue(row.id);
                                    setEditNotice(!editNotice);
                                  }}
                                />
                                <Button
                                  width="3vw"
                                  title="삭제"
                                  func={() => {
                                    saveItem('adminPageTab', 5);
                                    handleDelete(row.id);
                                  }}
                                />
                              </StyledTableCell>
                            )}
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={paginationClasses.root}>
          <div></div>
          <Pagination
            count={totalPages}
            color="primary"
            onChange={(e) => setPage(Number(e.target.innerText) - 1)}
            shape="rounded"
          />
          <StyledForm onSubmit={handleSearch}>
            <Input
              ref={searchRef}
              type="text"
              placeHolder="제목을 입력해주세요"
              width="10vw"
            />
            <Button title="검색" type="submit" width="3vw" />
          </StyledForm>
        </div>
      </Paper>
    </>
  );
}
