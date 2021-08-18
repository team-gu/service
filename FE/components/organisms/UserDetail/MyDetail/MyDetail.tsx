import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { SkillSelectAutoComplete, Label, ProfileImage } from '@molecules';
import { Icon, Text, Textarea } from '@atoms';
import { useAuthState } from '@store';
import { getImageURL } from '@utils/constants';

interface Project {
  name: string;
  position: string;
  url: string;
  introduce: string;
}

interface Award {
  agency: string;
  date: Date;
  name: string;
  introduce: string;
}

const Wrapper = styled.div<{ isProject: boolean }>`
  width: 60vw;
  height: fit-content;
  margin: 0 auto 20px auto;

  .profile-container {
    ${({ theme: { flexCol } }) => flexCol('space-between')}
    height: 150px;
    margin: 30px 0px;
  }

  .button-container {
    ${({ theme: { flexRow } }) => flexRow()}
    button {
      width: 50%;
      height: 50px;
      border: none;
      font-size: 14px;
      font-weight: bold;
      :first-child {
        ${({
          isProject,
          theme: {
            colors: { samsungLightBlue },
          },
        }) =>
          !isProject
            ? `background-color: ${samsungLightBlue};color: white;`
            : `background-color: white`}
      }
      :last-child {
        ${({
          isProject,
          theme: {
            colors: { samsungLightBlue },
          },
        }) =>
          isProject
            ? `background-color: ${samsungLightBlue};color: white;`
            : `background-color: white`}
      }
    }

    margin: 20px 0px;
  }

  .typography {
    background-color: white;
    padding: 50px;

    .icons {
      ${({ theme: { flexRow } }) => flexRow('flex-end')}

      i {
        padding-left: 10px;
        cursor: pointer;
      }
    }

    .introduction {
      margin: auto;
      display: grid;
      grid-template-columns: 0.8fr 1.2fr;
      grid-template-areas: 'manifesto profileImage';
      gap: 40px;
      @media only all and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-areas:
          'profileImage'
          'manifesto';
      }

      .portrait {
        width: 100% auto;
        margin-right: 15px;
        img {
          border-radius: 50%;
        }
        .basicInfo {
          margin-bottom: 20px;
        }
        .track {
          margin-bottom: 20px;
        }
        .position {
          margin-bottom: 20px;
        }
        .skills {
          margin-bottom: 20px;
          width: 100%;
        }
        .introduce {
          margin-bottom: 20px;
        }
      }

      .manifesto {
        p {
          font-size: 20px;
          line-height: 1.4;
          width: 80%;
          & + * {
            margin-top: 1em;
          }
        }
      }
    }

    .projects {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas: 'project project project';

      @media only all and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'project project';
      }

      a {
        text-decoration: none;
        color: black;
      }
      p {
        grid-column: span 3;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.4;
        width: 80%;
      }

      .project {
        position: relative;
        border: 1px solid #eaeaea;
        padding: 24px;
        border-radius: 5px;
        text-align: left;
        height: 80px;
        cursor: pointer;
        flex: 1.1;
        transition: box-shadow 0.2s;
        overflow: hidden;
        transition: 0.5s;
        &:hover {
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
          height: 80%;
        }
        .top {
          display: flex;
          font-size: 10px;
          margin-bottom: 16px;
        }
        .introduce {
          position: absolute;
        }
      }
    }

    .awards {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-areas: 'award award award';

      @media only all and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'award award';
      }

      p {
        grid-column: span 3;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.4;
        width: 80%;
      }

      .award {
        position: relative;
        border: 1px solid #eaeaea;
        padding: 24px;
        border-radius: 5px;
        text-align: left;
        height: 80px;
        cursor: pointer;
        flex: 1.1;
        transition: box-shadow 0.2s;
        overflow: hidden;
        transition: 0.5s;
        &:hover {
          box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
          height: 80%;
        }

        .top {
          display: flex;
          font-size: 10px;
          margin-bottom: 15px;
        }
        .middle {
          margin-bottom: 8px;
          font-size: 8px;
        }
      }
    }
  }

  .name {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
  }

  .text-area {
    border: none;
    background-color: transparent;
    resize: none;
    width: 100%;
    min-height: 200px;
  }
`;

const getStudentClass = (ID: string) => {
  if (ID[0] !== '0') return ID.slice(0, 2);
  return ID[1];
};

const getStudentRegion = (ID: string) => {
  const regions = ['광주', '구미', '대전', '서울', '부울경'];
  return regions[Number(ID[2]) - 1];
};

const getDate = (date: Date) => {
  return date
    ? JSON.stringify(date).split('').slice(1, 11).join('')
    : '????-??-??';
};

const USER_INFO = 0;
const USER_PROJECT = 1;
// TODO any에 대한 타입 수정이 필요합니다.
export default function MyDetail({ changeEditMode }: any): ReactElement {
  const [route, setRoute] = useState(USER_INFO);
  const { user } = useAuthState();

  return (
    <Wrapper isProject={route === USER_PROJECT}>
      <div className="profile-container">
        <ProfileImage src={getImageURL(user.img)} size={100} />
        <Text
          text={`${getStudentRegion(user.studentNumber)} ${getStudentClass(
            user.studentNumber,
          )}기 ${user.name}`}
          fontSetting="n18m"
        />
      </div>
      <div className="button-container">
        <button type="button" onClick={() => setRoute(USER_INFO)}>
          유저 정보
        </button>
        <button type="button" onClick={() => setRoute(USER_PROJECT)}>
          프로젝트
        </button>
      </div>
      <div className="typography">
        <div className="icons">
          <Icon iconName="edit" color="black" func={changeEditMode} />
        </div>
        {route === USER_INFO ? (
          <div className="introduction">
            <div className="portrait">
              <div className="track">
                <Label text="트랙" fontSetting="n18b">
                  <p>
                    {user.wishTrack.map((track) => track.codeName).join(', ')}
                  </p>
                </Label>
              </div>
              <div className="position">
                <Label text="포지션" fontSetting="n18b">
                  <p>{user.wishPositionCode}</p>
                </Label>
              </div>
              <div className="skills">
                <Label text="사용 기술" fontSetting="n18b">
                  <SkillSelectAutoComplete value={user.skills} disabled />
                </Label>
              </div>
            </div>
            <div className="manifesto">
              <div className="introduce">
                <Label text="자기 소개" fontSetting="n18b">
                  <Textarea className="text-area" disabled>
                    {user.introduce}
                  </Textarea>
                </Label>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Label text="프로젝트" fontSetting="n18b">
              <div className="projects">
                {user.projects.length ? (
                  user.projects.map(
                    ({ id, name, position, url, introduce }: any) => (
                      <a href={url}>
                        <div className="project" key={id}>
                          <div className="top">
                            <p>{name}</p>
                            <p>{position}</p>
                          </div>
                          <div className="introduce">{introduce}</div>
                        </div>
                      </a>
                    ),
                  )
                ) : (
                  <div>프로젝트가 없습니다.</div>
                )}
              </div>
            </Label>
            <Label text="수상경력" fontSetting="n18b">
              <div className="awards">
                {user.awards.length ? (
                  user.awards.map(
                    ({ id, agency, date, name, introduce }: any) => (
                      <div className="award" key={id}>
                        <div className="top">
                          <p>{agency}</p>
                          <p>{name}</p>
                        </div>
                        <div className="middle">{getDate(date)}</div>
                        <div>{introduce}</div>
                      </div>
                    ),
                  )
                ) : (
                  <div>수상경력이 없습니다.</div>
                )}
              </div>
            </Label>
          </>
        )}
      </div>
    </Wrapper>
  );
}
