import { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Icon } from '@atoms';
import { SkillSelectAutoComplete } from '@molecules';
import { useAuthState, useAppDispatch, setLoading } from '@store';
import { getUserDetail } from '@repository/userprofile';

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

const Manifesto = styled.div`
  p {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    margin: 50px;
    width: 80%;
    & + * {
      margin-top: 1em;
    }
    .track {
      width: 30%;
    }
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
`;

const Project = styled.div`
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
`;

const Award = styled.div`
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

const SkillSet = styled.div`
  margin: 50px;
  width: 50%;
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

export default function OtherUserDetail(): ReactElement {
  const router = useRouter();
  const { user } = useAuthState();
  const dispatch = useAppDispatch();

  const [otherUser, setOtherUser] = useState<AuthState>(Object);
  const { id } = router.query;
  if (Number(id) === user.id) router.push('/userdetail');

  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    (async () => {
      try {
        const { data } = await getUserDetail(id);
        setOtherUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    })();
  }, []);

  if (!otherUser.name) return <div>존재하지 않는 사용자입니다.</div>;
  return (
    <Wrapper>
      <Icons>
        <Icon iconName="person_add_alt" color="black" />
        <Icon iconName="chat" color="black" />
        <Icon iconName="call" color="black" />
      </Icons>
      <Introduction>
        <Manifesto>
          <p>{`${getStudentRegion(otherUser.studentNumber)} ${getStudentClass(
            otherUser.studentNumber,
          )}기 ${otherUser.name}`}</p>
          <div>
            <p className="track">
              {otherUser.wishTrack.map((track) => track.codeName).join(', ')}
            </p>
            <p>{otherUser.wishPositionCode}</p>
          </div>
          <SkillSet>
            <SkillSelectAutoComplete value={otherUser.skills} disabled={true} />
          </SkillSet>
          <p>{otherUser.introduce}</p>
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
        {otherUser.projects.length ? (
          otherUser.projects.map(
            ({ id, name, position, url, introduce }: any) => (
              <a href={url}>
                <Project key={id}>
                  <div className="top">
                    <p>{name}</p>
                    <p>{position}</p>
                  </div>
                  <div>{introduce}</div>
                </Project>
              </a>
            ),
          )
        ) : (
          <div>프로젝트가 없습니다.</div>
        )}
      </Projects>
      <div className="name">수상경력</div>
      <Awards>
        {otherUser.awards.length ? (
          otherUser.awards.map(({ id, agency, date, name, introduce }: any) => (
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
