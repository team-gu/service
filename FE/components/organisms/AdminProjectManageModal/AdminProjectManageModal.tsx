import { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import {
  OptionTypeBase,
  ActionMeta,
  OptionsType,
} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { Project } from '@utils/type';
import { Input, Text, Icon } from '@atoms';
import { Label, Button } from '@molecules';
import { ModalWrapper } from '@organisms';
import { DUMMY_CATEGORY, DUMMY_STAGE, DUMMY_TRACK } from '@utils/dummy';

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
    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .project-category-container {
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
  const [activateDateString, setActivateDateString] = useState(
    defaultValue ? defaultValue.activateDate.toFormat('yyyy-MM-dd') : '',
  );
  const [startDateString, setStartDateString] = useState(
    defaultValue ? defaultValue.startDate.toFormat('yyyy-MM-dd') : '',
  );
  const [endDateString, setEndDateString] = useState(
    defaultValue ? defaultValue.endDate.toFormat('yyyy-MM-dd') : '',
  );
  const [tracks, setTracks] = useState(defaultValue ? defaultValue.tracks : []);
  const [isLoading, setIsLoading] = useState(false);

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
    if (activateDateString === '') {
      console.log('활성화 날짜 없음');
      return;
    }
    if (startDateString === '') {
      console.log('프로젝트 시작 날짜 없음');
      return;
    }
    if (endDateString === '') {
      console.log('프로젝트 종료 날짜 없음');
      return;
    }

    return {
      stage,
      category,
      activateDate: DateTime.fromFormat('yyyy-MM-dd', activateDateString),
      startDate: DateTime.fromFormat('yyyy-MM-dd', startDateString),
      endDate: DateTime.fromFormat('yyyy-MM-dd', endDateString),
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
      // TODO: 기수 생성 API call. 지금은 단순히 추가하지만, API call 결과를 넣어주어야한다.
      console.log('CREATE STAGE:', selectedValue);
      setStageOptions([...stageOptions, selectedValue]);
    } else if (action.action === 'select-option' && selectedValue) {
      setStage({ code: selectedValue.code, codeName: selectedValue.codeName });
    } else if (action.action === 'clear') {
      setStage(null);
    }
  };

  const onChangeCategoryOption = (
    selectedValue: OptionTypeBase | null,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    if (action.action === 'create-option' && selectedValue) {
      // TODO: 구분 생성 API call. 지금은 단순히 추가하지만, API call 결과를 넣어주어야한다.
      console.log('CREATE CATEGORY:', selectedValue);
      setStageOptions([...categoryOptions, selectedValue]);
    } else if (action.action === 'select-option' && selectedValue) {
      setCategory({
        code: selectedValue.code,
        codeName: selectedValue.codeName,
      });
    } else if (action.action === 'clear') {
      setCategory(null);
    }
  };

  const onChangeTrackOption = (
    selectedValue: OptionsType<OptionTypeBase>,
    action: ActionMeta<OptionTypeBase>,
  ) => {
    console.log('트랙');
    console.log('SELECTED:', selectedValue);
    console.log('ACTION:', action);

    if (action.action === 'create-option' && selectedValue) {
      const newValue = selectedValue.find((i: any) => i.__isNew__);
      console.log('CREATE TRACK:', newValue);
      if (newValue) {
        delete newValue['__isNew__'];
        // TODO: 트랙 생성 API call. 지금은 단순히 추가하지만, API call 결과를 넣어주어야한다.
        setTrackOptions([...trackOptions, newValue]);
      }
    } else if (
      action.action === 'select-option' ||
      action.action === 'pop-value' ||
      action.action === 'remove-value'
    ) {
      const newTracks = selectedValue.map((i) => ({
        code: i.code,
        codeName: i.codeName,
      }));
      setTracks(newTracks);
    } else if (action.action === 'clear') {
      setTracks([]);
    }
  };

  return (
    <ModalWrapper modalName="projectManageModal">
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
              cacheOptions
              defaultOptions
              options={stageOptions}
              onChange={onChangeStageOption}
              defaultValue={findDefaultStage()}
              styles={customStyles}
            />
          </Label>
        </div>

        <div className="project-category-container">
          <Label text="구분">
            <CreatableSelect
              isClearable
              cacheOptions
              defaultOptions
              options={categoryOptions}
              onChange={onChangeCategoryOption}
              defaultValue={findDefaultCategory()}
              styles={customStyles}
            />
          </Label>
        </div>

        <div className="project-track-container">
          <Label text="트랙">
            <CreatableSelect
              isMulti
              isClearable
              cacheOptions
              defaultOptions
              options={trackOptions}
              onChange={onChangeTrackOption}
              defaultValue={findDefaultTracks()}
              styles={customStyles}
            />
          </Label>
        </div>

        <div className="project-activate-date-container">
          <Label text="활성화 날짜">
            <Input
              type="date"
              width="100%"
              height="40px"
              ref={projcetActivateDateInputRef}
              refValue={activateDateString}
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
                refValue={startDateString}
              />

              <Input
                type="date"
                width="100%"
                height="40px"
                ref={projcetEndDateInputRef}
                refValue={endDateString}
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
    </ModalWrapper>
  );
}
