import { ReactElement, useState, useEffect, SyntheticEvent } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Input } from '@atoms';
import { Button, QuillEditor } from '@molecules';
import { useAuthState } from '@store';
import { urltoUpdateFile } from '@utils/dataURLtoFile';
import { getNoticeDetail, updateNotice } from '@repository/noticeRepository';

const InputWrapper = styled.div`
  ${({ theme: { flexRow } }) => flexRow()};
  margin-bottom: 50px;

  input[type='text'] {
    background-color: #f5f5f7;
    border: 0.5px solid grey;
  }
`;

const ButtonArea = styled.div`
  float: right;
`;

const Files = styled.div`
  border: 1px solid grey;
  min-height: 8vh;
  margin-top: 50px;
  display: flex;
`;

const File = styled.div`
  background-color: #e6e6e6;
  height: 24px;
  color: rgb(51, 51, 51);
  border-radius: 2px;
  overflow: hidden;
  padding: 3px 3px 3px 6px;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  border: 0.5px solid grey;
  margin: 4px;

  Icon {
    background-color: #e6e6e6;
    height: 24px;
    color: rgb(51, 51, 51);
    border-radius: 2px;
    overflow: hidden;
    padding: 3px 3px 3px 6px;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
    border: 0.5px solid grey;
  }
`;

const DeleteFile = styled.span`
  cursor: pointer;
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  padding: 4px;
  border: 0.5px solid grey;
  cursor: pointer;
`;

const Bottom = styled.div`
  margin-top: 3vh;
`;

export default function NoticeUpdate(): ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuthState();

  const [notice, setNotice] = useState(Object);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
        } = await getNoticeDetail(id);
        setNotice(data);
        setTitle(data.title);
        const ordinaryFiles = await Promise.all(
          data.noticeFiles.map((file: any) => {
            return urltoUpdateFile(
              `https://i5a202.p.ssafy.io:8080/api/file/download?nfile=${file.name}`,
              file.originalName,
              file.extension,
            );
          }),
        );
        setFiles(ordinaryFiles);
        setValue(data.content);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleValue = (e: string) => {
    setValue(e);
  };

  const handleFiles = (e: any) => {
    setFiles([e.target.files[0], ...files]);
  };

  const handleDeleteFile = (idx: number) => {
    setFiles(files.filter((file: any, index: number) => index !== idx));
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('userId', user.id);
      formData.append('title', title);
      formData.append('content', value);
      files.forEach((el: any, idx: number) => {
        formData.append(`noticeFiles[${idx}]`, files[idx]);
      });
      await updateNotice(id, formData);
      alert('수정되었습니다.');
      router.push(`/notice/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!id) return <div></div>;
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <InputWrapper>
        <Input
          value={title}
          width="90%"
          height="5vh"
          placeHolder="제목을 입력해주세요"
          func={(e: any) => setTitle(e.target.value)}
        />
      </InputWrapper>
      <QuillEditor
        theme="snow"
        value={value}
        onChange={handleValue}
        placeHolder="내용을 입력해주세요"
      />
      <Files>
        {files &&
          files.map((file: any, idx: number) => (
            <div key={idx}>
              <File>
                {file.name}
                <DeleteFile onClick={() => handleDeleteFile(idx)}>
                  | X
                </DeleteFile>
              </File>
            </div>
          ))}
      </Files>
      <Bottom>
        <ButtonArea>
          <Button title="수정" type="submit" width="3vw" />
        </ButtonArea>
        <StyledInput type="file" id="file" onChange={handleFiles} multiple />
        <StyledLabel htmlFor="file">첨부파일 추가</StyledLabel>
      </Bottom>
    </form>
  );
}
