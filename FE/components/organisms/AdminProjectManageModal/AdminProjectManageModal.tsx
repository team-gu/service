import { ReactElement, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { OptionTypeBase, ActionMeta, OptionsType } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { Project, Code } from '@utils/type';
import { Input, Text, Icon } from '@atoms';
import { Label, Button } from '@molecules';
import { ModalWrapper } from '@organisms';
import { CODE_ID } from '@utils/constants';
import {
  getAdminProjectCode,
  createAdminProjectOption,
  deleteAdminProjectOption,
  createAdminProject,
  updateAdminProject,
} from '@repository/adminRepository';

const Wrapper = styled.div`
  input {
    box-sizing: border-box;
  }

  .input {
    margin-bottom: 10px;
  }

  display: grid;
  position: relative;
  width: 500px;
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

  grid-template-columns: 1fr 1fr;

  .modal-header {
    grid-column: 1 / 3;
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

  .project-stage-container {
    position: relative;
    margin-right: 10px;
    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .project-category-container {
    position: relative;
    margin-left: 10px;
    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .project-stage-category-message {
    grid-column: 1 / 3;
    margin-bottom: 20px;
  }

  .project-track-container {
    grid-column: 1 / 3;
    position: relative;
    margin-bottom: 20px;

    .input {
      margin: 0;
      > input {
        padding: 0 60px 0 10px;
        height: 40px;
      }
    }

    .flex-container {
      display: flex;

      > div:nth-child(2) {
        flex-grow: 0;
        flex-shrink: 0;
      }
    }
  }

  .project-activate-date-container {
    grid-column: 1 / 3;
    margin-bottom: 20px;

    input {
      padding: 0 10px;
    }
  }

  .project-date-container {
    grid-column: 1 / 3;

    .flex-container {
      display: flex;
      justify-content: space-between;
      gap: 15px;

      > div {
        flex: 1;
        > input {
          padding: 0 10px;
        }
      }
    }
  }

  .modal-footer {
    grid-column: 1 / 3;
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .incorrect-select-shake {
    animation: shake 0.2s ease-in-out 0s 2;
    box-shadow: 0 0 5px crimson;
    outline: none;
    border: 1px solid crimson;
  }

  .incorrect-track-add-btn {
    animation: shake 0.2s ease-in-out 0s 2;
    box-shadow: 1px 0 5px crimson;
  }

  @keyframes shake {
    0% {
      margin-left: 0rem;
    }
    25% {
      margin-left: 0.5rem;
    }
    75% {
      margin-left: -0.5rem;
    }
    100% {
      margin-left: 0rem;
    }
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
`;

const EditOptionModal = styled.div`
  position: relative;
  padding: 40px;

  .modal-header {
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
};

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

interface ProjectManageModalProps {
  defaultValue?: Project;
  handleClickClose: () => void;
  closeModalAndRerender: () => void;
}

export default function ProjectManageModal({
  defaultValue,
  handleClickClose,
  closeModalAndRerender,
}: ProjectManageModalProps): ReactElement {
  const [stageOptions, setStageOptions] = useState<OptionTypeBase[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<OptionTypeBase[]>([]);
  const [trackOptions, setTrackOptions] = useState<OptionTypeBase[]>([]);

  useEffect(() => {
    getAdminProjectCode({ codeId: CODE_ID['기수'] }).then(
      ({ data: { data } }) => {
        setStageOptions(codesToOption(data));
      },
    );
    getAdminProjectCode({ codeId: CODE_ID['구분'] }).then(
      ({ data: { data } }) => {
        setCategoryOptions(codesToOption(data));
      },
    );
    getAdminProjectCode({ codeId: CODE_ID['트랙'] }).then(
      ({ data: { data } }) => {
        setTrackOptions(codesToOption(data));
      },
    );
  }, []);

  const [stage, setStage] = useState(defaultValue ? defaultValue.stage : null);
  const [category, setCategory] = useState(
    defaultValue ? defaultValue.project : null,
  );
  const [tracks, setTracks] = useState(defaultValue ? defaultValue.track : []);

  const [isLoadingStage, setIsLoadingStage] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);

  const [showEditOptionsModal, setShowEditOptionsModal] = useState<
    '기수' | '구분' | '트랙' | ''
  >('');

  const projcetActiveDateInputRef = useRef<HTMLInputElement>(null);
  const projcetStartDateInputRef = useRef<HTMLInputElement>(null);
  const projcetEndDateInputRef = useRef<HTMLInputElement>(null);

  const handleCreateProject = () => {
    const project = validateAndMakeProject();
    if (!project) {
      return;
    }

    createAdminProject(project).then(() => {
      closeModalAndRerender();
    });
  };

  const handleUpdateProject = () => {
    const project = validateAndMakeProject();
    if (!project) {
      return;
    }

    updateAdminProject({ project, projectId: project.id }).then(() => {
      closeModalAndRerender();
    });
  };

  const validateAndMakeProject = () => {
    if (!stage) {
      console.log('기수 없음');
      return;
    }
    if (!category) {
      console.log('구분 없음');
      return;
    }
    if (tracks.length == 0) {
      console.log('트랙 없음');
      return;
    }
    if (
      !projcetActiveDateInputRef.current ||
      projcetActiveDateInputRef.current.value === ''
    ) {
      console.log('활성화 날짜 없음');
      return;
    }
    if (
      !projcetStartDateInputRef.current ||
      projcetStartDateInputRef.current.value === ''
    ) {
      console.log('프로젝트 시작 날짜 없음');
      return;
    }
    if (
      !projcetEndDateInputRef.current ||
      projcetEndDateInputRef.current.value === ''
    ) {
      console.log('프로젝트 종료 날짜 없음');
      return;
    }

    return {
      id: defaultValue ? defaultValue.id : 1,
      stage,
      project: category,
      activeDate: projcetActiveDateInputRef.current.value,
      startDate: projcetStartDateInputRef.current.value,
      endDate: projcetEndDateInputRef.current.value,
      track: tracks,
    };
  };

  const findDefaultStage = () => {
    if (stage) {
      return stageOptions.find((i) => stage.code === i.code);
    }
  };

  const findDefaultCategory = () => {
    if (category) {
      return categoryOptions.find((i) => category.code === i.code);
    }
  };

  const findDefaultTracks = () => {
    if (tracks && tracks.length > 0) {
      return trackOptions.filter((i) => tracks.find((t) => t.code === i.code));
    }
  };

  const handleCreateStageOption = (inputValue: string) => {
    console.log('handleCreateOption: ', inputValue);
    setIsLoadingStage(true);
    createAdminProjectOption({
      codeId: CODE_ID['기수'],
      codeName: inputValue,
    }).then(({ data: { data } }) => {
      console.log('CREATE STAGE:', data);
      setStageOptions(codesToOption(data));
      setIsLoadingStage(false);
      setStage(data.find((c: Code) => c.codeName === inputValue));
    });
  };

  const onChangeStageOption = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (action.action === 'select-option' && selectedValue) {
      setStage({
        code: selectedValue.value,
        codeName: selectedValue.label,
      });
    } else if (action.action === 'clear') {
      setStage(null);
    }
  };

  const handleCreateCategoryOption = (inputValue: string) => {
    setIsLoadingCategory(true);

    createAdminProjectOption({
      codeId: CODE_ID['구분'],
      codeName: inputValue,
    }).then(({ data: { data } }) => {
      console.log('CREATE CATEGORY:', data);
      setCategoryOptions(codesToOption(data));
      setIsLoadingCategory(false);
      setCategory(data.find((c: Code) => c.codeName === inputValue));
    });
  };

  const onChangeCategoryOption = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (action.action === 'select-option' && selectedValue) {
      setCategory({
        code: selectedValue.value,
        codeName: selectedValue.label,
      });
    } else if (action.action === 'clear') {
      setCategory(null);
    }
  };

  const handleCreateTrackOption = (inputValue: string) => {
    setIsLoadingTrack(true);
    createAdminProjectOption({
      codeId: CODE_ID['트랙'],
      codeName: inputValue,
    }).then(({ data: { data } }) => {
      console.log('CREATE TRACK:', data);
      setTrackOptions(codesToOption(data));
      setIsLoadingTrack(false);
      setTracks([...tracks, data.find((c: Code) => c.codeName === inputValue)]);
    });
  };

  const onChangeTrackOption = (
    selectedValue: OptionsType<OptionTypeBase>,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (
      action.action === 'select-option' ||
      action.action === 'pop-value' ||
      action.action === 'remove-value'
    ) {
      setTracks(
        selectedValue.map((i) => ({
          code: i.value,
          codeName: i.label,
        })),
      );
    } else if (action.action === 'clear') {
      setTracks([]);
    }
  };

  const handleShowEditModal = (type: '' | '기수' | '구분' | '트랙') => {
    setShowEditOptionsModal(type);
  };

  const handleCloseEditOptionModal = () => {
    setShowEditOptionsModal('');
  };

  const handleOptionDelete = (data: any, codeId: string) => {
    deleteAdminProjectOption({
      codeId,
      code: data.code,
    }).then(({ data: { data } }) => {
      if (codeId === CODE_ID['기수']) {
        setStageOptions(codesToOption(data));
        setStage(null);
      } else if (codeId === CODE_ID['구분']) {
        setCategoryOptions(codesToOption(data));
        setCategory(null);
      } else if (codeId === CODE_ID['트랙']) {
        setTrackOptions(codesToOption(data));
        setTracks([]);
      }
    });
  };

  return (
    <ModalWrapper modalName="projectManageModal" zIndex={900}>
      <>
        <Wrapper>
          <div className="modal-header">
            <Text
              text={defaultValue ? '프로젝트 수정하기' : '프로젝트 추가하기'}
              fontSetting="n26b"
            />
            <div className="close-btn">
              <Icon iconName="close" func={handleClickClose} />
            </div>
          </div>

          <div className="project-stage-container">
            {stageOptions.length > 0 && (
              <>
                <Label text="기수">
                  <CreatableSelect
                    isClearable
                    value={codeToOption(stage) || ''}
                    isDisabled={!!defaultValue || isLoadingStage}
                    isLoading={isLoadingStage}
                    cacheOptions
                    defaultOptions
                    options={stageOptions}
                    onChange={onChangeStageOption}
                    defaultValue={findDefaultStage()}
                    styles={customStyles}
                    onCreateOption={handleCreateStageOption}
                    placeholder="예) 5기"
                  />
                </Label>
                {!defaultValue && (
                  <div
                    className="setting-icon"
                    onClick={() => handleShowEditModal('기수')}
                  >
                    <Icon iconName="settings" />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="project-category-container">
            {categoryOptions.length > 0 && (
              <>
                <Label text="구분">
                  <CreatableSelect
                    isClearable
                    value={codeToOption(category) || ''}
                    isDisabled={!!defaultValue || isLoadingCategory}
                    isLoading={isLoadingCategory}
                    cacheOptions
                    defaultOptions
                    options={categoryOptions}
                    onChange={onChangeCategoryOption}
                    defaultValue={findDefaultCategory()}
                    styles={customStyles}
                    onCreateOption={handleCreateCategoryOption}
                    placeholder="예) 공통"
                  />
                </Label>
                {!defaultValue && (
                  <div
                    className="setting-icon"
                    onClick={() => handleShowEditModal('구분')}
                  >
                    <Icon iconName="settings" />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="project-stage-category-message">
            {!defaultValue && (
              <Text
                text="'기수'와 '구분'은 이후에 수정이 불가능합니다."
                fontSetting="n14m"
              />
            )}
          </div>

          <div className="project-track-container">
            {trackOptions.length > 0 && (
              <>
                <Label text="트랙">
                  <CreatableSelect
                    isMulti
                    isClearable
                    value={codesToOption(tracks) || ''}
                    isDisabled={isLoadingTrack}
                    isLoading={isLoadingTrack}
                    cacheOptions
                    defaultOptions
                    options={trackOptions}
                    onChange={onChangeTrackOption}
                    defaultValue={findDefaultTracks()}
                    styles={customStyles}
                    onCreateOption={handleCreateTrackOption}
                    placeholder="예) 웹 기술"
                  />
                </Label>
                <div
                  className="setting-icon"
                  onClick={() => handleShowEditModal('트랙')}
                >
                  <Icon iconName="settings" />
                </div>
              </>
            )}
          </div>

          <div className="project-activate-date-container">
            <Label text="활성화 날짜">
              <Input
                type="date"
                width="100%"
                height="40px"
                ref={projcetActiveDateInputRef}
                refValue={
                  defaultValue && defaultValue.activeDate
                    ? defaultValue.activeDate
                    : ''
                }
              />
            </Label>
          </div>

          <div className="project-date-container">
            <Label text="프로젝트 기간">
              <div className="flex-container">
                <Input
                  type="date"
                  width="100%"
                  height="40px"
                  ref={projcetStartDateInputRef}
                  refValue={
                    defaultValue && defaultValue.startDate
                      ? defaultValue.startDate
                      : ''
                  }
                />

                <Input
                  type="date"
                  width="100%"
                  height="40px"
                  ref={projcetEndDateInputRef}
                  refValue={
                    defaultValue && defaultValue.endDate
                      ? defaultValue.endDate
                      : ''
                  }
                />
              </div>
            </Label>
          </div>

          <div className="modal-footer">
            <div>
              <Button
                title={defaultValue ? '저장' : '생성'}
                func={defaultValue ? handleUpdateProject : handleCreateProject}
              />
            </div>
          </div>
        </Wrapper>
        {showEditOptionsModal !== '' && (
          <ModalWrapper modalName="editOptionsModal" zIndex={910}>
            <EditOptionModal>
              <div className="modal-header">
                <Text
                  text={`[${showEditOptionsModal}] 옵션 리스트 삭제`}
                  fontSetting="n16b"
                />
                <Text
                  text={`삭제하면 이전에 선택한 [${showEditOptionsModal}] 옵션이 초기화됩니다.`}
                  fontSetting="n12m"
                  color="crimson"
                />
                <div className="close-btn">
                  <Icon iconName="close" func={handleCloseEditOptionModal} />
                </div>
              </div>
              <div className="modal-content">
                {(showEditOptionsModal === '기수'
                  ? stageOptions
                  : showEditOptionsModal === '구분'
                  ? categoryOptions
                  : showEditOptionsModal === '트랙'
                  ? trackOptions
                  : []
                ).map((option, i) => (
                  <div className="option-item" key={i}>
                    <span>{option.label}</span>
                    <Icon
                      iconName="delete"
                      func={() =>
                        handleOptionDelete(
                          option,
                          CODE_ID[showEditOptionsModal],
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </EditOptionModal>
          </ModalWrapper>
        )}
      </>
    </ModalWrapper>
  );
}
