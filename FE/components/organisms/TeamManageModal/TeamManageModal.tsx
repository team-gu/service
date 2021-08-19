import {
  ReactElement,
  MouseEventHandler,
  useState,
  ChangeEvent,
  FocusEventHandler,
  useEffect,
  useRef,
} from 'react';
import router from 'next/router';
import styled from 'styled-components';
import { ModalWrapper } from '@organisms';
import { Icon, Input, Text, Textarea } from '@atoms';
import {
  Button,
  Label,
  SkillSelectAutoComplete,
  SimpleSelect,
  Checkbox,
} from '@molecules';
import { MODALS } from '@utils/constants';
import { displayModal, useAppDispatch, useAuthState } from '@store';
import {
  createTeam,
  deleteTeam,
  exitTeam,
  updateTeam,
} from '@repository/teamRepository';
import { getEachFiltersCodeList } from '@repository/filterRepository';
import { getEachFiltersCodeListTracks } from '@repository/filterRepository';
import { OptionTypeBase, OptionsType } from 'react-select';
import { Team, SkillOption, Member, Skill } from '@utils/type';
import { AxiosError } from 'axios';
import { errorAlert } from '@utils/snippet';

const Wrapper = styled.div`
  display: grid;
  position: relative;
  width: 600px;
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

  grid-template-rows: repeat(8, auto);

  .modal-header {
    text-align: center;
    padding-top: 40px;
    padding-bottom: 20px;

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

  .team-name-container {
    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .team-track-container {
    margin-bottom: 20px;
  }

  .team-description-container {
    margin-bottom: 15px;

    textarea {
      width: 100%;
      height: 60px;
      border: solid 1px #eeeeee;
      padding: 10px;
      font-size: 14px;
      box-sizing: border-box;
    }
  }

  .team-skills-container {
    margin-bottom: 15px;

    .input {
      margin-bottom: 20px;
    }

    input {
      padding-left: 10px;
      font-size: 15px;
    }

    .skills {
      display: flex;
      > div {
        margin-right: 10px;
      }
    }
  }

  .team-leader-complete-container {
    display: flex;
    gap: 20px;

    .team-leader-container {
      flex: 1;
      input {
        padding-left: 15px;
        box-sizing: border-box;
        font-size: 16px;
      }
    }

    .team-complete-container {
      flex: 1;
    }
  }

  .team-invite-container {
    .input {
      margin-bottom: 15px;
    }

    input {
      padding-left: 10px;
      font-size: 15px;
    }

    .profiles {
      display: flex;
      margin-left: 10px;

      .profile-and-name {
        position: relative;
        margin-right: 20px;
        margin-top: 15px;

        .name-in-profile {
          width: 100%;
          text-align: center;
          margin-top: 2px;
          font-size: 12px;
        }

        i {
          position: absolute;
          right: 1px;
          top: 1px;
          font-size: 15px;
          font-weight: bold;
          color: crimson;
          cursor: pointer;
        }
      }
    }
  }

  .modal-footer {
    text-align: center;
    padding-top: 20px;
    padding-bottom: 50px;

    > div {
      display: inline-block;
      margin: 0 10px;

      button {
        width: 120px;
      }
    }

    .team-delete-btn > button {
      background-color: crimson;
    }
  }

  .incorrect-select-shake {
    animation: shake 0.2s ease-in-out 0s 2;
    box-shadow: 0 0 0.5em red;
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

  .confirm-modal-container {
    padding: 50px;

    .confirm-text {
      margin-bottom: 20px;
      text-align: center;
    } 

    .create-confirm-btns {
      text-align: center;

      button {
        width: 90px;
        margin 0 10px;
      }

      > button:nth-child(1) {
        background-color: forestgreen;
      }
    }

    .confirm-btns {
      text-align: center;

      button {
        width: 90px;
        margin 0 10px;
      }

      > button:nth-child(2) {
        background-color: crimson;
      }
    }
  }
`;

const selectCustomStyles = {
  valueContainer: (base: any) => ({
    ...base,
    fontSize: '14px',
    lineHeight: '20px',
  }),
};

interface TeamManageModalProps {
  defaultValue?: Team;
  handleClickClose: MouseEventHandler;
  fetchTeams: () => void;
  projectCode: number;
}

export default function TeamManageModal({
  defaultValue,
  handleClickClose,
  fetchTeams,
  projectCode,
}: TeamManageModalProps): ReactElement {
  const dispatch = useAppDispatch();
  const { user } = useAuthState();
  const userToMember = () => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      img: user.img && !user.img.includes('null') ? user.img : '/profile.png',
    };
  };

  const teamMembers = defaultValue?.teamMembers || [userToMember()];
  const teamMembersOptions = teamMembers.map((m) => ({
    ...m,
    label: `${m.name} (${m.email})`,
    value: m.id,
  }));

  const [skillOptions, setSkillOptions] = useState<Skill[]>();
  const [trackOptions, setTrackOptions] = useState([]);

  const [teamName, setTeamName] = useState(defaultValue?.name || '');
  const [teamTrack, setTeamTrack] = useState(defaultValue?.track || '');
  const [teamDescription, setTeamDescription] = useState(
    defaultValue?.introduce || '',
  );
  const [teamSkills, setTeamSkills] = useState<Skill[]>(
    defaultValue?.skills || [],
  );
  const [teamLeader, setTeamLeader] = useState(
    defaultValue?.leaderId || user.id,
  );
  const [teamComplete, setTeamComplete] = useState(
    defaultValue?.completeYn || 0,
  );
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const teamNameInputRef = useRef<HTMLInputElement>(null);
  const teamDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const currentUserIsLeader: boolean = user.id === defaultValue?.leaderId;

  useEffect(() => {
    if (teamDescriptionRef.current) {
      teamDescriptionRef.current.value = teamDescription;
    }

    getEachFiltersCodeList(user.studentNumber)
      .then(({ data: { data } }) => {
        setSkillOptions(
          data['스킬'].reduce(
            (acc: Skill[], cur: any) => [
              ...acc,
              { ...cur, value: cur.code, label: cur.codeName },
            ],
            [],
          ),
        );
      })
      .catch((err) => errorAlert(dispatch, err));

    getEachFiltersCodeListTracks(user.studentNumber, projectCode)
      .then(({ data: { data } }) => {
        setTrackOptions(
          data['트랙'].reduce(
            (acc: { code: number; codeName: string }[], cur: any) => [
              ...acc,
              { ...cur, value: cur.code, label: cur.codeName },
            ],
            [],
          ),
        );
      })
      .catch((err) => errorAlert(dispatch, err));
  }, []);

  const handleChangeTeamName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTeamName(target.value);
  };

  const handleChangeTrack = (selectedTrack: any) => {
    setTeamTrack(selectedTrack);
  };

  const handleChangeSkillSelect = (
    selectedSkills: OptionsType<SkillOption>,
  ) => {
    setTeamSkills([...selectedSkills]);
  };

  const handleChangeDescription: FocusEventHandler = () => {
    if (teamDescriptionRef.current) {
      setTeamDescription(teamDescriptionRef.current.value);
    }
  };

  const handleChangeTeamLeader = (newMember: Member) => {
    setTeamLeader(newMember.id);
  };

  const handleChangeTeamComplete = () => {
    setTeamComplete(teamComplete === 1 ? 0 : 1);
  };

  const formValidation = () => {
    if (!teamName || teamName === '') {
      dispatch(
        displayModal({
          modalName: MODALS.ALERT_MODAL,
          content: '팀 이름을 입력해주세요',
        }),
      );
      return false;
    }

    if (!teamTrack || teamTrack === '') {
      dispatch(
        displayModal({
          modalName: MODALS.ALERT_MODAL,
          content: '트랙을 선택해주세요',
        }),
      );
      return false;
    }

    if (!teamDescription || teamDescription === '') {
      dispatch(
        displayModal({
          modalName: MODALS.ALERT_MODAL,
          content: '팀 소개를 입력해주세요',
        }),
      );
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (formValidation()) {
      setShowSubmitConfirm(true);
    }
  };

  const handleUpdateSubmit = () => {
    if (formValidation()) {
      setShowSubmitConfirm(true);
    }
  };

  const handleDeleteTeam = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteConfirmCancel = () => {
    setShowDeleteConfirmModal(false);
  };

  const handleDeleteConfirm: MouseEventHandler = (event) => {
    setShowDeleteConfirmModal(false);
    deleteTeam({ id: defaultValue?.id })
      .then(() => {
        handleClickClose(event);
        fetchTeams();
      })
      .catch((err) => errorAlert(dispatch, err));
  };

  const handleExitTeam = () => {
    setShowExitConfirmModal(true);
  };

  const handleExitTeamConfirmCancel = () => {
    setShowExitConfirmModal(false);
  };

  const handleExitTeamConfirm: MouseEventHandler = (event) => {
    setShowExitConfirmModal(false);
    exitTeam({ userId: user.id, teamId: defaultValue?.id })
      .then(() => {
        handleClickClose(event);
        fetchTeams();
      })
      .catch((err) => errorAlert(dispatch, err));
  };

  const handleSubmitTeamConfirmCancel = () => {
    setShowSubmitConfirm(false);
  };

  const handleCreateTeamConfirm: MouseEventHandler = (event) => {
    if (!user) {
      return;
    }

    setShowSubmitConfirm(false);
    createTeam({
      name: teamName,
      track: teamTrack,
      introduce: teamDescription,
      skills: teamSkills,
      teamMembers,
      leaderId: teamLeader,
      completeYn: teamComplete,
    })
      .then(() => {
        handleClickClose(event);
        fetchTeams();
      })
      .catch((err) => errorAlert(dispatch, err));
  };

  const handleUpdateTeamConfirm: MouseEventHandler = (event) => {
    setShowSubmitConfirm(false);
    if (!defaultValue) {
      console.error('수정할 팀 정보가 없습니다. 다시 시도해주세요');
      router.reload();
      return;
    }

    updateTeam({
      id: defaultValue.id,
      name: teamName,
      track: teamTrack,
      introduce: teamDescription,
      skills: teamSkills,
      teamMembers,
      leaderId: teamLeader,
      completeYn: teamComplete,
    })
      .then(() => {
        handleClickClose(event);
        fetchTeams();
      })
      .catch((err) => errorAlert(dispatch, err));
  };

  const toOptionTypeBase = (value: string): OptionTypeBase => {
    const option: OptionTypeBase = {
      label: value,
      value: value,
    };
    return option;
  };

  return (
    <ModalWrapper modalName="teamCreateModal" zIndex={90}>
      <Wrapper>
        <div className="modal-header">
          <Text
            text={defaultValue ? '팀 정보 수정' : '팀 만들기'}
            fontSetting="n26b"
          />
          <div className="close-btn">
            <Icon iconName="close" func={handleClickClose} />
          </div>
        </div>

        <div className="team-name-container">
          <Label text="팀 이름">
            <Input
              width="100%"
              height="40px"
              func={handleChangeTeamName}
              refValue={defaultValue ? defaultValue.name : undefined}
              ref={teamNameInputRef}
            />
          </Label>
        </div>

        <div className="team-track-container">
          <Label text="트랙">
            <SimpleSelect
              options={trackOptions}
              onChange={handleChangeTrack}
              value={
                defaultValue
                  ? toOptionTypeBase(defaultValue.track.codeName)
                  : null
              }
            />
          </Label>
        </div>

        <div className="team-description-container">
          <Label text="팀 소개">
            <Textarea
              onBlur={handleChangeDescription}
              ref={teamDescriptionRef}
            ></Textarea>
          </Label>
        </div>

        <div className="team-skills-container">
          <Label text="사용할 기술">
            <div>
              <SkillSelectAutoComplete
                onChangeSkills={handleChangeSkillSelect}
                value={defaultValue ? defaultValue.skills : null}
                options={skillOptions}
              />
            </div>
          </Label>
        </div>

        <div className="team-leader-complete-container">
          <div className="team-leader-container">
            <Label text="팀장">
              <SimpleSelect
                options={teamMembersOptions}
                onChange={handleChangeTeamLeader}
                value={
                  defaultValue
                    ? teamMembersOptions.find(
                        (m) => m.id === defaultValue.leaderId,
                      )
                    : teamMembersOptions[0]
                }
                isDisabled={!defaultValue}
                customStyles={selectCustomStyles}
              />
            </Label>
          </div>
          {defaultValue && (
            <div className="team-complete-container">
              <Label text="팀 구성 완료 여부">
                <Checkbox
                  func={handleChangeTeamComplete}
                  checked={defaultValue.completeYn !== 0}
                >
                  <div>완료됨</div>
                </Checkbox>
              </Label>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div>
            <Button
              title={defaultValue ? '변경사항 저장' : '팀 만들기'}
              func={defaultValue ? handleSubmit : handleUpdateSubmit}
            />
          </div>

          {defaultValue && (
            <div className="team-delete-btn">
              <Button title="팀 나가기" func={handleExitTeam} />
            </div>
          )}
          {defaultValue && currentUserIsLeader && (
            <div className="team-delete-btn">
              <Button title="팀 삭제" func={handleDeleteTeam} />
            </div>
          )}
        </div>

        {showSubmitConfirm && (
          <ModalWrapper modalName="createConfirmModal" zIndex={100}>
            <div className="confirm-modal-container">
              <div className="confirm-text">
                <Text
                  text={
                    defaultValue ? '변경사항을 저장합니다.' : '팀을 생성합니다.'
                  }
                  fontSetting="n18m"
                />
              </div>
              <div className="create-confirm-btns">
                <Button
                  title="예"
                  func={
                    defaultValue
                      ? handleUpdateTeamConfirm
                      : handleCreateTeamConfirm
                  }
                />
                <Button title="취소" func={handleSubmitTeamConfirmCancel} />
              </div>
            </div>
          </ModalWrapper>
        )}

        {defaultValue && showDeleteConfirmModal && (
          <ModalWrapper modalName="deleteConfirmModal">
            <div className="confirm-modal-container">
              <div className="confirm-text">
                <Text text="정말 팀을 삭제하시겠습니까?" fontSetting="n20m" />
                <Text
                  text="현재 팀에 대한 모든 정보가 삭제됩니다."
                  fontSetting="n16m"
                />
              </div>
              <div className="confirm-btns">
                <Button title="취소" func={handleDeleteConfirmCancel} />
                <Button title="예" func={handleDeleteConfirm} />
              </div>
            </div>
          </ModalWrapper>
        )}
        {defaultValue && showExitConfirmModal && (
          <ModalWrapper modalName="exitConfirmModal" zIndex={100}>
            <div className="confirm-modal-container">
              {currentUserIsLeader ? (
                <>
                  <div className="confirm-text">
                    <Text
                      text="팀장은 팀을 나갈 수 없습니다."
                      fontSetting="n20m"
                    />
                    <Text
                      text="팀을 탈퇴하고 싶다면 팀장을 위임한 후에 시도해주세요."
                      fontSetting="n16m"
                    />
                  </div>
                  <div className="confirm-btns">
                    <Button title="확인" func={handleExitTeamConfirmCancel} />
                  </div>
                </>
              ) : (
                <>
                  <div className="confirm-text">
                    <Text text="정말 팀을 나가시겠습니까?" fontSetting="n20m" />
                  </div>
                  <div className="confirm-btns">
                    <Button title="취소" func={handleExitTeamConfirmCancel} />
                    <Button title="예" func={handleExitTeamConfirm} />
                  </div>
                </>
              )}
            </div>
          </ModalWrapper>
        )}
      </Wrapper>
    </ModalWrapper>
  );
}
