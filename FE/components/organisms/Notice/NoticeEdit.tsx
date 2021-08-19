import { useState, useEffect, SyntheticEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuthState } from '@store';
import {
  postNotice,
  getNoticeDetail,
  updateNotice,
} from '@repository/noticeRepository';
import { Input } from '@atoms';
import { Button, QuillEditor } from '@molecules';
import { urltoUpdateFile } from '@utils/dataURLtoFile';

interface NoticeEditProps {
  edit: Boolean;
  setEditNotice: any;
  editValue: any;
}

const InputWrapper = styled.div`
  ${({ theme: { flexRow } }) => flexRow()};
  margin: 0 25px 12px 0;
  input[type='text'] {
    padding-left: 16px;
    background-color: #f5f5f7;
    border: 0.5px solid #cccccc;
  }
`;

const ButtonArea = styled.div`
  float: right;

  > button {
    margin: 0 4px;
  }
`;

const Files = styled.div`
  border: 1px solid #cccccc;
  border-radius: 2px;
  min-height: 8vh;
  margin-top: 50px;
  display: flex;
  padding: 5px;

  > p {
    padding: 12px;
    font-size: 14px;
    color: #ccc;
  }
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
  padding: 8px;
  border: 0.5px solid grey;
  cursor: pointer;
  border-radius: 8px;
  color: #000;
`;

const Bottom = styled.div`
  margin-top: 3vh;
`;

export default function NoticeEdit({
  edit,
  setEditNotice,
  editValue,
}: NoticeEditProps): ReactElement {
  const router = useRouter();
  const { user } = useAuthState();

  const [notice, setNotice] = useState(Object);
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    if (editValue >= 0) {
      (async () => {
        try {
          const {
            data: { data },
          } = await getNoticeDetail(editValue);
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
    }
  }, []);

  const handleValue = (e: string) => {
    setValue(e);
  };

  const handleFiles = (e: any) => {
    console.log(e.target.files[0]);
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
      {
        editValue >= 0
          ? (await updateNotice(editValue, formData), alert('수정되었습니다.'))
          : (await postNotice(formData), alert('등록되었습니다.'));
      }
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  if (!editValue) return <div></div>;
  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <InputWrapper>
        <Input
          value={title}
          width="100%"
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
        {files.length ? (
          files.map((file: any, idx: number) => (
            <div key={idx}>
              <File>
                {file.name}
                <DeleteFile onClick={() => handleDeleteFile(idx)}>
                  | X
                </DeleteFile>
              </File>
            </div>
          ))
        ) : (
          <p>첨부파일이 없습니다.</p>
        )}
      </Files>
      <Bottom>
        <ButtonArea>
          <Button
            title={editValue >= 0 ? '수정' : '확인'}
            type="submit"
            width="3vw"
          />
          <Button title="취소" width="3vw" func={() => setEditNotice(!edit)} />
        </ButtonArea>
        <StyledInput type="file" id="file" onChange={handleFiles} multiple />
        <StyledLabel htmlFor="file">첨부파일 추가</StyledLabel>
      </Bottom>
    </form>
  );
}
