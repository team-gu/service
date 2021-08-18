import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { Text, Icon, Input } from '@atoms';
import { Button, Label } from '@molecules';
import { ModalWrapper } from '@organisms';

const Wrapper = styled.div`
  input {
    box-sizing: border-box;
  }
  i {
    cursor: pointer;
  }

  position: relative;
  width: 400px;
  padding: 0 50px;
  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 5px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar-track-piece:start {
    margin-top: 10px;
  }
  ::-webkit-scrollbar-track-piece:end {
    margin-bottom: 10px;
  }

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

  .modal-content {
    text-align: center;
    margin-bottom: 40px;
  }

  .modal-footer {
    text-align: center;
    padding-bottom: 30px;
  }
`;

interface AdminProjectUserDeleteModalProps {
  studnetName: string;
  handleClickClose: () => void;
  handleClickDelete: () => void;
}

export default function AdminProjectUserDeleteModal({
  studnetName,
  handleClickClose,
  handleClickDelete,
}: AdminProjectUserDeleteModalProps) {
  return (
    <ModalWrapper modalName="deleteProjectUserModal" zIndex={101}>
      <Wrapper>
        <div className="modal-header">
          <Text text="교육생 제외" fontSetting="n26b" />
          <div className="close-btn">
            <Icon iconName="close" func={handleClickClose} />
          </div>
        </div>
        <div className="modal-content">
          <Text
            text={`[${studnetName}] 교육생을 프로젝트에서 제외시키겠습니까?`}
            fontSetting="n14m"
            isLineBreak
          />
        </div>
        <div className="modal-footer">
          <Button title="삭제" func={handleClickDelete} width={'100px'} />
        </div>
      </Wrapper>
    </ModalWrapper>
  );
}
