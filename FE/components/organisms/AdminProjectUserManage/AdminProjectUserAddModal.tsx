import { useState } from 'react';
import styled from 'styled-components';

import { Text, Icon } from '@atoms';
import { Button, Label, UserSelectProjectAutoComplete } from '@molecules';
import { ModalWrapper } from '@organisms';
import { MemberOption } from '@utils/type';

const Wrapper = styled.div<{ containsUserId: number | undefined }>`
  input {
    box-sizing: border-box;
  }
  i {
    cursor: pointer;
  }

  position: relative;
  width: 400px;
  padding: 0 50px;

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
    .input-container {
      margin-bottom: 20px;

      input {
        padding: 0 10px;
      }
    }

    .select-container {
      position: relative;
      margin-bottom: 30px;

      .studnet-number-message {
        font-size: 12px;
      }

      .setting-icon {
        position: absolute;
        top: 3px;
        right: 4px;
        display: inline-block;
        cursor: pointer;

        i {
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }

  .modal-footer {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;

    > button {
      ${({ containsUserId }) =>
        !containsUserId
          ? `
            opacity: 0.5;
            cursor: not-allowed;
            `
          : ''}
    }
  }
`;

interface AdminProjectUserAddModalProps {
  projectId: number;
  handleClickClose: () => void;
  handleClickAdd: (userId: number) => void;
}

export default function AdminProjectUserAddModal({
  projectId,
  handleClickClose,
  handleClickAdd,
}: AdminProjectUserAddModalProps) {
  const [containsUserId, setContainsUserId] = useState<number>();
  const handleChangeUserSelect = (selectedUser: MemberOption | null) => {
    if (selectedUser) {
      setContainsUserId(selectedUser.id);
    } else {
      setContainsUserId(undefined);
    }
  };

  return (
    <ModalWrapper modalName="createUserModal" zIndex={101}>
      <Wrapper containsUserId={containsUserId}>
        <div className="modal-header">
          <Text text="????????? ??????" fontSetting="n26b" />
          <div className="close-btn">
            <Icon iconName="close" func={handleClickClose} />
          </div>
        </div>
        <div className="modal-content">
          <div style={{ margin: '20px 0' }}>
            <Text text="??????????????? ????????? ???????????? ??????????????????." />
            <Text text="??????, ??????, ???????????? ?????? ???????????????." />
          </div>
          <div className="input-container">
            <Label text="?????????">
              <UserSelectProjectAutoComplete
                projectId={projectId}
                handleChangeUserSelect={handleChangeUserSelect}
              />
            </Label>
          </div>
        </div>
        <div className="modal-footer">
          {containsUserId ? (
            <Button
              title="??????"
              func={() => handleClickAdd(containsUserId)}
              width={'100px'}
            />
          ) : (
            <Button title="???????????? ??????????????????" width={'200px'} />
          )}
        </div>
      </Wrapper>
    </ModalWrapper>
  );
}
