import { ReactElement, SyntheticEvent, useState, useRef } from 'react';
import { Icon, Input, Textarea } from '@atoms';
import { Button, SimpleSelect, SkillSelectAutoComplete } from '@molecules';
import { useAuthState } from '@store';
import styled from 'styled-components';
import { ProjectModal, AwardModal } from './Modal';

interface ProjectType {
  id: number | null;
  name: string;
  position: string;
  url: string;
  introduce: string;
}

interface AwardType {
  id: number | null;
  agency: string;
  date: string;
  name: string;
  introduce: string;
}

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 60vw;
  margin: 0 auto 20px auto;
  border-radius: 3px;
  box-shadow: 2px 2px 8px black;

  .buttonRight {
    float: right;
    margin-right: 10vw;
  }

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

const Manifesto = styled.div`
  Input,
  textarea {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
  }

  input::placeholder {
    color: red;
  }
  textarea::placeholder {
    color: red;
  }

  input::-webkit-input-placeholder {
    color: red;
  }
  input:-ms-input-placeholder {
    color: red;
  }
  textarea::-webkit-input-placeholder {
    color: red;
  }
  textarea:-ms-input-placeholder {
    color: red;
  }

  .basic-information {
    display: flex;
    margin: 50px;

    gap: 20px;
  }

  .track {
    margin: 50px;
    width: 20vw;
  }

  .position {
    margin: 50px;
    width: 20vw;
  }

  .useableSkills {
    margin: 50px;
    width: 20vw;
  }
`;

const StyledTextarea = styled(Textarea)`
  width: 70%;
  margin: 50px;
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
  grid-column: span 3;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: 'project project project';
  margin: 50px;

  @media only all and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'project project';
  }

  p {
    grid-column: span 3;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    width: 80%;
  }
  .last-card:last-child {
    cursor: pointer;
    i {
      position: absolute;
      top: 40%;
      left: 45%;
    }
  }
`;

const Awards = styled.div`
  grid-column: span 3;
  display: grid;
  grid-gap: 20px;
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
  .last-card:last-child {
    cursor: pointer;
    i {
      position: absolute;
      top: 40%;
      left: 45%;
    }
  }
`;

const Project = styled.div`
  position: relative;
  border: 1px solid #eaeaea;
  padding: 24px;
  border-radius: 5px;
  text-align: left;
  height: 80px;
  flex: 1.1;
  transition: box-shadow 0.2s;
  overflow: hidden;
  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  &.cards:hover {
    height: 80%;
  }

  .top {
    display: flex;
    font-size: 10px;
    margin-bottom: 16px;
  }
  i {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 15px;
  }
`;

const Award = styled.div`
  position: relative;
  border: 1px solid #eaeaea;
  padding: 24px;
  border-radius: 5px;
  text-align: left;
  height: 80px;
  flex: 1.1;
  transition: box-shadow 0.2s;
  overflow: hidden;
  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  &.cards:hover {
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
  i {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 15px;
  }
`;

const trackOptions = [
  {
    value: '웹IOT',
    label: '웹IOT',
  },
  {
    value: '웹기술',
    label: '웹기술',
  },
  {
    value: '웹디자인',
    label: '웹디자인',
  },
];

const SkillOptions = [
  {
    value: 'Front',
    label: 'Front',
  },
  {
    value: 'Back',
    label: 'Back',
  },
];

const getSkills = (skills: string[]) => {
  return skills.map((skill) => {
    return {
      name: skill,
    };
  });
};

export default function MyDetailEdit({ changeEditMode }: any): ReactElement {
  const [image, setImage] = useState('');
  const [projectModalData, setProjectModalData] = useState<ProjectType>(Object);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [awardModalData, setAwardModalData] = useState<AwardType>(Object);
  const [showAwardModal, setShowAwardModal] = useState(false);
  const [useableSkills, setUseableSkills] = useState<string[]>([]);

  const [track, setTrack] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuthState();

  const editProject = (
    id: number | null,
    name: string,
    position: string,
    url: string,
    introduce: string,
  ) => {
    setProjectModalData({
      id,
      name,
      position,
      url,
      introduce,
    });
    setShowProjectModal(true);
  };

  const editAward = (
    id: number | null,
    agency: string,
    date: string,
    name: string,
    introduce: string,
  ) => {
    setAwardModalData({
      id,
      agency,
      date,
      name,
      introduce,
    });
    setShowAwardModal(true);
  };

  const changeImage = (e: any) => {
    setImage(e.target.files[0]);
  };

  const changeUseableSkills = (value: { id: number; name: string }[]) => {
    setUseableSkills(value.map((skill) => skill.name));
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (descriptionRef.current) {
      console.log(descriptionRef.current.value);
      formData.append('description', descriptionRef.current.value);
    }
    console.log(track);
    console.log(position);
    console.log(image);
    console.log(useableSkills);
    formData.append('track', track);
    formData.append('position', position);
    formData.append('image', image);
    formData.append('useableSkills', useableSkills);
    console.log(formData);
  };

  return (
    <Wrapper>
      {showProjectModal && (
        <ProjectModal
          projectModalData={projectModalData}
          setShowProjectModal={setShowProjectModal}
        />
      )}
      {showAwardModal && (
        <AwardModal
          awardModalData={awardModalData}
          setShowAwardModal={setShowAwardModal}
        />
      )}
      <Icons>
        <Icon iconName="clear" color="black" func={changeEditMode} />
        <Icon iconName="person_add_alt" color="black" />
        <Icon iconName="chat" color="black" />
        <Icon iconName="call" color="black" />
      </Icons>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <Introduction>
          <Manifesto>
            <div className="track">
              <SimpleSelect
                options={trackOptions}
                onChange={(track: string) => setTrack(track)}
                value={[{ name: user.wishTrack[0], label: user.wishTrack[0] }]}
              />
            </div>
            <div className="position">
              <SimpleSelect
                options={SkillOptions}
                onChange={(position: string) => setPosition(position)}
                value={[
                  { name: user.wishPositionCode, label: user.wishPositionCode },
                ]}
              />
            </div>
            <div className="useableSkills">
              <SkillSelectAutoComplete
                onChangeSkills={(skill) => changeUseableSkills(skill)}
                value={getSkills(user.skills)}
              />
            </div>
            {user.introduce ? (
              <StyledTextarea ref={descriptionRef} rows={7}>
                {user.introduce}
              </StyledTextarea>
            ) : (
              <StyledTextarea
                ref={descriptionRef}
                rows={7}
                placeholder="자기소개를 작성해주세요"
              ></StyledTextarea>
            )}
          </Manifesto>
          <Portrait>
            <img
              className="default-image"
              alt="프로필이미지"
              src="/profile.png"
            />
            <Input type="file" func={changeImage} name="img" />
          </Portrait>
        </Introduction>
        <div className="buttonRight">
          <Button title="수정" type="submit" width="5vw" />
        </div>
      </form>
      <div className="name">프로젝트</div>
      <Projects>
        {user.projects.map(({ id, name, position, url, introduce }: any) => (
          <Project className="cards">
            <div className="top">
              <p>{name}</p>
              <p>{position}</p>
              <Icon
                iconName="edit"
                func={() => editProject(id, name, position, url, introduce)}
              />
            </div>
            <div>{introduce}</div>
          </Project>
        ))}
        <Project
          className="last-card"
          onClick={() =>
            editProject(
              null,
              '팀 이름을 입력',
              '포지션 입력',
              '프로젝트 url',
              '소개',
            )
          }
        >
          <Icon iconName="add_circle" />
        </Project>
      </Projects>
      <div className="name">수상경력</div>
      <Awards>
        {user.awards.map(({ id, agency, date, name, introduce }: any) => (
          <Award className="cards">
            <div className="top">
              <p>{agency}</p>
              <p>{name}</p>
              <Icon
                iconName="edit"
                func={() => editAward(id, agency, date, name, introduce)}
              />
            </div>
            <div className="middle">{date}</div>
            <div>{introduce}</div>
          </Award>
        ))}
        <Award
          className="last-card"
          onClick={() =>
            editAward(null, '주관 조직 입력', '날짜 입력', '상 이름', '소개')
          }
        >
          <Icon iconName="add_circle" />
        </Award>
      </Awards>
    </Wrapper>
  );
}
