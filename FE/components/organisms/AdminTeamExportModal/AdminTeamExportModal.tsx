import { useState, ChangeEventHandler } from 'react';
import styled from 'styled-components';

import { Text, Icon } from '@atoms';
import { ModalWrapper } from '@organisms';

const Wrapper = styled.div`
  position: relative;
  width: 350px;
  padding: 40px;

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
    margin-bottom: 20px;
  }

  .download-icon-container {
    text-align: center;
    margin-bottom: 10px;

    > i {
      color: white;
      background-color: green;
      font-size: 30px;
      width: 30px;
      border-radius: 5px;
      padding: 5px;
      cursor: pointer;
    }
  }
`;

interface AdminTeamExportModalProps {
  handleClickClose: () => void;
  handleClickDownload: () => void;
}

export default function AdminTeamExportModal({
  handleClickClose,
  handleClickDownload,
}: AdminTeamExportModalProps) {
  return (
    <ModalWrapper modalName="adminTeamExportModal">
      <Wrapper>
        <div className="modal-header">
          <Text text="팀 정보 내보내기 (export)" fontSetting="n26b" />
          <div className="close-btn">
            <Icon iconName="close" func={handleClickClose} />
          </div>
        </div>
        <div className="modal-description">
          <Text
            text={`현재 프로젝트의 전체적인 팀 구성 정보를 엑셀로 다운로드받을 수 있습니다.`}
            isLineBreak
          />
        </div>
        <div className="download-icon-container">
          <Icon iconName="download_file" func={handleClickDownload} />
        </div>
      </Wrapper>
    </ModalWrapper>
  );
}
