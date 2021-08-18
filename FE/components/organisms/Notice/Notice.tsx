import { useEffect, useState, ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
import { Text } from '@atoms';
import { Button } from '@molecules';

interface NoticeType {
  id: number;
  title: string;
  date: Date;
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

export default function Notice(): ReactElement {
  const { user } = useAuthState();
  const router = useRouter();
  const classes = useStyles();
  const paginationClasses = PaginationStyles();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await getNotice(page, 10);
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
              func={() => router.push('/notice/edit')}
            />
          </div>
        </Header>
      )}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
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
                          <Link
                            href={{
                              pathname: '/notice/[id]',
                              query: { id: row.id },
                            }}
                          >
                            <TableCell key={column.id} align="center">
                              {value}
                            </TableCell>
                          </Link>
                          {idx === columns.length - 1 &&
                            (user.role === 3 || user.role === 4) && (
                              <StyledTableCell key="4" align="center">
                                <Button
                                  width="3vw"
                                  title="수정"
                                  func={() =>
                                    router.push(`/notice/edit/${row.id}`)
                                  }
                                />
                                <Button
                                  width="3vw"
                                  title="삭제"
                                  func={() => handleDelete(row.id)}
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
          <Pagination
            count={totalPages}
            color="primary"
            onChange={(e) => setPage(Number(e.target.innerText) - 1)}
            shape="rounded"
          />
        </div>
      </Paper>
    </>
  );
}
