import {
  ReactElement,
  MouseEventHandler,
  useState,
  ChangeEvent,
  FocusEventHandler,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '@organisms';
import { Icon, Input, Text, Textarea } from '@atoms';
import {
  Button,
  Label,
  SkillSelectAutoComplete,
  SimpleSelect,
} from '@molecules';
import { SSAFY_TRACK } from '@utils/constants';
import { useAuthState } from '@store';
import { createTeam, deleteTeam, exitTeam } from '@repository/teamRepository';
import { OptionTypeBase, OptionsType } from 'react-select';
import { Team, SkillOption, Member } from '@utils/type';
import { useRef } from 'react';

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

  .team-leader-container {
    input {
      padding-left: 15px;
      box-sizing: border-box;
      font-size: 16px;
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

// TODO: 트랙 서버에서 가져오기
const trackOptions = SSAFY_TRACK.map((item) => {
  return { label: item, value: item };
});

interface TeamManageModalProps {
  defaultValue?: Team;
  handleClickClose: MouseEventHandler;
}

export default function TeamManageModal({
  defaultValue,
  handleClickClose,
}: TeamManageModalProps): ReactElement {
  const { user } = useAuthState();
  const userToMember = () => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      img: user.img && !user.img.includes('null') ? user.img : '/profile.png',
    };
  };

  const toMemberOptions = (members: Member[]) => {
    return members.map((v) => ({
      ...v,
      label: v.name,
      value: v.name,
    }));
  };

  const [teamName, setTeamName] = useState(defaultValue?.name || '');
  const [teamTrack, setTeamTrack] = useState(defaultValue?.trackName || '');
  const [teamDescription, setTeamDescription] = useState(
    defaultValue?.introduce || '',
  );
  const [teamSkills, setTeamSkills] = useState(defaultValue?.skills || []);
  const [teamLeader, setTeamLeader] = useState(
    defaultValue?.leaderId || user.id,
  );
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showExitConfirmModal, setShowExitConfirmModal] = useState(false);

  const teamNameInputRef = useRef<HTMLInputElement>(null);
  const teamDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const teamMembers = defaultValue?.teamMembers || [userToMember()];
  const currentUserIsLeader: boolean = user.id === defaultValue?.leaderId;

  useEffect(() => {
    if (teamDescriptionRef.current) {
      teamDescriptionRef.current.value = teamDescription;
    }
  }, []);

  const handleChangeTeamName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTeamName(target.value);
  };

  const handleChangeTrack = (selectedTrack: any) => {
    setTeamTrack(selectedTrack.value);
  };

  const handleChangeSkillSelect = (
    selectedSkills: OptionsType<SkillOption>,
  ) => {
    setTeamSkills(selectedSkills.slice());
  };

  const handleChangeDescription: FocusEventHandler = () => {
    if (teamDescriptionRef.current) {
      setTeamDescription(teamDescriptionRef.current.value);
    }
  };

  const handleChangeTeamLeader = (newMember: Member) => {
    setTeamLeader(newMember.id);
  };

  const handleSubmit = () => {
    const skills = teamSkills.map((skill) => ({
      skillCode: skill.id,
      skillName: skill.name,
    }));
    createTeam({
      name: teamName,
      trackName: teamTrack,
      introduce: teamDescription,
      skills,
      teamMembers,
      leaderId: teamLeader,
      completeYn: 0,
    }).then(() => {
      // TODO: 팀 등록 후 새로고침
      // router.reload();
    });
  };

  const handleDeleteTeam = () => {
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteConfirmCancel = () => {
    setShowDeleteConfirmModal(false);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirmModal(false);
    deleteTeam({ teamId: defaultValue?.id }).then(() => {
      // TODO: 팀 삭제 후 새로고침
      // router.reload();
    });
  };

  const handleExitTeam = () => {
    setShowExitConfirmModal(true);
  };

  const handleExitTeamConfirmCancel = () => {
    setShowExitConfirmModal(false);
  };

  const handleExitTeamConfirm = () => {
    setShowExitConfirmModal(false);
    exitTeam({ userId: user.id, teamId: defaultValue?.id }).then(() => {
      // TODO: 팀 나가기 후 새로고침
      // router.reload();
    });
  };

  const toOptionTypeBase = (value: string): OptionTypeBase => {
    const option: OptionTypeBase = {
      label: value,
      value: value,
    };
    return option;
  };

  return (
    <ModalWrapper modalName="teamCreateModal">
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
                defaultValue ? toOptionTypeBase(defaultValue.trackName) : null
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
              />
            </div>
          </Label>
        </div>

        <div className="team-leader-container">
          <Label text="팀장">
            <SimpleSelect
              options={toMemberOptions(teamMembers)}
              onChange={handleChangeTeamLeader}
              value={
                defaultValue
                  ? toMemberOptions(teamMembers).find(
                      (m) => m.id === defaultValue.leaderId,
                    )
                  : toMemberOptions(teamMembers)[0]
              }
            />
          </Label>
        </div>

        <div className="modal-footer">
          <div>
            <Button
              title={defaultValue ? '변경사항 저장' : '팀 만들기'}
              func={handleSubmit}
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
          <ModalWrapper modalName="exitConfirmModal">
            <div className="confirm-modal-container">
              {currentUserIsLeader ? (
                <>
                  <div className="confirm-text">
                    <Text
                      text="팀장는 팀을 나갈 수 없습니다."
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
