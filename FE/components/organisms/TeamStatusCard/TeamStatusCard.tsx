import { ReactElement } from 'react';
import styled from 'styled-components';
import { Text } from '@atoms';
import { Tag, ProfileImage, Button } from '@molecules';

const Wrapper = styled.div<{ isComplete: boolean }>`
  position: relative;
  box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.15);
  padding: 20px 60px 20px 20px;

  ${({ isComplete }) => isComplete && 'opacity: 0.5;'}

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

export default function TeamStatusCard(): ReactElement {
  
  const userList = [
    {
      profileSrc: '/profile.png',
      name: '이용재',
      leader: true,
    },
    {
      profileSrc: '/profile.png',
      name: '장동균',
      leader: false,
    },
    {
      profileSrc: '/profile.png',
      name: '장민호',
      leader: false,
    },
  ];
  const skillList = [
    'React',
    'Spring',
    'MySQL',
    'OpenVidu',
    'AWS',
    'HTML',
    'TypeScript',
    'CSS',
  ];
  const track = 'WebRTC';
  const description =
    '저희 팀은 워라벨을 중요시합니다. 관심있는 벡엔드 개발자 DM주세요. 다들 화이팅입니다 👏👏👏';
  const handleClickManageTeam = () => {};
  const isTeamLeader = true;
  const isCompleted = false;

  const team = {
    userList,
    skillList,
    track,
    description,
    isCompleted,
  };

  const user = {
    isTeamLeader,
  };

  // TODO: 팀 조회에 대한 API가 생기면 수정 필요

  return (
    <Wrapper isComplete={team.isCompleted}>
      {user.isTeamLeader && (
        <div className="team-manage-button">
          <Button title="관리" width="60px" func={handleClickManageTeam} />
        </div>
      )}

      <div className="grid-container">
        <div className="profiles-container">
          <Text text="팀 구성" color="gray" />
          <div className="profiles">
            {team.userList.map((item, index) => (
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
            {team.skillList.map((item, index) => (
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
            <Text text={team.description} isLineBreak fontSetting="n20m" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
