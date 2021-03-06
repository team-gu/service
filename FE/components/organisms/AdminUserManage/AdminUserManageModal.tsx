import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import Select, { OptionTypeBase, ActionMeta } from 'react-select';

import { Text, Icon, Input } from '@atoms';
import { Button, Label } from '@molecules';
import { ModalWrapper } from '@organisms';
import {
  createAdminClassOption,
  getAdminClassOption,
  deleteAdminClassOption,
} from '@repository/adminRepository';
import { useAppDispatch } from '@store';
import { Code } from '@utils/type';
import { myAlert } from '@utils/snippet';

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
  }
`;

const EditOptionModal = styled.div`
  position: relative;
  padding: 40px;

  .edit-modal-header {
    text-align: center;
    margin-bottom: 20px;

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
    max-height: 150px;
    overflow: auto;
    box-shadow: 0 0 5px 0 rgba(4, 4, 161, 0.1);

    .option-item {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding-bottom: 5px;
      border-bottom: 1px solid gainsboro;

      :last-child {
        margin-bottom: 0;
        border-bottom: none;
      }
      > span {
        margin-left: 10px;
      }
      > i {
        margin-right: 10px;
        font-size: 18px;
        color: crimson;
        cursor: pointer;
      }
    }
  }
`;

const Underline = styled.span`
  border-bottom: solid 1px black;
`;

const codesToOption = (data: any[]) => {
  return data.map((i) => ({
    ...i,
    label: i.codeName,
    value: i.code,
  }));
};

const codeToOption = (data: any) => {
  if (data) {
    return {
      ...data,
      label: data.codeName,
      value: data.code,
    };
  }
};

const stringToOption = (data: string | undefined | null) => {
  if (data) {
    return {
      label: data,
      value: data,
    };
  }
};

const customStyles = {
  menuList: (base: any) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: '120px',
  }),
  menu: (base: any) => ({
    ...base,
    marginTop: 0,
  }),
  valueContainer: (base: any) => ({
    ...base,
    fontSize: '14px',
  }),
};

const ACTIVATE_OPTIONS = [
  { value: '??????', label: '??????' },
  { value: '?????????', label: '?????????' },
];

const ROLE_OPTIONS = [
  { value: '?????????', label: '?????????' },
  { value: '?????????', label: '?????????' },
  { value: '????????????', label: '????????????' },
  { value: '?????????', label: '?????????' },
];

const MAJOR_OPTIONS = [
  { value: '??????', label: '??????' },
  { value: '?????????', label: '?????????' },
];

interface UserDataRow {
  userId: number;
  completeYn: string | null;
  major: string;
  name: string;
  region: string;
  regist: string;
  role: string;
  studentClass: string;
  studentNumber: string;
  teamId: number | null;
  teamName: string | null;
  email: string;
}

interface AdminUserCreateModalProps {
  handleClickClose: () => void;
  handleUpdateUser?: (param: any) => void;
  handleCreateUser?: (param: any) => void;
  defaultValue?: UserDataRow;
  projectId: number | undefined;
}

export default function AdminUserManageModal({
  handleClickClose,
  defaultValue,
  projectId,
  handleUpdateUser,
  handleCreateUser,
}: AdminUserCreateModalProps) {
  const dispatch = useAppDispatch();
  const [studentClassOptions, setStudentClassOptions] = useState<
    OptionTypeBase[]
  >([]);

  useEffect(() => {
    fetchStudentClass();
  }, [projectId]);

  const [userMajor, setUserMajor] = useState<string | undefined>(
    defaultValue ? defaultValue.major : undefined,
  );
  const [studentClass, setStudentClass] = useState(
    defaultValue ? defaultValue.studentClass : null,
  );
  const [userRole, setUserRole] = useState(
    defaultValue ? defaultValue.role : undefined,
  );
  const [isActivate, setIsActivate] = useState(
    defaultValue ? defaultValue.regist : undefined,
  );

  const [isLoadingStudentClass, setIsLoadingStudentClass] = useState(false);
  const [showEditOptionsModal, setShowEditOptionsModal] = useState(false);

  const userEmailInputRef = useRef<HTMLInputElement>(null);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const userStudentNumberInputRef = useRef<HTMLInputElement>(null);

  const onClickCreate = () => {
    if (!handleCreateUser) {
      return;
    }

    if (!userEmailInputRef.current || userEmailInputRef.current.value === '') {
      myAlert(dispatch, '???????????? ??????????????????');
      return;
    }
    if (!userNameInputRef.current || userNameInputRef.current.value === '') {
      myAlert(dispatch, '????????? ??????????????????');
      return;
    }
    if (
      !userStudentNumberInputRef.current ||
      userStudentNumberInputRef.current.value === ''
    ) {
      myAlert(dispatch, '????????? ??????????????????');
      return;
    }
    if (!userMajor) {
      myAlert(dispatch, '??????????????? ??????????????????');
      return;
    }
    if (!userRole) {
      myAlert(dispatch, '????????? ??????????????????');
      return;
    }

    const param = {
      name: userNameInputRef.current.value,
      email: userEmailInputRef.current.value,
      studentNumber: userStudentNumberInputRef.current.value,
      major: userMajor,
      role: userRole,
    };

    handleCreateUser(param);
  };

  const onClickUpdate = () => {
    if (!defaultValue || !handleUpdateUser) {
      return;
    }

    if (!userEmailInputRef.current || userEmailInputRef.current.value === '') {
      myAlert(dispatch, '???????????? ??????????????????');
      return;
    }
    if (!userNameInputRef.current || userNameInputRef.current.value === '') {
      myAlert(dispatch, '????????? ??????????????????');
      return;
    }
    if (
      !userStudentNumberInputRef.current ||
      userStudentNumberInputRef.current.value === ''
    ) {
      myAlert(dispatch, '????????? ??????????????????');
      return;
    }
    if (!userMajor) {
      myAlert(dispatch, '??????????????? ??????????????????');
      return;
    }
    if (!userRole) {
      myAlert(dispatch, '????????? ??????????????????');
      return;
    }
    if (!isActivate) {
      myAlert(dispatch, '???????????? ??????/???????????? ??????????????????');
      return;
    }

    const param = {
      userId: defaultValue.userId,
      projectId,
      major: userMajor,
      classId: studentClassOptions.find((c) => c.label === studentClass)?.value,
      role: userRole,
    };

    handleUpdateUser(param);
  };

  const findDefaultStudentClass = () => {
    if (studentClass) {
      return studentClassOptions.find((i) => studentClass === i.label);
    }
  };

  const fetchStudentClass = () => {
    getAdminClassOption({
      projectId,
      regionCode: 0,
    }).then(({ data: { data } }) => {
      setStudentClassOptions(codesToOption(data));
    });
  };

  const handleCreateStudentClassOption = (inputValue: string) => {
    setIsLoadingStudentClass(true);

    createAdminClassOption({
      className: inputValue,
      projectId,
    }).then(({ data: { data } }) => {
      setStudentClassOptions(codesToOption(data));
      setStudentClass(
        data.find((c: Code) => c.codeName === inputValue).codeName,
      );
      setIsLoadingStudentClass(false);
    });
  };

  const onChangeStudentClassOption = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (action.action === 'select-option' && selectedValue) {
      setStudentClass(selectedValue.label);
    } else if (action.action === 'clear') {
      setStudentClass(null);
    }
  };

  const handleOptionDelete = (deletedValue: OptionTypeBase) => {
    deleteAdminClassOption({
      classId: deletedValue.code,
    }).then(({ data: { data } }) => {
      setStudentClassOptions(codesToOption(data));
      setStudentClass(null);
    });
  };

  const onChangeMajor = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (selectedValue) {
      setUserMajor(selectedValue.value);
    } else {
      setUserMajor(undefined);
    }
  };

  const onChangeProjectActivate = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (selectedValue) {
      setIsActivate(selectedValue.value);
    } else {
      setIsActivate(undefined);
    }
  };

  const onChangeRole = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (selectedValue) {
      setUserRole(selectedValue.value);
    } else {
      setUserRole(undefined);
    }
  };

  return (
    <ModalWrapper modalName="createUserModal" zIndex={101}>
      <Wrapper>
        <div className="modal-header">
          <Text
            text={defaultValue ? '????????? ?????? ??????' : '????????? ????????????'}
            fontSetting="n26b"
          />
          <div className="close-btn">
            <Icon iconName="close" func={handleClickClose} />
          </div>
        </div>
        <div className="modal-content">
          {!defaultValue && (
            <div style={{ margin: '20px 0' }}>
              <Text
                text="????????? ????????? ?????? ???????????? ???????????????."
                isLineBreak
              />
              <Text
                text="[??????, ??????, ?????????, ????????????, ??????]??? ??????????????????."
                isLineBreak
              />
            </div>
          )}
          <div className="input-container">
            <Label text="??????">
              <Input
                type="text"
                width="100%"
                height="40px"
                ref={userStudentNumberInputRef}
                refValue={
                  defaultValue && defaultValue.studentNumber
                    ? defaultValue.studentNumber
                    : ''
                }
                placeHolder="???) 1234567"
                readOnly={!!defaultValue}
              />
            </Label>
          </div>

          <div className="input-container">
            <Label text="??????">
              <Input
                type="text"
                width="100%"
                height="40px"
                ref={userNameInputRef}
                refValue={
                  defaultValue && defaultValue.name ? defaultValue.name : ''
                }
                placeHolder="???) ?????????"
                readOnly={!!defaultValue}
              />
            </Label>
          </div>

          <div className="input-container">
            <Label text="?????????">
              <Input
                type="email"
                width="100%"
                height="40px"
                ref={userEmailInputRef}
                refValue={
                  defaultValue && defaultValue.email ? defaultValue.email : ''
                }
                placeHolder="???) example@ssafy.com"
                readOnly={!!defaultValue}
              />
            </Label>
          </div>

          <div className="select-container">
            <Label text="????????????">
              <Select
                isSearchable={false}
                cacheOptions
                defaultOptions
                value={stringToOption(userMajor) || null}
                options={MAJOR_OPTIONS}
                onChange={onChangeMajor}
                styles={customStyles}
                defaultValue={
                  defaultValue ? stringToOption(defaultValue.major) : null
                }
              />
            </Label>
          </div>

          <div className="select-container">
            <Label text="??????">
              <Select
                isSearchable={false}
                cacheOptions
                defaultOptions
                value={stringToOption(userRole) || null}
                options={ROLE_OPTIONS}
                onChange={onChangeRole}
                styles={customStyles}
                defaultValue={
                  defaultValue ? stringToOption(defaultValue.role) : null
                }
              />
            </Label>
          </div>

          {defaultValue && (
            <>
              <div className="select-container">
                <Label text="???">
                  <CreatableSelect
                    isClearable
                    value={stringToOption(studentClass) || null}
                    isDisabled={isLoadingStudentClass}
                    isLoading={isLoadingStudentClass}
                    cacheOptions
                    defaultOptions
                    options={studentClassOptions}
                    onChange={onChangeStudentClassOption}
                    defaultValue={findDefaultStudentClass()}
                    styles={customStyles}
                    onCreateOption={handleCreateStudentClassOption}
                    placeholder="???) ?????? 0???"
                  />
                </Label>
                <div className="studnet-number-message">
                  <span>
                    "<Underline>[??????] [N]???</Underline>"??? ????????????
                    ??????????????????. (???. ?????? 1???)
                  </span>
                </div>
                <div
                  className="setting-icon"
                  onClick={() => setShowEditOptionsModal(true)}
                >
                  <Icon iconName="settings" />
                </div>
              </div>

              <div className="select-container">
                <Label text="???????????? ??????/?????????">
                  <Select
                    isSearchable={false}
                    cacheOptions
                    defaultOptions
                    value={stringToOption(isActivate) || null}
                    options={ACTIVATE_OPTIONS}
                    onChange={onChangeProjectActivate}
                    styles={customStyles}
                    defaultValue={
                      defaultValue ? stringToOption(isActivate) || null : null
                    }
                  />
                </Label>
              </div>
            </>
          )}
        </div>
        <div className="modal-footer">
          <Button
            title={defaultValue ? '??????' : '??????'}
            func={defaultValue ? onClickUpdate : onClickCreate}
          />
        </div>

        {showEditOptionsModal && (
          <ModalWrapper modalName="editOptionsModal" zIndex={910}>
            <EditOptionModal>
              <div className="edit-modal-header">
                <Text text={`[???] ?????? ????????? ??????`} fontSetting="n16b" />
                <Text
                  text={`???????????? ????????? ????????? [???] ????????? ??????????????????.`}
                  fontSetting="n12m"
                  color="crimson"
                />
                <div className="close-btn">
                  <Icon
                    iconName="close"
                    func={() => setShowEditOptionsModal(false)}
                  />
                </div>
              </div>
              <div className="modal-content">
                {studentClassOptions.map((option, i) => (
                  <div className="option-item" key={i}>
                    <span>{option.label}</span>
                    <Icon
                      iconName="delete"
                      func={() => handleOptionDelete(option)}
                    />
                  </div>
                ))}
              </div>
            </EditOptionModal>
          </ModalWrapper>
        )}
      </Wrapper>
    </ModalWrapper>
  );
}
