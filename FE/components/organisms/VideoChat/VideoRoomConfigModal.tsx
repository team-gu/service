import { ReactElement } from 'react';
import styled from 'styled-components';
import ModalWrapper from '../Modal/ModalWrapper';

import { Button } from '@molecules';
import { Icon } from '@atoms';

interface VideoRoomConfigModalProps {
  sessionTitle: string;
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
`;

export default function VideoRoomConfigModal({
  sessionTitle,
}: VideoRoomConfigModalProps): ReactElement {
  const handleClickClose = () => {
    // TODO: 모달 X 클릭
  };

  const handleClickJoin = () => {
    // TODO: 세션 입장
  }

  return (
    <ModalWrapper modalName="TEST">
      <GridContainer>
        <div className="modal-header">
          <SessionTitle>
            {sessionTitle}
          </SessionTitle>
        </div>
        <CloseBtn onClick={handleClickClose}>
          <Icon iconName="highlight_off" size="80px" color="indianred" />
        </CloseBtn>
        <div className="self-video">
          
        </div>
        <div className="video-config">
          <div>
            <span><Icon iconName="account_circle" size="80px" color="gray" /></span>
            <label htmlFor="nickname">Nickname</label>
            <input type="text" name="nickname"/>
          </div>
          <div>
            <span><Icon iconName="mic" size="80px" color="gray" /></span>
            <label htmlFor="mic">Microphone</label>
            <select name="mic">
              <option value="none">None</option>
              <option value="mic1">Mic1</option>
            </select>
          </div>
          <div>
            <span><Icon iconName="videocam" size="80px" color="gray" /></span>
            <label htmlFor="camera">Camera</label>
            <select name="camera">
              <option value="none">None</option>
              <option value="cam1">Cam1</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <Button title="JOIN" func={handleClickJoin}/>
        </div>
        
      </GridContainer>
    </ModalWrapper>
  );
}
