import { ReactElement, SyntheticEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon, Textarea, Text } from '@atoms';
import {
  Button,
  SimpleSelect,
  SkillSelectAutoComplete,
  Label,
} from '@molecules';
import { ModalWrapper } from '@organisms';
import {
  useAuthState,
  useAppDispatch,
  setProjects,
  setAwards,
  displayModal,
  setUserDetail,
} from '@store';
import {
  deleteProject,
  deleteAward,
  updateDetailInformation,
} from '@repository/userprofile';
import { getEachFiltersCodeList } from '@repository/filterRepository';
import { MODALS } from '@utils/constants';
import { Skill, SkillOption } from '@utils/type';
import SetImageModal from '../MyDetail/Modal/SetImageModal';

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

  .introduce {
    margin: 50px;
  }

  .useableSkills {
    margin: 50px;
    width: 20vw;
  }
`;

const StyledTextarea = styled(Textarea)`
  width: 70%;
`;

const Portrait = styled.div`
  width: 100% auto;
  text-align: center;

  img {
    width: 70%;
    margin-top: 15vh;
    border: 2px solid gray;
    border-radius: 50%;
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

  .icons {
    position: absolute;
    top: 0;
    right: 0;
    i {
      cursor: pointer;
      font-size: 15px;
    }
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

  .icons {
    position: absolute;
    top: 0;
    right: 0;
    i {
      cursor: pointer;
      font-size: 15px;
    }
  }
`;

const getDate = (date: Date) => {
  return date
    ? JSON.stringify(date).split('').slice(1, 11).join('')
    : '????-??-??';
};

export default function MyDetailEdit({ changeEditMode }: any): ReactElement {
  const { user } = useAuthState();
  const dispatch = useAppDispatch();

  const [image, setImage] = useState(
    user.img === 'null.null' ? '/profile.png' : user.img,
  );

  // 실제 제출하게될 이미지 파일
  const [submitImage, setSubmitImage] = useState<File>();
  const [useableSkills, setUseableSkills] = useState<
    { code: number; codeName: string }[]
  >(user.skills);

  const [introduce, setIntroduce] = useState(user.introduce);
  // TODO 이거 배열로 들어올지 아니면 문자열 하나로 들어올지 확실히 해야함.
  const [track, setTrack] = useState<{ code: number; codeName: string }[]>(
    user.wishTrack[0],
  );
  const [position, setPosition] = useState<string>(user.wishPositionCode);
  const [showCroppedArea, setShowCroppedArea] = useState(false);

  const [trackOptions, setTrackOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await getEachFiltersCodeList(user.studentNumber);
      setTrackOptions(data.트랙);
      setPositionOptions(data.역할);
    })();
  }, []);

  const handleImage = (image: string) => {
    setImage(image);
  };

  const handleSubmitImage = (image: File) => {
    setSubmitImage(image);
  };

  const changeImageMode = () => {
    setShowCroppedArea(!showCroppedArea);
  };

  const handleIntroduce = (e: Event & { target: HTMLTextAreaElement }) => {
    setIntroduce(e.target.value);
  };

  const changeUseableSkills = (value: Skill[]) => {
    setUseableSkills(
      value.map((skill) => {
        return {
          code: skill.code,
          codeName: skill.codeName,
        };
      }),
    );
  };

  const getOptions = (options: any) => {
    return options.map((option: any) => {
      return {
        label: option.codeName,
        value: option.codeName,
        code: option.code,
      };
    });
  };

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // const formData = new FormData();
    // if (descriptionRef.current) {
    //   console.log(descriptionRef.current.value);
    //   formData.append('introduce', descriptionRef.current.value);
    // }
    // console.log(track);
    // console.log(position);
    // console.log(image);
    // console.log(useableSkills);
    // formData.append('email', user.email);
    // formData.append('id', user.id);
    // formData.append('studentNumber', user.studentNumber);
    // formData.append('wishTracks', track);
    // formData.append('wishPosition', position);
    // // formData.append('image', image);
    // formData.append('skills', useableSkills);
    // console.log(formData);
    if (!introduce || !track || !position || !useableSkills.length) {
      const message = [];
      if (!introduce) message.push('자기 소개');
      if (!track) message.push('트랙');
      if (!position) message.push('포지션');
      if (!useableSkills.length) message.push('사용 기술');

      alert(`${message.join(', ')} 값을 입력해주세요.`);
      return;
    }
    try {
      const data = {
        email: user.email,
        id: user.id,
        introduce: introduce,
        stidentNumber: user.studentNumber,
        wishTracks: [track],
        wishPosition: position,
        skills: useableSkills,
      };
      await updateDetailInformation(data);
      await dispatch(
        setUserDetail({
          wishTracks: [track],
          wishPosition: position,
          introduce: introduce,
          skills: useableSkills,
        }),
      );
      // TODO 추후에 모달로
      alert('수정되었습니다.');
      changeEditMode();
    } catch (e) {
      console.log(e);
    }
  };

  //TODO 내가 이런식으로 직접 삭제할건지 결과 데이터를 받아와서 넣을 건지에 대한 대화 필요
  const deleteProjectCard = async (id: number) => {
    try {
      await deleteProject(id);
      await dispatch(
        setProjects(user.projects.filter((project) => project.id !== id)),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAwardCard = async (id: number) => {
    try {
      await deleteAward(id);
      await dispatch(setAwards(user.awards.filter((award) => award.id !== id)));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      {showCroppedArea && (
        <ModalWrapper modalName="setImage">
          <SetImageModal
            image={image}
            setImage={handleImage}
            setSubmitImage={handleSubmitImage}
            changeImageMode={changeImageMode}
          />
        </ModalWrapper>
      )}
      <Icons>
        <Icon iconName="clear" color="black" func={changeEditMode} />
      </Icons>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <Introduction>
          <Manifesto>
            <div className="track">
              <Label text="트랙">
                <SimpleSelect
                  options={getOptions(trackOptions)}
                  onChange={(track) => {
                    setTrack({ codeName: track.value, code: track.code });
                  }}
                  value={[
                    {
                      name: user.wishTrack[0].codeName,
                      label: user.wishTrack[0].codeName,
                    },
                  ]}
                />
              </Label>
            </div>
            <div className="position">
              <Label text="포지션">
                <SimpleSelect
                  options={getOptions(positionOptions)}
                  onChange={(position) => {
                    setPosition(position.value);
                  }}
                  value={[
                    {
                      name: user.wishPositionCode,
                      label: user.wishPositionCode,
                    },
                  ]}
                />
              </Label>
            </div>
            <div className="useableSkills">
              <Label text="사용 기술">
                <SkillSelectAutoComplete
                  onChangeSkills={changeUseableSkills}
                  value={user.skills}
                />
              </Label>
            </div>
            <div className="introduce">
              <Label text="자기 소개">
                {user.introduce ? (
                  <>
                    <StyledTextarea
                      onChange={handleIntroduce}
                      rows={7}
                      maxLength={300}
                      value={introduce}
                    />
                    <Text
                      text={introduce.length + ' / 300'}
                      fontSetting="n12m"
                      color="gray"
                    />
                  </>
                ) : (
                  <>
                    <StyledTextarea
                      onChange={handleIntroduce}
                      rows={7}
                      placeholder="자기소개를 작성해주세요"
                      maxLength={300}
                    />
                    <Text
                      text={introduce.length + ' / 300'}
                      fontSetting="n12m"
                      color="gray"
                    />
                  </>
                )}
              </Label>
            </div>
          </Manifesto>
          <Portrait>
            <img className="default-image" alt="프로필이미지" src={image} />
            <Icon iconName="photo_camera" func={changeImageMode} />
          </Portrait>
        </Introduction>
        <div className="buttonRight">
          <Button title="수정" type="submit" width="5vw" />
        </div>
      </form>
      <div className="name">프로젝트</div>
      <Projects>
        {user.projects.map(({ id, name, position, url, introduce }: any) => (
          <Project className="cards" key={id}>
            <div className="top">
              <p>{name}</p>
              <p>{position}</p>
              <div className="icons">
                <Icon
                  iconName="edit"
                  func={() =>
                    dispatch(
                      displayModal({
                        modalName: MODALS.PROJECT_MODAL,
                        content: {
                          id,
                          name,
                          position,
                          url,
                          introduce,
                        },
                      }),
                    )
                  }
                />
                <Icon iconName="clear" func={() => deleteProjectCard(id)} />
              </div>
            </div>
            <div>{introduce}</div>
          </Project>
        ))}
        <Project
          className="last-card"
          onClick={() =>
            dispatch(
              displayModal({
                modalName: MODALS.PROJECT_MODAL,
                content: {
                  id: null,
                  name: '프로젝트 이름',
                  position: '수행 포지션',
                  url: '프로젝트 url',
                  introduce: '소개',
                },
              }),
            )
          }
        >
          <Icon iconName="add_circle" />
        </Project>
      </Projects>
      <div className="name">수상경력</div>
      <Awards>
        {user.awards.map(({ id, agency, date, name, introduce }: any) => (
          <Award className="cards" key={id}>
            <div className="top">
              <p>{agency}</p>
              <p>{name}</p>
              <div className="icons">
                <Icon
                  iconName="edit"
                  func={() =>
                    dispatch(
                      displayModal({
                        modalName: MODALS.AWARD_MODAL,
                        content: {
                          id,
                          agency,
                          date,
                          name,
                          introduce,
                        },
                      }),
                    )
                  }
                />
                <Icon iconName="clear" func={() => deleteAwardCard(id)} />
              </div>
            </div>
            <div className="middle">{getDate(date)}</div>
            <div>{introduce}</div>
          </Award>
        ))}
        <Award
          className="last-card"
          onClick={() =>
            dispatch(
              displayModal({
                modalName: MODALS.AWARD_MODAL,
                content: {
                  id: null,
                  agency: '발행 기관',
                  date: '날짜',
                  name: '수상명',
                  introduce: '소개',
                },
              }),
            )
          }
        >
          <Icon iconName="add_circle" />
        </Award>
      </Awards>
    </Wrapper>
  );
}
