import { ReactElement } from 'react';
import styled from 'styled-components';
import ModalWrapper from '../organisms/Modal/ModalWrapper';

import { Button, Label } from '@molecules';
import { Icon, Input } from '@atoms';

interface VideoRoomConfigModalProps {
  sessionTitle: string;
  // TODO: handler type
  handlerClose: any;
  handlerJoin: any;
}

const SessionTitle = styled.span`
  ${({
  theme: {
    font: { n20m },
  },
}) => n20m}
  margin: 10px 0;
`;

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-areas:
		"header header"
		"camera config"
		"footer footer";

  .modal-header {
    grid-area: header;
    text-align: center;
    margin: 30px 10px 20px;
  }

  .self-video {
    grid-area: camera;
    width: 320px;
    height: 240px;
    background-color: black;
    margin: 10px;
  }

  .video-config {
    grid-area: config;
    width: 320px;
    height: 240px;
  }
  
  .modal-footer {
    grid-area: footer;
    text-align: center;
    margin: 20px 10px 30px;
  }
`;

const CloseBtn = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;

  i {
    font-size: 30px;
    cursor: pointer;
  }
`;

const IconsAndInputs = styled.div`
  display: grid;
  grid-template-columns: 60px auto;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;

  input {
    margin: 0;
    width: 100%;
  }

  i {
    justify-self: center;
    font-size: 32px;
  }
`;

export default function VideoRoomConfigModal({
  sessionTitle,
  handlerClose,
  handlerJoin
}: VideoRoomConfigModalProps): ReactElement {
  return (
    <ModalWrapper modalName="TEST">
      <GridContainer>
        <div className="modal-header">
          <SessionTitle>
            {sessionTitle}
          </SessionTitle>
        </div>
        <CloseBtn onClick={handlerClose}>
          <Icon iconName="highlight_off" color="indianred" />
        </CloseBtn>

        <div className="self-video">
        </div>

        <div className="video-config">
          <IconsAndInputs>
            <Icon iconName="account_circle" color="gray" />
            <Label text="Nickname">
              <Input
                type="text"
                value="meet-in-ssafy"
                width="230px"
                readOnly={true}
              />
            </Label>
            <Icon iconName="mic" color="gray" />
            <Label text="Microphone">
              <select name="mic">
                <option value="none">None</option>
                <option value="mic1">Mic1</option>
              </select>
            </Label>
            <Icon iconName="videocam" color="gray" />
            <Label text="Camera">
              <select name="camera">
                <option value="none">None</option>
                <option value="cam1">Cam1</option>
              </select>
            </Label>
          </IconsAndInputs>
        </div>
        <div className="modal-footer">
          <Button title="JOIN" func={handlerJoin} />
        </div>

      </GridContainer>
    </ModalWrapper>
  );
}
