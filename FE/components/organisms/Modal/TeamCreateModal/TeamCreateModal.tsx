import { ReactElement, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { ModalWrapper } from '@organisms';
import { Icon, Input, Text } from '@atoms';
import { Button, Label, ProfileImage, Tag } from '@molecules';

interface TeamCreateModalProps {
  handleClickClose: MouseEventHandler;
}

const Wrapper = styled.div`
  display: grid;
  position: relative;
  width: 600px;
  padding: 0 50px;
  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar-thumb {
    background-color: #2f3542;
    border-radius: 5px;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(8, auto);

  .modal-header {
    grid-column: 1 / 4;
    text-align: center;
    padding-top: 40px;
    padding-bottom: 20px;

    .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;

      i {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }

  .team-name-container {
    grid-column: 1 / 4;
    input {
      padding-left: 10px;
      font-size: 15px;
    }
  }

  .team-region-container {
    margin-bottom: 20px;
    select {
      width: 90%;
    }
  }

  .team-class-container {
    select {
      width: 90%;
    }
  }

  .team-track-container {
    select {
      width: 90%;
    }
  }

  .team-description-container {
    grid-column: 1 / 4;
    margin-bottom: 15px;

    textarea {
      width: 100%;
      height: 50px;
      padding: 5px;
      border: solid 1px #EEEEEE;
    }
  }

  .team-skills-container {
    grid-column: 1 / 4;
    margin-bottom: 15px;

    .input {
      margin-bottom: 20px;
    }

    input {
      padding-left: 10px;
      font-size: 15px;
    }

    .skills {
      display: flex;
      > div {
        margin-right: 10px;
      }
    }
  }

  .team-leader-container {
    grid-column: 1 / 4;

    input {
      padding-left: 10px;
    }
  }

  .team-invite-container {
    grid-column: 1 / 4;

    .input {
      margin-bottom: 15px;
    }

    input {
      padding-left: 10px;
      font-size: 15px;
    }

    .profiles {
      display: flex;
      > div {
        margin-right: 10px;
      }
    }
  }

  .modal-footer {
    grid-column: 1 / 4;
    text-align: center;
    padding-top: 20px;
    padding-bottom: 50px;
  }
`;

// 헤더 / 팀이름 / 지역,반,트랙 / 팀소개 / 스킬 / 팀장 / 팀원선택 / 푸터

export default function TeamCreateModal({
  handleClickClose,
}: TeamCreateModalProps): ReactElement {
  return (
    <ModalWrapper modalName="teamCreateModal">
      <Wrapper>
        <div className="modal-header">
          <Text text="팀 만들기" fontSetting="n26b" />
          <div className="close-btn">
            <Icon iconName="close" func={handleClickClose} />
          </div>
        </div>

        <div className="team-name-container">
          <Label text="팀 이름">
            <Input width="100%" height="40px" />
          </Label>
        </div>

        <div className="team-region-container">
          <Label text="지역">
            <select name="" id="">
              <option value="서울">서울</option>
              <option value="대전">대전</option>
              <option value="구미">구미</option>
              <option value="광주">광주</option>
            </select>
          </Label>
        </div>
        <div className="team-class-container">
          <Label text="반">
            <select name="" id="">
              <option value="미정">미정</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </Label>
        </div>
        <div className="team-track-container">
          <Label text="트랙">
            <select name="" id="">
              <option value="미정">미정</option>
              <option value="웹 기술">웹 기술</option>
              <option value="웹 디자인">웹 디자인</option>
              <option value="웹 IoT">웹 IoT</option>
            </select>
          </Label>
        </div>

        <div className="team-description-container">
          <Label text="팀 소개">
            <textarea name="" id=""></textarea>
          </Label>
        </div>

        <div className="team-skills-container">
          <Label text="사용할 기술">
            <div>
              <Input width="100%" height="40px" />
              <div className="skills">
                <Tag text="Next.js" />
                <Tag text="Spring" />
              </div>
            </div>
          </Label>
        </div>

        <div className="team-leader-container">
          <Label text="팀장">
            <Input value="이용재" readOnly width="100%" height="40px" />
          </Label>
        </div>

        <div className="team-invite-container">
          <Label text="팀원 초대">
            <div>
              <Input width="100%" height="40px" />
              <div className="profiles">
                <ProfileImage size={40} />
                <Text text="홍길동" />
                <ProfileImage size={40} />
                <Text text="이순신" />
              </div>
            </div>
          </Label>
        </div>

        <div className="modal-footer">
          <Button title="만들기" />
        </div>
      </Wrapper>
    </ModalWrapper>
  );
}
