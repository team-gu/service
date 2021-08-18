import { ReactElement, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { LayoutUserDetail } from '@organisms';
import { SkillSelectAutoComplete, Label, ProfileImage } from '@molecules';
import { Icon, Text, Textarea } from '@atoms';
import { useAuthState, useAppDispatch, setLoading, setChatOpen } from '@store';
import useSockStomp from '@hooks/useSockStomp';
import { getUserHasTeam } from '@repository/teamRepository';

import { getUserDetail } from '@repository/userprofile';
import { getImageURL } from '@utils/constants';

interface AuthState {
  awards: object[];
  email: string;
  id: number;
  img: string;
  introduce: string;
  major: number;
  name: string;
  projects: object[];
  projectCode: number[];
  role: number;
  skills: string[];
  studentNumber: string;
  userClass: number | null;
  wishPositionCode: string;
  wishTrack: string[];
}

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
export default function OtherUserDetail(): ReactElement {
  const { handleSendInvitation, handleSendRtcLink } = useSockStomp({
    room_id: 0,
  });
  const router = useRouter();
  const { user } = useAuthState();
  const dispatch = useAppDispatch();

  const [route, setRoute] = useState(USER_INFO);
  const [isLeader, setIsLeader] = useState(false);
  const [teamId, setTeamId] = useState(0);

  const [otherUser, setOtherUser] = useState<AuthState>(Object);
  const { id } = router.query;
  if (Number(id) === user.id) router.push('/userdetail');

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    (async () => {
      if (id) {
        try {
          const { data } = await getUserDetail(id);
          setOtherUser(data);

          getUserHasTeam({
            userId: user.id,
            project: { code: user.projectCodes[user.projectCodes.length - 1] },
          }).then(({ data: { data } }) => {
            if (data.hasTeam) {
              if (data.team.leaderId === user.id) {
                setTeamId(data.team.id);
                setIsLeader(true);
              }
            }
          });
        } catch (error) {
          console.error(error);
        } finally {
          dispatch(setLoading({ isLoading: false }));
        }
      }
    })();
  }, [id]);

  if (!otherUser.name) return <div>존재하지 않는 사용자입니다.</div>;
  return (
    <LayoutUserDetail isProject={route === USER_PROJECT}>
      <div className="profile-container">
        <ProfileImage src={getImageURL(otherUser.img)} size={100} />
        <Text
          text={`${getStudentRegion(otherUser.studentNumber)} ${getStudentClass(
            otherUser.studentNumber,
          )}기 ${otherUser.name}`}
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
          {isLeader && (
            <Icon
              iconName="person_add_alt"
              color="black"
              func={() => handleSendInvitation(teamId, user.id, id)}
            />
          )}
          <Icon
            iconName="chat"
            color="black"
            func={() =>
              dispatch(setChatOpen({ isChatOpen: true, passedOpponentId: id }))
            }
          />
          <Icon
            iconName="call"
            color="black"
            func={() => handleSendRtcLink(user.id, id)}
          />
        </div>
        {route === USER_INFO ? (
          <div className="introduction">
            <div className="portrait">
              <div className="track">
                <Label text="트랙" fontSetting="n18b">
                  <p className="track">
                    {otherUser.wishTrack
                      .map((track) => track.codeName)
                      .join(', ')}
                  </p>
                </Label>
              </div>
              <div className="position">
                <Label text="포지션" fontSetting="n18b">
                  <p>{otherUser.wishPositionCode}</p>
                </Label>
              </div>

              <div className="skills">
                <Label text="사용 기술" fontSetting="n18b">
                  <SkillSelectAutoComplete
                    value={otherUser.skills}
                    disabled={true}
                  />
                </Label>
              </div>
            </div>

            <div className="manifesto">
              <div className="introduce">
                <Label text="자기 소개" fontSetting="n18b">
                  <Textarea className="text-area" disabled>
                    {otherUser.introduce}
                  </Textarea>
                </Label>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Label text="프로젝트" fontSetting="n18b">
              <div className="projects">
                {otherUser.projects.length ? (
                  otherUser.projects.map(
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
                            <p>{name}</p>
                            <p>{position}</p>
                          </div>
                          <div>{introduce}</div>
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
                {otherUser.awards.length ? (
                  otherUser.awards.map(
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
    </LayoutUserDetail>
  );
}
