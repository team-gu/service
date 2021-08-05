import {
  ReactElement,
  MouseEventHandler,
  useState,
  ChangeEvent,
  FocusEventHandler,
} from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '@organisms';
import { Icon, Input, Text, Textarea } from '@atoms';
import {
  Button,
  Label,
  ProfileImage,
  SkillSelectAutoComplete,
  UserSelectAutoComplete,
  SimpleSelect,
} from '@molecules';
import { SSAFY_CLASS, SSAFY_REGION, SSAFY_TRACK } from '@utils/constants';
import { useAuthState } from '@store';
import { createTeam } from '@repository/baseRepository';
import { useRouter } from 'next/router';
import { OptionTypeBase, OptionsType } from 'react-select';
import { Team, SkillOption, MemberOption, Member } from '@utils/type';
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

  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(8, auto);

  .modal-header {
    grid-column: 1 / 4;
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
    grid-column: 1 / 4;
    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .team-region-container {
    margin-bottom: 20px;
    > div {
      margin-right: 15px;
    }
  }

  .team-class-container {
    > div {
      margin-right: 15px;
    }
  }

  .team-track-container {
  }

  .team-description-container {
    grid-column: 1 / 4;
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
    grid-column: 1 / 4;
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
    grid-column: 1 / 4;

    input {
      padding-left: 15px;
      box-sizing: border-box;
      font-size: 16px;
    }
  }

  .team-invite-container {
    grid-column: 1 / 4;

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
    grid-column: 1 / 4;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 50px;
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
`;

const regionOptions = SSAFY_REGION.map((item) => {
  return { label: item, value: item };
});

const classOptions = SSAFY_CLASS.map((item) => {
  return { label: item, value: item };
});

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
  const router = useRouter();
  const { user } = useAuthState();
  const [teamName, setTeamName] = useState(defaultValue?.name || '');
  const [teamRegion, setTeamRegion] = useState(defaultValue?.region || '');
  const [teamClass, setTeamClass] = useState(defaultValue?.class || '');
  const [teamTrack, setTeamTrack] = useState(defaultValue?.track || '');
  const [teamDescription, setTeamDescription] = useState(
    defaultValue?.description || '',
  );
  const [teamSkills, setTeamSkills] = useState(defaultValue?.skills || []);
  const [teamMembers, setTeamMembers] = useState(defaultValue?.members || []);
  const [incorrectSelectUser, setIncorrectSelectUser] = useState(false);

  const teamNameInputRef = useRef<HTMLInputElement>(null);
  const teamDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleChangeTeamName = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTeamName(target.value);
  };

  const handleChangeRegion = (selectedRegion: string) => {
    setTeamRegion(selectedRegion);
  };

  const handleChangeClass = (selectedClass: string) => {
    setTeamClass(selectedClass);
  };

  const handleChangeTrack = (selectedTrack: string) => {
    setTeamTrack(selectedTrack);
  };

  const handleChangeSkillSelect = (
    selectedSkills: OptionsType<SkillOption>,
  ) => {
    setTeamSkills(selectedSkills.slice());
  };

  const handleChangeUser = (selectedMember: MemberOption | null) => {
    if (selectedMember) {
      if (!teamMembers.some((v) => v.id === selectedMember.id)) {
        setTeamMembers([...teamMembers, { ...selectedMember }]);  
      } else {
        setIncorrectSelectUser(true);
        setTimeout(() => {
          setIncorrectSelectUser(false);
        }, 1000)
      }
    }
  };

  const handleDeleteMember = (index: number) => {
    setTeamMembers(teamMembers.filter((v, i) => i !== index));
  };

  const handleChangeDescription: FocusEventHandler = () => {
    if (teamDescriptionRef.current) {
      setTeamDescription(teamDescriptionRef.current.value);
    }
  };

  const handleSubmit = () => {
    console.log(teamName);
    console.log(teamRegion);
    console.log(teamClass);
    console.log(teamTrack);
    console.log(teamDescription);
    console.log(teamSkills);
    console.log(teamMembers);

    createTeam({
      name: teamName,
      region: teamRegion,
      class: teamClass,
      track: teamTrack,
      description: teamDescription,
      skills: teamSkills,
      members: teamMembers,
    });

    // TODO: 팀 등록 후 새로고침
    // router.reload();
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

        <div className="team-region-container">
          <Label text="지역">
            <SimpleSelect
              options={regionOptions}
              onChange={handleChangeRegion}
              value={
                defaultValue ? toOptionTypeBase(defaultValue.region) : null
              }
            />
          </Label>
        </div>
        <div className="team-class-container">
          <Label text="반">
            <SimpleSelect
              options={classOptions}
              onChange={handleChangeClass}
              value={defaultValue ? toOptionTypeBase(defaultValue.class) : null}
            />
          </Label>
        </div>
        <div className="team-track-container">
          <Label text="트랙">
            <SimpleSelect
              options={trackOptions}
              onChange={handleChangeTrack}
              value={defaultValue ? toOptionTypeBase(defaultValue.track) : null}
            />
          </Label>
        </div>

        <div className="team-description-container">
          <Label text="팀 소개">
            <Textarea
              onBlur={handleChangeDescription}
              refValue={defaultValue ? defaultValue.description : ''}
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
            <Input
              value={user.name ? user.name : '현재 사용자 이름'}
              readOnly
              width="100%"
              height="40px"
            />
          </Label>
        </div>

        <div className="team-invite-container">
          <Label text="팀원 초대">
            <div>
              <div
                className={incorrectSelectUser ? 'incorrect-select-shake' : ''}
              >
                <UserSelectAutoComplete
                  handleChangeUserSelect={handleChangeUser}
                />
              </div>

              <div className="profiles">
                <div className="profile-and-name">
                  <ProfileImage />
                  <div className="name-in-profile">
                    {user.name ? user.name : '이름'}
                  </div>
                </div>
                {teamMembers.map((item, index) => (
                  <div className="profile-and-name" key={item.id}>
                    <ProfileImage />
                    <div className="name-in-profile">{item.name}</div>
                    <Icon
                      iconName="remove_circle"
                      func={() => handleDeleteMember(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Label>
        </div>

        <div className="modal-footer">
          <Button
            title={defaultValue ? '저장' : '팀 만들기'}
            func={handleSubmit}
          />
        </div>
      </Wrapper>
    </ModalWrapper>
  );
}
