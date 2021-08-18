import { useEffect, useState, ReactElement } from 'react';
import { getNotice, deleteNotice } from '@repository/noticeRepository';
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
import { Button } from '@molecules';

interface NoticeType {
  id: number;
  title: string;
  date: Date;
}

const columns = [
  { id: 'id', label: '번호', minWidth: 100 },
  { id: 'title', label: '제목', minWidth: 500 },
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
        <Button
          title="공지사항 생성"
          width="8vw"
          func={() => router.push('/notice/edit')}
        />
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
                    {columns.map((column) => {
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
                        </>
                      );
                    })}
                    {(user.role === 3 || user.role === 4) && (
                      <>
                        <Button
                          width="3vw"
                          title="수정"
                          func={() => router.push(`/notice/edit/${row.id}`)}
                        />
                        <Button
                          width="3vw"
                          title="삭제"
                          func={() => handleDelete(row.id)}
                        />
                      </>
                    )}
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
          />
        </div>
      </Paper>
    </>
  );
}
