import { useState, useRef, SyntheticEvent, ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useAuthState } from '@store';
import { postNotice } from '@repository/noticeRepository';
import { Input } from '@atoms';
import { Button, QuillEditor } from '@molecules';

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

export default function NoticeEdit(): ReactElement {
  const router = useRouter();

  const { user } = useAuthState();

  const [value, setValue] = useState('');
  const [files, setFiles] = useState<any>([]);

  const titleRef = useRef<HTMLInputElement>(null);
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
      formData.append('title', titleRef?.current?.value);
      formData.append('content', value);
      files.forEach((el: any, idx: number) => {
        formData.append(`noticeFiles[${idx}]`, files[idx]);
      });
      await postNotice(formData);
      alert('등록되었습니다.');
      router.push('/notice');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <InputWrapper>
        <Input
          ref={titleRef}
          width="90%"
          height="5vh"
          placeHolder="제목을 입력해주세요"
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
          <Button title="확인" type="submit" width="3vw" />
        </ButtonArea>
        <StyledInput type="file" id="file" onChange={handleFiles} multiple />
        <StyledLabel htmlFor="file">첨부파일 추가</StyledLabel>
      </Bottom>
    </form>
  );
}
