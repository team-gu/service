import { ReactElement, MouseEventHandler, ChangeEvent } from 'react';
import { Icon, Text, Input } from '@atoms';
import { Button, Label, Checkbox } from '@molecules';
import ModalWrapper from '../organisms/Modal/ModalWrapper';
import styled from 'styled-components';

interface TimeGameAddModalProps {
  handlerClose: MouseEventHandler;
}

const GridContainer = styled.div`
  position: relative;
  display: grid;
  width: 400px;

  grid-template-columns: 1fr;
  grid-template-rows: 155px auto auto 80px;
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
    margin: 0 30px;
    .question-input {
      input {
        margin: 0;
        padding-left: 15px;
        ${({
          theme: {
            font: { n16m },
          },
        }) => n16m}
      }
    }
  }

  .answer-container {
    display: flex;
    flex-direction: column;

    margin: 0 30px;

    input {
      padding-left: 10px;
    }

    .input {
      margin: 10px 0;
    }

    .answer-candidates {
      margin-bottom: 10px;
    }

    .answer-checkboxes {
      display: flex;
      justify-content: space-between;
      margin: 0 10px;
    }
  }

  .modal-footer {
    text-align: center;
  }
`;

export default function TmiGameAddModal({
  handlerClose,
}: TimeGameAddModalProps): ReactElement {
  const handleClickSendTmi = () => {};

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
            <p>자신의 과도한 정보를 친구들과 공유하세요 🤣</p>
            <p>아래에 질문과 답을 작성하고 보내면</p>
            <p>모든 친구들에게 당신의 TMI 문제가 출제됩니다!</p>
          </div>
        </div>

        <div className="question">
          <div className="question-input">
            <Label text="질문">
              <Input
                type="text"
                placeHolder="예) 나는 어디에 살까요?"
                width="95%"
                height="40px"
              />
            </Label>
          </div>
        </div>

        <div className="answer-container">
          <div className="answer-candidates">
            <Label text="선택지">
              <>
                <Input
                  type="text"
                  placeHolder="선택지 1"
                  width="95%"
                  height="32px"
                />
                <Input
                  type="text"
                  placeHolder="선택지 2"
                  width="95%"
                  height="32px"
                />
                <Input
                  type="text"
                  placeHolder="선택지 3"
                  width="95%"
                  height="32px"
                />
                <Input
                  type="text"
                  placeHolder="선택지 4"
                  width="95%"
                  height="32px"
                />
              </>
            </Label>
          </div>
          <div>
            <Label text="답">
              <div className="answer-checkboxes">
                <Checkbox
                  func={() => {
                    handleClickAnswer(1);
                  }}
                >
                  <Text text="1" />
                </Checkbox>
                <Checkbox
                  func={() => {
                    handleClickAnswer(2);
                  }}
                >
                  <Text text="2" />
                </Checkbox>
                <Checkbox
                  func={() => {
                    handleClickAnswer(3);
                  }}
                >
                  <Text text="3" />
                </Checkbox>
                <Checkbox
                  func={() => {
                    handleClickAnswer(4);
                  }}
                >
                  <Text text="4" />
                </Checkbox>
              </div>
            </Label>
          </div>
        </div>

        <div className="modal-footer">
          <Button title="모두에게 TMI 보내기" func={handleClickSendTmi} />
        </div>
      </GridContainer>
    </ModalWrapper>
  );
}
