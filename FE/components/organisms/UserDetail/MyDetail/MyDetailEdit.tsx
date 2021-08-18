import { ReactElement, SyntheticEvent, useState, useEffect } from 'react';

import { ModalWrapper, LayoutUserDetail } from '@organisms';
import {
  Button,
  SimpleSelect,
  SkillSelectAutoComplete,
  Label,
  ProfileImage,
} from '@molecules';
import { Icon, Textarea, Text } from '@atoms';
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
import { MODALS, getImageURL } from '@utils/constants';
import { Skill } from '@utils/type';
import { urltoFile } from '@utils/dataURLtoFile';
import SetImageModal from '../MyDetail/Modal/SetImageModal';

const getDate = (date: Date) => {
  return date
    ? JSON.stringify(date).split('').slice(1, 11).join('')
    : '????-??-??';
};

const USER_INFO = 0;
const USER_PROJECT = 1;
export default function MyDetailEdit({
  changeEditMode,
  route,
  setRoute,
}: any): ReactElement {
  const { user } = useAuthState();
  const dispatch = useAppDispatch();

  const [image, setImage] = useState(
    user.img === 'null.null' || user.img === ''
      ? '/profile.png'
      : getImageURL(user.img),
  );

  const [submitImage, setSubmitImage] = useState<File>();
  const [useableSkills, setUseableSkills] = useState<any>(user.skills);

  const [introduce, setIntroduce] = useState(user.introduce);
  const [track, setTrack] = useState<any>(user.wishTrack[0]);
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

  useEffect(() => {
    (async () => {
      const res: any =
        user.img === 'null.null' || user.img === ''
          ? null
          : await urltoFile(getImageURL(user.img), user.studentNumber);
      setSubmitImage(res);
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

    try {
      const formData = new FormData();

      if (!introduce || !track || !position || !useableSkills.length) {
        const message = [];
        if (!introduce) message.push('자기 소개');
        if (!track) message.push('트랙');
        if (!position) message.push('포지션');
        if (!useableSkills.length) message.push('사용 기술');

        alert(`${message.join(', ')} 값을 입력해주세요.`);
        return;
      }

      formData.append('email', user.email);
      formData.append('id', user.id);
      formData.append('studentNumber', user.studentNumber);

      formData.append('wishTracks[0].code', track.code);
      formData.append('wishTracks[0].codeName', track.codeName);

      useableSkills.forEach((el, idx) => {
        formData.append(`skills[${idx}].code`, el.code);
        formData.append(`skills[${idx}].codeName`, el.codeName);
      });

      formData.append('wishPosition', position);
      formData.append('introduce', introduce);

      if (submitImage !== '') {
        formData.append('profileImage', submitImage);
      }

      const res = await updateDetailInformation(formData);
      await dispatch(setUserDetail(res.data));
      alert('수정되었습니다.');
      changeEditMode();
    } catch (e) {
      console.log(e);
    }
  };

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
    <LayoutUserDetail isProject={route === USER_PROJECT}>
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

      <div className="profile-container">
        <ProfileImage size={100} src={image} />
        <div className="photo-edit-icon">
          <Icon iconName="photo_camera" func={changeImageMode} />
        </div>
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
          <div
            className="icon-text"
            onClick={() =>
              dispatch(
                displayModal({
                  modalName: MODALS.CHANGEPASSWORD_MODAL,
                }),
              )
            }
          >
            비밀번호 변경
          </div>
          <Icon iconName="clear" color="black" func={changeEditMode} />
        </div>
        {route === USER_INFO ? (
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <div className="introduction">
              <div className="portrait">
                <div className="track">
                  <Label text="트랙" fontSetting="n18b">
                    <SimpleSelect
                      options={getOptions(trackOptions)}
                      onChange={(track) => {
                        setTrack({ codeName: track.value, code: track.code });
                      }}
                      value={
                        user.wishTrack.length > 0
                          ? [
                              {
                                name: user.wishTrack[0].codeName,
                                label: user.wishTrack[0].codeName,
                              },
                            ]
                          : []
                      }
                    />
                  </Label>
                </div>
                <div className="position">
                  <Label text="포지션" fontSetting="n18b">
                    <SimpleSelect
                      options={getOptions(positionOptions)}
                      onChange={(position) => {
                        setPosition(position.value);
                      }}
                      value={
                        user.wishPositionCode
                          ? [
                              {
                                name: user.wishPositionCode,
                                label: user.wishPositionCode,
                              },
                            ]
                          : []
                      }
                    />
                  </Label>
                </div>
                <div className="skills">
                  <Label text="사용 기술" fontSetting="n18b">
                    <SkillSelectAutoComplete
                      onChangeSkills={changeUseableSkills}
                      value={user.skills}
                    />
                  </Label>
                </div>
              </div>
              <div className="manifesto">
                <div className="introduce">
                  <Label text="자기 소개" fontSetting="n18b">
                    {user.introduce ? (
                      <>
                        <Textarea
                          className="text-area-edit"
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
                        <Textarea
                          className="text-area-edit"
                          onChange={handleIntroduce}
                          rows={7}
                          placeholder="자기소개를 작성해주세요"
                          maxLength={300}
                        />
                        <Text
                          text={(introduce ? introduce.length : 0) + ' / 300'}
                          fontSetting="n12m"
                          color="gray"
                        />
                      </>
                    )}
                  </Label>
                </div>
              </div>
            </div>
            <div className="button-right">
              <Button title="수정" type="submit" width="5vw" />
            </div>
          </form>
        ) : (
          <>
            <Label text="프로젝트" fontSetting="n18b">
              <div className="projects">
                {user.projects.map(
                  ({ id, name, position, url, introduce }: any) => (
                    <div className="project cards" key={id}>
                      <div className="top">
                        <p>{name}</p>
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
                          <Icon
                            iconName="clear"
                            func={() => deleteProjectCard(id)}
                          />
                        </div>
                      </div>
                      <div className="middle">{position}</div>
                      <Textarea className="text-area" disabled>
                        {introduce}
                      </Textarea>
                    </div>
                  ),
                )}
                <div
                  className="project last-card"
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
                </div>
              </div>
            </Label>
            <Label text="수상경력" fontSetting="n18b">
              <div className="awards">
                {user.awards.map(
                  ({ id, agency, date, name, introduce }: any) => (
                    <div className="award cards" key={id}>
                      <div className="top">
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
                          <Icon
                            iconName="clear"
                            func={() => deleteAwardCard(id)}
                          />
                        </div>
                      </div>
                      <div className="middle">
                        {getDate(date)} | {agency}
                      </div>
                      <Textarea className="text-area" disabled>
                        {introduce}
                      </Textarea>
                    </div>
                  ),
                )}
                <div
                  className="award last-card"
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
                </div>
              </div>
            </Label>
          </>
        )}
      </div>
    </LayoutUserDetail>
  );
}
