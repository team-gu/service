import { ReactElement } from 'react';

import { LayoutUserDetail } from '@organisms';
import { Tag, Label, ProfileImage } from '@molecules';
import { Icon, Text, Textarea } from '@atoms';
import { useAuthState, useAppDispatch, displayModal } from '@store';
import { MODALS, getImageURL } from '@utils/constants';

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
export default function MyDetail({
  changeEditMode,
  route,
  setRoute,
}: any): ReactElement {
  const dispatch = useAppDispatch();
  const { user } = useAuthState();

  return (
    <LayoutUserDetail isProject={route === USER_PROJECT}>
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
        <button
          type="button"
          onClick={() =>
            dispatch(
              displayModal({
                modalName: MODALS.CHANGEPASSWORD_MODAL,
              }),
            )
          }
        >
          비밀번호 변경
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
                  <div className="skill-tags">
                    {user.skills?.map((each) => (
                      <Tag
                        text={each.codeName}
                        key={`skill-${each.codeName}`}
                      />
                    ))}
                  </div>
                </Label>
              </div>
            </div>
            <div className="manifesto">
              <div className="introduce">
                <Label text="자기 소개" fontSetting="n18b">
                  <Textarea
                    className="text-area"
                    value={user.introduce}
                    disabled
                  />
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
                      <a
                        href={
                          url.includes('https') || url.includes('http')
                            ? url
                            : 'http://' + url
                        }
                        target="_blank"
                      >
                        <div className="project" key={id}>
                          <div className="top">
                            <Text text={name} isLineBreak fontSetting="n14b" />
                          </div>
                          <div className="middle">{position}</div>
                          <Textarea
                            className="text-area"
                            value={introduce}
                            disabled
                          />
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
                          <Text text={name} isLineBreak fontSetting="n14b" />
                        </div>
                        <div className="middle">
                          {getDate(date)} | {agency}
                        </div>
                        <Textarea
                          className="text-area"
                          value={introduce}
                          disabled
                        />
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
    </LayoutUserDetail>
  );
}
