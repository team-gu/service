import { useState, ChangeEventHandler } from 'react';
import styled from 'styled-components';

import { Text, Icon } from '@atoms';
import { ModalWrapper } from '@organisms';

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  padding: 30px;

  .modal-header {
    text-align: center;
    padding-top: 40px;
    margin-bottom: 40px;

    .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;

      i {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }

  .modal-description {
    margin-bottom: 50px;
  }

  .file-input-container {
    margin-bottom: 30px;
    text-align: center;

    .btn {
      padding: 7px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      margin-right: 10px;
      color: white;
      box-shadow: 0px 0px 2px 1px gray;

      transition: 0.3s;
      animation: 0.8s ease fadeIn;
      :hover {
        opacity: 0.7;
      }
      :active {
        transform: translate(1px, 1px);
      }
    }

    .green {
      background-color: green;
    }
  }
`;

interface AdminUserImportModalProps {
  handleClickClose: () => void;
  handleImportExcel: ChangeEventHandler<HTMLInputElement>;
}

export default function AdminUserClassSettingModal({
  handleClickClose,
  handleImportExcel,
}: AdminUserImportModalProps) {
  return (
    <ModalWrapper modalName="adminUserImportModal" zIndex={99}>
      <Wrapper>
        <div className="modal-header">
          <Text
            text="교육생 반 설정"
            fontSetting="n26b"
            isLineBreak
          />
          <div className="close-btn">
            <Icon iconName="close" func={handleClickClose} />
          </div>
        </div>
        <div className="modal-description">
          <Text
            text="엑셀 파일(.xlsx, .xls)을 업로드하여 한 번에 교육생들의 반을 설정합니다."
            isLineBreak
          />
        </div>

        <div className="file-input-container">
          <label htmlFor="excel-file-input" className="btn green">
            엑셀 파일 선택
          </label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleImportExcel}
            id="excel-file-input"
            style={{ display: 'none' }}
          />
        </div>
      </Wrapper>
    </ModalWrapper>
  );
}
