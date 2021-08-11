import { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { OptionTypeBase, ActionMeta, OptionsType } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { Project } from '@utils/type';
import { Input, Text, Icon } from '@atoms';
import { Label, Button } from '@molecules';
import { ModalWrapper } from '@organisms';
import { CODE_ID } from '@utils/constants';
import { DUMMY_CATEGORY, DUMMY_STAGE, DUMMY_TRACK } from '@utils/dummy';
import {
  getAdminProjectOptions,
  createAdminProjectOption,
  deleteAdminProjectOption,
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
  gap: 20px;

  .modal-header {
    grid-column: 1 / 3;
    text-align: center;
    padding-top: 40px;
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

  .project-stage-container {
    position: relative;
    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .project-category-container {
    position: relative;
    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .project-activate-date-container {
    grid-column: 1 / 3;

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

  .project-track-container {
    position: relative;
    grid-column: 1 / 3;

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

    .add-btn {
      font-size: 35px;
      text-align: center;

      position: relative;
      z-index: 1;

      margin-left: -50px;
      width: 50px;
      height: 40px;
      background-color: darkblue;
      border-radius: 0 5% 5% 0;

      cursor: pointer;
      i {
        cursor: pointer;
      }
    }

    .tracks-container {
      .track-item {
        margin: 15px 0 10px 10px;
        font-size: 18px;
        line-height: 18px;

        > span {
          margin-left: 5px;
        }

        i {
          font-size: 16px;
          color: crimson;
          cursor: pointer;
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
    width: 200px;
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

const codeToOption = (data: any[]) => {
  return data.map((i) => ({
    ...i,
    label: i.codeName,
    value: i.code,
  }));
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
  const [stageOptions, setStageOptions] = useState<OptionTypeBase[]>(
    codeToOption(DUMMY_STAGE),
  );
  const [categoryOptions, setCategoryOptions] = useState<OptionTypeBase[]>(
    codeToOption(DUMMY_CATEGORY),
  );
  const [trackOptions, setTrackOptions] = useState<OptionTypeBase[]>(
    codeToOption(DUMMY_TRACK),
  );

  const [stage, setStage] = useState(defaultValue ? defaultValue.stage : null);
  const [category, setCategory] = useState(
    defaultValue ? defaultValue.category : null,
  );
  // const [activateDateString, setActivateDateString] = useState(
  //   defaultValue ? defaultValue.activateDate.toFormat('yyyy-MM-dd') : '',
  // );
  // const [startDateString, setStartDateString] = useState(
  //   defaultValue ? defaultValue.startDate.toFormat('yyyy-MM-dd') : '',
  // );
  // const [endDateString, setEndDateString] = useState(
  //   defaultValue ? defaultValue.endDate.toFormat('yyyy-MM-dd') : '',
  // );
  const [tracks, setTracks] = useState(defaultValue ? defaultValue.tracks : []);

  const [isLoadingStage, setIsLoadingStage] = useState(false);
  const [isLoadingCategory, setIsLoadingCategory] = useState(false);
  const [isLoadingTrack, setIsLoadingTrack] = useState(false);

  const [showEditOptionsModal, setShowEditOptionsModal] = useState<
    '기수' | '구분' | '트랙' | ''
  >('');

  const projcetActivateDateInputRef = useRef<HTMLInputElement>(null);
  const projcetStartDateInputRef = useRef<HTMLInputElement>(null);
  const projcetEndDateInputRef = useRef<HTMLInputElement>(null);

  const handleCreateProject = () => {
    const project = validateAndMakeProject();
    if (!project) {
      return;
    }

    // TODO API call
    console.log('CREATE PROJECT', project);
    closeModalAndRerender();
  };

  const handleUpdateProject = () => {
    const project = validateAndMakeProject();
    if (!project) {
      return;
    }

    // TODO API call
    console.log('UPDATE PROJECT', project);
    closeModalAndRerender();
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
      !projcetActivateDateInputRef.current ||
      projcetActivateDateInputRef.current.value === ''
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
      stage,
      category,
      activateDate: DateTime.fromFormat(
        'yyyy-MM-dd',
        projcetActivateDateInputRef.current.value,
      ),
      startDate: DateTime.fromFormat(
        'yyyy-MM-dd',
        projcetStartDateInputRef.current.value,
      ),
      endDate: DateTime.fromFormat(
        'yyyy-MM-dd',
        projcetEndDateInputRef.current.value,
      ),
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

  const onChangeStageOption = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (action.action === 'create-option' && selectedValue) {
      console.log('CREATE STAGE:', selectedValue);

      setIsLoadingStage(true);
      // TODO: 기수 생성 API call.
      // createAdminProjectOption({
      //   codeId: CODE_ID['기수'],
      //   codeName: selectedValue.value,
      // }).then(({ data: { data } }) => {
      //   console.log(data);
      //   // TODO: data 전처리
      //   setStageOptions(data);
      //   setIsLoadingStage(false);
      //   setStage({
      //     code: selectedValue.value,
      //     codeName: selectedValue.label,
      //   });
      // });

      // API 연동 전 임시 코드
      setTimeout(() => {
        setStageOptions([...stageOptions, selectedValue]);
        setIsLoadingStage(false);
        setStage({
          code: selectedValue.value,
          codeName: selectedValue.label,
        });
      }, 1000);
    } else if (action.action === 'select-option' && selectedValue) {
      setStage({
        code: selectedValue.value,
        codeName: selectedValue.label,
      });
    } else if (action.action === 'clear') {
      setStage(null);
    }
  };

  const onChangeCategoryOption = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (action.action === 'create-option' && selectedValue) {
      console.log('CREATE CATEGORY:', selectedValue);

      setIsLoadingCategory(true);

      // TODO: 구분 생성 API call.
      // createAdminProjectOption({
      //   codeId: CODE_ID['구분'],
      //   codeName: selectedValue.value,
      // }).then(({ data: { data } }) => {
      //   console.log(data);
      //   // TODO: data 전처리
      //   setCategoryOptions(data);
      //   setIsLoadingCategory(false);
      //   setCategory({
      //     code: selectedValue.value,
      //     codeName: selectedValue.label,
      //   });
      // });

      // API 연동 전 임시 코드
      setTimeout(() => {
        setCategoryOptions([...categoryOptions, selectedValue]);
        setIsLoadingCategory(false);
        setCategory({
          code: selectedValue.value,
          codeName: selectedValue.label,
        });
      }, 1000);
    } else if (action.action === 'select-option' && selectedValue) {
      setCategory({
        code: selectedValue.value,
        codeName: selectedValue.label,
      });
    } else if (action.action === 'clear') {
      setCategory(null);
    }
  };

  const onChangeTrackOption = (
    selectedValue: OptionsType<OptionTypeBase>,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (action.action === 'create-option' && selectedValue) {
      const newValue = selectedValue.find((i: any) => i.__isNew__);
      console.log('CREATE TRACK:', newValue);

      if (newValue) {
        setIsLoadingTrack(true);
        delete newValue['__isNew__'];

        // TODO: 구분 생성 API call.
        // createAdminProjectOption({
        //   codeId: CODE_ID['트랙'],
        //   codeName: newValue.value,
        // }).then(({ data: { data } }) => {
        //   console.log(data);
        //   // TODO: data 전처리
        //   setTrackOptions(data);
        //   setIsLoadingTrack(false);
        //   setTracks(
        //     selectedValue.map((i) => ({
        //       code: i.value,
        //       codeName: i.label,
        //     })),
        //   );
        // });

        // API 얀동 전 임시 코드
        setTimeout(() => {
          setTrackOptions([...trackOptions, newValue]);
          setIsLoadingTrack(false);
          setTracks(
            selectedValue.map((i) => ({
              code: i.value,
              codeName: i.label,
            })),
          );
        }, 1000);
      }
    } else if (
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
    // TODO: API call
    // deleteAdminProjectOption({
    //   codeId,
    //   code: data.codeId,
    // }).then(({ data: { data } }) => {
    //   console.log(data);
    //   // TODO: data 전처리
    //   if (data === CODE_ID['기수']) {
    //     setStageOptions(data);
    //   } else if (data === CODE_ID['구분']) {
    //     setCategoryOptions(data);
    //   } else if (data === CODE_ID['트랙']) {
    //     setTrackOptions(data);
    //   }
    // });

    // API 연동 전 임시 코드
    console.log('handleOptionDelete');
    console.log(data);
    console.log(codeId);
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
            <Label text="기수">
              <CreatableSelect
                isClearable
                isDisabled={isLoadingStage}
                isLoading={isLoadingStage}
                cacheOptions
                defaultOptions
                options={stageOptions}
                onChange={onChangeStageOption}
                defaultValue={findDefaultStage()}
                styles={customStyles}
              />
            </Label>
            <div
              className="setting-icon"
              onClick={() => handleShowEditModal('기수')}
            >
              <Icon iconName="settings" />
            </div>
          </div>

          <div className="project-category-container">
            <Label text="구분">
              <CreatableSelect
                isClearable
                isDisabled={isLoadingCategory}
                isLoading={isLoadingCategory}
                cacheOptions
                defaultOptions
                options={categoryOptions}
                onChange={onChangeCategoryOption}
                defaultValue={findDefaultCategory()}
                styles={customStyles}
              />
            </Label>
            <div
              className="setting-icon"
              onClick={() => handleShowEditModal('구분')}
            >
              <Icon iconName="settings" />
            </div>
          </div>

          <div className="project-track-container">
            <Label text="트랙">
              <CreatableSelect
                isMulti
                isClearable
                isDisabled={isLoadingTrack}
                isLoading={isLoadingTrack}
                cacheOptions
                defaultOptions
                options={trackOptions}
                onChange={onChangeTrackOption}
                defaultValue={findDefaultTracks()}
                styles={customStyles}
              />
            </Label>
            <div
              className="setting-icon"
              onClick={() => handleShowEditModal('트랙')}
            >
              <Icon iconName="settings" />
            </div>
          </div>

          <div className="project-activate-date-container">
            <Label text="활성화 날짜">
              <Input
                type="date"
                width="100%"
                height="40px"
                ref={projcetActivateDateInputRef}
                refValue={
                  defaultValue
                    ? defaultValue.activateDate.toFormat('yyyy-MM-dd')
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
                    defaultValue
                      ? defaultValue.startDate.toFormat('yyyy-MM-dd')
                      : ''
                  }
                />

                <Input
                  type="date"
                  width="100%"
                  height="40px"
                  ref={projcetEndDateInputRef}
                  refValue={
                    defaultValue
                      ? defaultValue.endDate.toFormat('yyyy-MM-dd')
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
