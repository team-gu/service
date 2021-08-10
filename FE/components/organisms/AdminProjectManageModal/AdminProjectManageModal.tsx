import {
  ReactElement,
  MouseEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
  RefObject,
} from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { Project } from '@utils/type';
import { Input, Text, Icon } from '@atoms';
import { Label, Button } from '@molecules';
import { ModalWrapper } from '@organisms';

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

  .project-name-container {
    grid-column: 1 / 3;
    input {
      padding-left: 10px;
      font-size: 15px;
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
  const projectNameInputRef = useRef<HTMLInputElement>(null);
  const projectStageInputRef = useRef<HTMLInputElement>(null);
  const projectCategoryInputRef = useRef<HTMLInputElement>(null);
  const projcetActivateDateInputRef = useRef<HTMLInputElement>(null);
  const projcetStartDateInputRef = useRef<HTMLInputElement>(null);
  const projcetEndDateInputRef = useRef<HTMLInputElement>(null);
  const projectTrackInputRef = useRef<HTMLInputElement>(null);
  const projectTrackBtnRef = useRef<HTMLInputElement>(null);

  const [tracks, setTracks] = useState(defaultValue ? defaultValue.track : []);

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

  const handleEnterInInput: KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === 'Enter') {
      addTrack();
    }
  };

  const handleClickAddTrack: MouseEventHandler<HTMLSpanElement> = () => {
    addTrack();
  };

  const addTrack = () => {
    if (
      projectTrackInputRef.current &&
      projectTrackInputRef.current.value !== ''
    ) {
      setTracks([...tracks, projectTrackInputRef.current.value]);
      projectTrackInputRef.current.value = '';
    }
  };

  const deleteTrackItem = (idx: number) => {
    const tracksTmp = tracks;
    tracksTmp.splice(idx, 1);
    setTracks([...tracksTmp]);
  };

  const validateAndMakeProject = () => {
    if (isNotValidate(projectNameInputRef)) {
      addClassNotValidateInput(projectNameInputRef);
      return false;
    }
    if (isNotValidate(projectStageInputRef)) {
      addClassNotValidateInput(projectStageInputRef);
      return false;
    }
    if (isNotValidate(projectCategoryInputRef)) {
      addClassNotValidateInput(projectCategoryInputRef);
      return false;
    }
    if (isNotValidate(projcetActivateDateInputRef)) {
      addClassNotValidateInput(projcetActivateDateInputRef);
      return false;
    }
    if (isNotValidate(projcetStartDateInputRef)) {
      addClassNotValidateInput(projcetStartDateInputRef);
      return false;
    }
    if (isNotValidate(projcetEndDateInputRef)) {
      addClassNotValidateInput(projcetEndDateInputRef);
      return false;
    }
    if (!tracks || tracks.length === 0) {
      addClassNotValidateInput(projectTrackInputRef);
      projectTrackBtnRef.current?.classList.add('incorrect-track-add-btn');
      setTimeout(() => {
        projectTrackBtnRef.current?.classList.remove('incorrect-track-add-btn');
      }, 1000);
      return false;
    }

    return {
      name: projectNameInputRef.current?.value,
      stage: projectStageInputRef.current?.value,
      category: projectCategoryInputRef.current?.value,
      activateDate: DateTime.fromFormat(
        'yyyy-MM-dd',
        projcetActivateDateInputRef.current?.value || '',
      ),
      startDate: DateTime.fromFormat(
        'yyyy-MM-dd',
        projcetStartDateInputRef.current?.value || '',
      ),
      endDate: DateTime.fromFormat(
        'yyyy-MM-dd',
        projcetEndDateInputRef.current?.value || '',
      ),
      track: tracks,
    };
  };

  const isNotValidate = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current && ref.current.value && ref.current.value !== '') {
      return false;
    }
    return true;
  };

  const addClassNotValidateInput = (ref: RefObject<HTMLInputElement>) => {
    ref.current?.focus();
    ref.current?.classList.add('incorrect-select-shake');
    setTimeout(() => {
      ref.current?.classList.remove('incorrect-select-shake');
    }, 1000);
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

        <div className="project-name-container">
          <Label text="이름">
            <Input
              width="100%"
              height="40px"
              refValue={defaultValue ? defaultValue.name : undefined}
              ref={projectNameInputRef}
              placeHolder="예) 5기 공통 프로젝트"
            />
          </Label>
        </div>

        <div className="project-stage-container">
          <Label text="기수">
            <Input
              width="100%"
              height="40px"
              refValue={defaultValue ? defaultValue.stage : undefined}
              ref={projectStageInputRef}
              placeHolder="예) 5기"
            />
          </Label>
        </div>

        <div className="project-category-container">
          <Label text="구분">
            <Input
              width="100%"
              height="40px"
              refValue={defaultValue ? defaultValue.category : undefined}
              ref={projectCategoryInputRef}
              placeHolder="예) 공통"
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
              refValue={
                defaultValue
                  ? defaultValue.activateDate.toFormat('yyyy-MM-dd')
                  : undefined
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
                    : undefined
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
                    : undefined
                }
              />
            </div>
          </Label>
        </div>

        <div className="project-track-container">
          <Label text="트랙">
            <>
              <div className="flex-container">
                <Input
                  width="100%"
                  height="40px"
                  ref={projectTrackInputRef}
                  onKeyPress={handleEnterInInput}
                />
                <div className="add-btn" ref={projectTrackBtnRef}>
                  <Icon
                    iconName="add"
                    color="white"
                    func={handleClickAddTrack}
                  />
                </div>
              </div>

              <div className="tracks-container">
                {tracks.map((t, i) => (
                  <div key={i} className="track-item">
                    <Icon
                      iconName="remove_circle"
                      func={() => deleteTrackItem(i)}
                    />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </>
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
