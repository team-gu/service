import { useState, ChangeEventHandler } from 'react';
import styled from 'styled-components';

import { uploadExcelFile, registUsers } from '@repository/adminRepository';
import { ReactTable } from '@molecules';

const Wrapper = styled.div`
  margin-top: 30px;
  .file-input-container {
    margin: 10px 0 30px 0;

    .btn {
      padding: 5px 20px;
      border-radius: 10px;
      border: 1px solid black;
      cursor: pointer;
      font-size: 14px;
      margin-right: 10px;
      background-color: black;
      color: white;
      box-shadow: 0px 0px 4px 2px rgba(55, 53, 47, 0.4);

      transition: 0.3s;
      animation: 0.8s ease fadeIn;
      :hover {
        opacity: 0.5;
      }
      :active {
        transform: translate(1px, 1px);
      }
    }
  }

  .excel-preview-message {
    padding: 50px;
    border: 2px dashed black;
    border-radius: 5px;
    text-align: center;
  }
`;

const COLUMNS = [
  {
    Header: '학번',
    accessor: 'studentNumber',
  },
  {
    Header: '이름',
    accessor: 'name',
  },
  {
    Header: '이메일',
    accessor: 'email',
  },

  {
    Header: '전공/비전공',
    accessor: 'major',
  },
];

export default function AdminUserImport() {
  const [beforeUploadData, setBeforeUploadData] = useState<any[]>([]);

  const onSelectFile: ChangeEventHandler<HTMLInputElement> = (event: {
    target: HTMLInputElement;
  }) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('excelFile', event.target.files[0]);

      // TODO: 응답에 따라 바로 플젝에 추가하는 API를 호출할지, 회원가입 후 플젝에 추가하는 API를 호출할지 결정.
      uploadExcelFile(formData).then(({ data: { data } }) => {
        console.log(data);
        setBeforeUploadData(data);
        event.target.value = '';
      }).catch(err => {
        console.log(err);
      });
    }
  };

  const onSubmit = () => {
    console.log('submit');
    registUsers({
      users: beforeUploadData,
    }).then(({data : {data }}) => {
      console.log(data);
    });
  }

  return (
    <Wrapper>
      <div className="file-input-container">
        <label htmlFor="excel-file-input" className="btn">
          엑셀 파일 업로드
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={onSelectFile}
          id="excel-file-input"
          style={{ display: 'none' }}
        />
        {beforeUploadData.length > 0 && (
          <>
            <label className="btn" onClick={onSubmit}>
              저장하기
            </label>
            <label className="btn" onClick={() => setBeforeUploadData([])}>
              초기화
            </label>
          </>
        )}
      </div>
      <div className="excel-preview">
        {beforeUploadData.length > 0 ? (
          <ReactTable
            data={beforeUploadData}
            columns={COLUMNS}
            fullWidth
            grouping={false}
          />
        ) : (
          <div className="excel-preview-message">
            파일을 업로드하면 저장하기 전에 데이터를 확인할 수 있습니다.
          </div>
        )}
      </div>
    </Wrapper>
  );
}
