import { ReactElement, MouseEventHandler, ChangeEvent } from 'react';
import { Icon, Text, Input } from '@atoms';
import { Button, Label, Checkbox } from '@molecules';
import ModalWrapper from '../organisms/Modal/ModalWrapper';
import styled from 'styled-components';

interface TimeGameSolveModalProps {
  handlerClose: MouseEventHandler;
}

const GridContainer = styled.div`
  position: relative;
  display: grid;
  width: 400px;

  grid-template-columns: 1fr;
  grid-template-rows: 140px auto auto 80px;
  align-items: center;

  .modal-header {
    text-align: center;

    .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;

      i {
        font-size: 30px;
        cursor: pointer;
      }
    }

    .description {
      margin: 10px 40px;
      > p {
        margin-bottom: 5px;
      }
    }
  }

  .question {
    margin: 0 30px 10px;
  }

  .answer-candidates {
    display: flex;
    flex-direction: column;

    margin: 0 30px;

    > div {
      margin-bottom: 10px;
    }
  }

  .modal-footer {
    text-align: center;
  }
`;

export default function TmiGameSolveModal({
  handlerClose,
}: TimeGameSolveModalProps): ReactElement {
  const handleClickCheckAnswer = () => {};

  const handleClickAnswer = (num: number) => {};

  return (
    <ModalWrapper modalName="tmiGameModal">
      <GridContainer>
        <div className="modal-header">
          <Text fontSetting="n20m" text="TMI 게임" />
          <div className="close-btn" onClick={handlerClose}>
            <Icon iconName="highlight_off" color="indianred" />
          </div>

          <div className="description">
            <p>[Team-Gu]님의 TMI를 맞춰주세요🤣</p>
            <p>답을 선택하고 제출하면 바로 결과를 나타납니다!</p>
          </div>
        </div>

        <div className="question">
          <div className="question-input">
            <Label text="질문">
              <Text text="나는 어디에 살까요?" isLineBreak fontSetting="n20m" />
            </Label>
          </div>
        </div>

        <div className="answer-candidates">
          <Checkbox
            func={() => {
              handleClickAnswer(1);
            }}
          >
            <Text text="선택지 1" isLineBreak />
          </Checkbox>
          <Checkbox
            func={() => {
              handleClickAnswer(2);
            }}
          >
            <Text text="선택지 2" isLineBreak />
          </Checkbox>
          <Checkbox
            func={() => {
              handleClickAnswer(3);
            }}
          >
            <Text text="선택지 3" isLineBreak />
          </Checkbox>
          <Checkbox
            func={() => {
              handleClickAnswer(4);
            }}
          >
            <Text text="선택지 4" isLineBreak />
          </Checkbox>
        </div>

        <div className="modal-footer">
          <Button title="정답 확인하기" func={handleClickCheckAnswer} />
        </div>
      </GridContainer>
    </ModalWrapper>
  );
}
