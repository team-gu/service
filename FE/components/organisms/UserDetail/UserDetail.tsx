import { ReactElement } from 'react';
import Link from 'next/link';
import { Icon } from '@atoms';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 60vw;
  margin: 0 auto 20px auto;
  border-radius: 3px;
  box-shadow: 2px 2px 8px black;
`;

const Icons = styled.div`
  margin: 30px;
  display: flex;
  justify-content: flex-end;

  i {
    padding-left: 10px;
    curosr: pointer;
  }
`;

const Introduction = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  gap: 40px;
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
  width: 100%;
  overflow: hidden;

  img {
    width: 70%;
    height: auto;
    margin-top: 15vh;
  }
`;

const Projects = styled.div`
  grid-column: span 3;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 50px;

  /* Todo: 미디어 쿼리가 제대로 안먹음 */
  /* @media (max-width: 768px) {
    grid-column: span 2;
    grid-template-columns: 1fr 1fr;
  } */

  p {
    grid-column: span 3;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    width: 80%;
  }
`;

const Card = styled.div`
  border: 1px solid #eaeaea;
  padding: 24px;
  border-radius: 5px;
  text-align: left;
  height: 80px;
  flex: 1.1;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
`;

export default function UserDetail(): ReactElement {
  return (
    <Wrapper>
      <Icons>
        <Icon iconName="edit" color="black" />
        <Icon iconName="person_add_alt" color="black" />
        <Icon iconName="chat" color="black" />
        <Icon iconName="call" color="black" />
      </Icons>
      <Introduction>
        <Manifesto>
          <p>지역 기수 반 이름</p>
          <div>
            <p className="track">트랙</p>
            <p>희망포지션</p>
          </div>
          <p>
            I mostly spend time developing, designing and surfing the web while
            Music or watching Netflix. Endless learning keeps me alive and never
            hangs me down to the past.
          </p>
        </Manifesto>
        <Portrait>
          <img
            className="default-image"
            alt="프로필이미지"
            src="/profile.png"
          />
        </Portrait>
        <Projects>
          <p>프로젝트</p>
          <Card>ssss</Card>
          <Card>ssss</Card>
          <Card>ssss</Card>
          <Card>ssss</Card>
        </Projects>
      </Introduction>
    </Wrapper>
  );
}
