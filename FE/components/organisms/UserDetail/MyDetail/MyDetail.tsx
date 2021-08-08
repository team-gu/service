import { ReactElement } from 'react';
import styled from 'styled-components';
import { Icon } from '@atoms';
import { SkillSelectAutoComplete, Label } from '@molecules';
import { useAuthState } from '@store';

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

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 60vw;
  margin: 0 auto 20px auto;
  border-radius: 3px;
  box-shadow: 2px 2px 8px black;

  .name {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    margin: 50px;
  }
`;

const Icons = styled.div`
  margin: 30px;
  display: flex;
  justify-content: flex-end;

  i {
    padding-left: 10px;
    cursor: pointer;
  }
`;

const Introduction = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-template-areas: 'manifesto profileImage';
  gap: 40px;
  @media only all and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'profileImage'
      'manifesto';
  }
`;

const StyledLabel = styled(Label)`
  margin-left: 50px;
`;

const Manifesto = styled.div`
  p {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    width: 80%;
    & + * {
      margin-top: 1em;
    }
  }
  .basicInfo {
    margin: 50px;
  }
  .track {
    margin: 50px;
  }
  .position {
    margin: 50px;
  }
  .skills {
    margin: 50px;
    width: 50%;
  }
  .introduce {
    margin: 50px;
  }
`;

const Portrait = styled.div`
  width: 100% auto;
  text-align: center;

  img {
    width: 70%;
    margin-top: 15vh;
  }
`;

const Projects = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'project project project';
  margin: 50px;

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
`;

const Awards = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'award award award';
  margin: 50px;

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
`;

const Project = styled.div`
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
`;

const Award = styled.div`
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
`;

const getStudentClass = (ID: string) => {
  if (ID[0] !== '0') return ID.slice(0, 2);
  return ID[1];
};

const getStudentRegion = (ID: string) => {
  const regions = ['광주', '구미', '대전', '서울', '부울경'];
  return regions[Number(ID[2]) - 1];
};

const getSkills = (skills: string[]) => {
  return skills.map((skill) => {
    return {
      codeName: skill,
    };
  });
};

const getDate = (date: Date) => {
  return date
    ? JSON.stringify(date).split('').slice(1, 11).join('')
    : '????-??-??';
};
// TODO any에 대한 타입 수정이 필요합니다.
export default function MyDetail({ changeEditMode }: any): ReactElement {
  const { user } = useAuthState();

  return (
    <Wrapper>
      <Icons>
        <Icon iconName="edit" color="black" func={changeEditMode} />
      </Icons>
      <Introduction>
        <Manifesto>
          <div className="basicInfo">
            <p>{`${getStudentRegion(user.studentNumber)} ${getStudentClass(
              user.studentNumber,
            )}기 ${user.name}`}</p>
          </div>
          <div className="track">
            <Label text="트랙">
              <p>{user.wishTrack.join(', ')}</p>
            </Label>
          </div>
          <div className="position">
            <StyledLabel text="포지션">
              <p>{user.wishPositionCode}</p>
            </StyledLabel>
          </div>
          <div className="skills">
            <Label text="사용 기술">
              <SkillSelectAutoComplete
                value={getSkills(user.skills)}
                disabled={true}
              />
            </Label>
          </div>
          <div className="introduce">
            <Label text="자기 소개">
              <p>{user.introduce}</p>
            </Label>
          </div>
        </Manifesto>
        <Portrait>
          <img
            className="default-image"
            alt="프로필이미지"
            src="/profile.png"
          />
        </Portrait>
      </Introduction>
      <div className="name">프로젝트</div>
      <Projects>
        {user.projects.length ? (
          user.projects.map(({ id, name, position, url, introduce }: any) => (
            <a href={url}>
              <Project key={id}>
                <div className="top">
                  <p>{name}</p>
                  <p>{position}</p>
                </div>
                <div className="introduce">{introduce}</div>
              </Project>
            </a>
          ))
        ) : (
          <div>프로젝트가 없습니다.</div>
        )}
      </Projects>
      <div className="name">수상경력</div>
      <Awards>
        {user.awards.length ? (
          user.awards.map(({ id, agency, date, name, introduce }: any) => (
            <Award key={id}>
              <div className="top">
                <p>{agency}</p>
                <p>{name}</p>
              </div>
              <div className="middle">{getDate(date)}</div>
              <div>{introduce}</div>
            </Award>
          ))
        ) : (
          <div>수상경력이 없습니다.</div>
        )}
      </Awards>
    </Wrapper>
  );
}
