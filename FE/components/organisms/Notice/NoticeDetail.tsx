import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getNoticeDetail } from '@repository/noticeRepository';
import { Icon } from '@atoms';
import { QuillEditor } from '@molecules';

const Title = styled.div`
  font-size: xx-large;
  font-weight: 800;
`;

const CreatedDate = styled.div`
  margin-top: 20px;
  margin-left: 8px;
  font-size: small;
  color: grey;
`;

const DownloadFile = styled.div`
  float: left;
  padding-left: 20px;
  line-height: 20px;
  cursor: pointer;

  i {
    font-size: 16px;
  }

  a {
    cursor: pointer;
    color: #777f88;
    text-decoration: none;
  }
`;

export default function NoticeDetail(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const [notice, setNotice] = useState(Object);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getNoticeDetail(id);
        setNotice(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!id) return <div></div>;
  return (
    <>
      <Title>{notice.title}</Title>
      <CreatedDate>{notice.createDate}</CreatedDate>
      <hr />
      <QuillEditor theme="bubble" value={notice.content} readOnly={true} />
      <hr />
      <div>
        {notice.noticeFiles &&
          notice.noticeFiles.map((file: any, idx: number) => (
            <DownloadFile key={idx}>
              <>
                <Icon iconName="file_download" />
                <Link
                  href={`https://i5a202.p.ssafy.io:8080/api/file/download?nfile=${file.name}`}
                >
                  <span>
                    {file.originalName}.{file.extension}
                  </span>
                </Link>
              </>
            </DownloadFile>
          ))}
      </div>
    </>
  );
}
