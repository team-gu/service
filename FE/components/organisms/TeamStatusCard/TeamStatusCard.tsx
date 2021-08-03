import { ReactElement } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';
import { Tag, ProfileImage, Button } from '@molecules';

const Wrapper = styled.div<{ isComplete: boolean }>`
  position: relative;
  box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.15);
  padding: 20px 60px 20px 20px;

  .completed-team-overlay {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: gray;
    opacity: 0.5;
  }

  ${({ isComplete }) => isComplete && `
    .completed-team-overlay {
      display: block;
    }
  `}

  .team-manage-button {
    position: absolute;
    right: 15px;
    bottom: 15px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;

    .profiles-container {
      grid-column: 1 / 2;
      grid-row: 1 / 2;

      .profiles {
        padding: 0 15px 0 5px;
        .profile {
          display: inline-block;
          margin: 10px;
          text-align: center;
        }
      }
    }

    .skills-container {
      grid-column: 1 / 2;
      grid-row: 2 / 3;

      .skills {
        margin-top: 10px;
        padding-left: 5px;
        > div {
          display: inline-block;
          margin: 0 5px;
        }
      }
    }

    .description-container {
      grid-column: 2 / 3;
      grid-row: 1 / 3;

      .track {
        margin-bottom: 20px;
      }
    }
  }
`;

// TODO: team type
export default function TeamStatusCard({ team }: any): ReactElement {
  const handleClickManageTeam = () => {
    console.log('팀 관리 클릭');
  };
  const getUserIsLeader = () => {
    return false;
  };

  // TODO: 팀 조회에 대한 API가 생기면 수정 필요

  return (
    <Wrapper isComplete={team.isCompleted}>
      {getUserIsLeader() && (
        <div className="team-manage-button">
          <Button title="관리" width="60px" func={handleClickManageTeam} />
        </div>
      )}

      <div className="grid-container">
        <div className="profiles-container">
          <Text text="팀 구성" color="gray" />
          <div className="profiles">
            {team.members.map((item, index) => (
              <div className="profile" key={index}>
                <ProfileImage size={80} src={item.profileSrc} />
                {item.leader ? (
                  <Text text={item.name + '(팀장)'} />
                ) : (
                  <Text text={item.name} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="skills-container">
          <Text text="기술" color="gray" />
          <div className="skills">
            {/* TODO: 타입 수정 */}
            {team.skills.map((item, index) => (
              <Tag text={item} key={index} />
            ))}
          </div>
        </div>
        <div className="description-container">
          <div className="track">
            <Text text="트랙" color="gray" />
            <Text text={team.track} fontSetting="n20m" />
          </div>
          <div className="description">
            <Text text="소개" color="gray" />
            <Text text={team.description} isLineBreak fontSetting="n18m" />
          </div>
        </div>
      </div>
      <div className="completed-team-overlay"></div>
    </Wrapper>
  );
}
