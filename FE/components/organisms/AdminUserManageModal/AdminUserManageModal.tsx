import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import Select, { OptionTypeBase, ActionMeta, OptionsType } from 'react-select';

import { Text, Icon, Input } from '@atoms';
import { Button, Label } from '@molecules';
import { ModalWrapper } from '@organisms';
import { Code } from '@utils/type';
import {
  createAdminClassOption,
  getAdminClassOption,
  deleteAdminClassOption,
} from '@repository/adminRepository';

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
  { value: '활성', label: '활성' },
  { value: '비활성', label: '비활성' },
];

const ROLE_OPTIONS = [
  { value: '교육생', label: '교육생' },
  { value: '퇴소생', label: '퇴소생' },
];

const MAJOR_OPTIONS = [
  { value: '전공', label: '전공' },
  { value: '비전공', label: '비전공' },
];

const CLASS_OPTIONS = [
  { value: 1, label: '서울 1반' },
  { value: 2, label: '서울 2반' },
  { value: 3, label: '서울 3반' },
  { value: 4, label: '서울 4반' },
  { value: 5, label: '서울 5반' },
];

interface UserDataRow {
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
}

interface AdminUserCreateModalProps {
  handleClickClose: () => void;
  defaultValue?: UserDataRow;
  projectId: number;
}

export default function AdminUserManageModal({
  handleClickClose,
  defaultValue,
  projectId,
}: AdminUserCreateModalProps) {
  const [studentClassOptions, setStudentClassOptions] = useState<
    OptionTypeBase[]
  >([]);

  useEffect(() => {
    // TODO: 서버에서 반 목록 가져오기
    fetchStudentClass();
    setStudentClassOptions(CLASS_OPTIONS);
  }, []);

  const [userMajor, setUserMajor] = useState<string | undefined>(
    defaultValue ? defaultValue.major : undefined,
  );
  const [studentClass, setStudentClass] = useState(
    defaultValue ? defaultValue.studentClass : null,
  );
  const [userRole, setUserRole] = useState<string | undefined>(
    defaultValue ? defaultValue.role : undefined,
  );
  const [userRegist, setUserRegist] = useState<string | undefined>(
    defaultValue ? defaultValue.regist : undefined,
  );

  const [isLoadingStudentClass, setIsLoadingStudentClass] = useState(false);
  const [showEditOptionsModal, setShowEditOptionsModal] = useState(false);

  const userEmailInputRef = useRef<HTMLInputElement>(null);
  const userNameInputRef = useRef<HTMLInputElement>(null);
  const userStudentNumberInputRef = useRef<HTMLInputElement>(null);

  const handleCreateUser = () => {
    if (!userEmailInputRef.current || userEmailInputRef.current.value === '') {
      console.log('이메일 없음');
      return;
    }
    if (!userNameInputRef.current || userNameInputRef.current.value === '') {
      console.log('이름 없음');
      return;
    }
    if (
      !userStudentNumberInputRef.current ||
      userStudentNumberInputRef.current.value === ''
    ) {
      console.log('학번 없음');
      return;
    }
    if (!userMajor) {
      console.log('전공/비전공 없음');
      return;
    }

    const param = {
      name: userNameInputRef.current.value,
      email: userEmailInputRef.current.value,
      studnetNumber: userStudentNumberInputRef.current.value,
      major: userMajor,
    };

    console.log('CREATE USER');
    console.log(param);
    // TODO: 유저 생성 API 호출
  };

  const handleUpdateUser = () => {
    if (!userEmailInputRef.current || userEmailInputRef.current.value === '') {
      console.log('이메일 없음');
      return;
    }
    if (!userNameInputRef.current || userNameInputRef.current.value === '') {
      console.log('이름 없음');
      return;
    }
    if (
      !userStudentNumberInputRef.current ||
      userStudentNumberInputRef.current.value === ''
    ) {
      console.log('학번 없음');
      return;
    }
    if (!userMajor) {
      console.log('전공/비전공 없음');
      return;
    }
    if (!studentClass) {
      console.log('반 없음');
      return;
    }
    if (!userRole) {
      console.log('교육생/퇴소생 없음');
      return;
    }
    if (!userRegist) {
      console.log('활성/비활성 없음');
      return;
    }

    const param = {
      name: userNameInputRef.current.value,
      email: userEmailInputRef.current.value,
      studnetNumber: userStudentNumberInputRef.current.value,
      major: userMajor,
      studentClass,
      role: userRole,
      regist: userRegist,
    };

    console.log('UPDATE USER');
    console.log(param);
    // TODO: 유저 수정 API 호출
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
      console.log(data);
      // TODO: 생성 결과 필요
      // setStudentClassOptions(리턴 결과)
      // setStudentClass(리턴결과 중 내가 추가했던거)
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
      console.log(data);
      // TODO: 삭제 결과 필요
      // setCategoryOptions(codesToOption(리턴 결과));
      // TODO: 반 삭제 시 선택했던거 초기화
      // setCategory(null);
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

  const onChangeExitYn = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (selectedValue) {
      setUserRole(selectedValue.value);
    } else {
      setUserRole(undefined);
    }
  };

  const onChangeProjectActivate = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (selectedValue) {
      setUserRegist(selectedValue.value);
    } else {
      setUserRegist(undefined);
    }
  };

  return (
    <ModalWrapper modalName="createUserModal" zIndex={101}>
      <Wrapper>
        <div className="modal-header">
          <Text
            text={defaultValue ? '교육생 정보 수정' : '교육생 추가'}
            fontSetting="n26b"
          />
          <div className="close-btn">
            <Icon iconName="close" func={handleClickClose} />
          </div>
        </div>
        <div className="modal-content">
          {!defaultValue && (
            <div style={{ margin: '20px 0'}}>
              <Text text="프로젝트에 추가할 교육생의 학번을 입력해주세요." />
            </div>
          )}
          <div className="input-container">
            <Label text="학번">
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
                placeHolder="예) 1234567"
                readOnly={!!defaultValue}
              />
            </Label>
          </div>

          {defaultValue && (
            <>
              <div className="input-container">
                <Label text="이름">
                  <Input
                    type="text"
                    width="100%"
                    height="40px"
                    ref={userNameInputRef}
                    refValue={
                      defaultValue && defaultValue.name ? defaultValue.name : ''
                    }
                    placeHolder="예) 김싸피"
                    readOnly={!!defaultValue}
                  />
                </Label>
              </div>

              <div className="input-container">
                <Label text="이메일">
                  <Input
                    type="email"
                    width="100%"
                    height="40px"
                    ref={userEmailInputRef}
                    refValue={
                      defaultValue && defaultValue.email
                        ? defaultValue.email
                        : ''
                    }
                    placeHolder="예) example@ssafy.com"
                  />
                </Label>
              </div>
              <div className="select-container">
                <Label text="전공/비전공">
                  <Select
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
                {studentClassOptions.length > 0 && (
                  <>
                    <Label text="반">
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
                        placeholder="예) 서울 0반"
                      />
                    </Label>
                    <div className="studnet-number-message">
                      <span>
                        "<Underline>[지역] [N]반</Underline>"의 규칙으로
                        입력해주세요. (예. 서울 1반)
                      </span>
                    </div>
                    <div
                      className="setting-icon"
                      onClick={() => setShowEditOptionsModal(true)}
                    >
                      <Icon iconName="settings" />
                    </div>
                  </>
                )}
              </div>

              <div className="select-container">
                <Label text="교육생/퇴소생">
                  <Select
                    cacheOptions
                    defaultOptions
                    value={stringToOption(userRole) || null}
                    options={ROLE_OPTIONS}
                    onChange={onChangeProjectActivate}
                    styles={customStyles}
                    defaultValue={
                      defaultValue ? stringToOption(defaultValue.role) : null
                    }
                  />
                </Label>
              </div>

              <div className="select-container">
                <Label text="프로젝트 활성/비활성">
                  <Select
                    cacheOptions
                    defaultOptions
                    value={stringToOption(userRegist) || null}
                    options={ACTIVATE_OPTIONS}
                    onChange={onChangeExitYn}
                    styles={customStyles}
                    defaultValue={
                      defaultValue ? stringToOption(userRegist) || null : null
                    }
                  />
                </Label>
              </div>
            </>
          )}
        </div>
        <div className="modal-footer">
          <Button
            title={defaultValue ? '저장' : '추가'}
            func={defaultValue ? handleUpdateUser : handleCreateUser}
          />
        </div>

        {showEditOptionsModal && (
          <ModalWrapper modalName="editOptionsModal" zIndex={910}>
            <EditOptionModal>
              <div className="edit-modal-header">
                <Text text={`[반] 옵션 리스트 삭제`} fontSetting="n16b" />
                <Text
                  text={`삭제하면 이전에 선택한 [반] 옵션이 초기화됩니다.`}
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
