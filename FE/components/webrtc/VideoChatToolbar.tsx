import { ReactElement, useState, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Icon } from '@atoms';

const ToolbarBackground = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  width: 550px;
  height: 30px;
  text-align: center;
  padding: 10px 0;

  background-color: darkgray;
  opacity: 0.4;
  border-radius: 15px;
`;

const ToolbarContainer = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);

  width: 550px;
  height: 30px;
  text-align: center;
  padding: 10px 0;

  i {
    margin: 0 20px;
    font-size: 32px;
    cursor: pointer;
  }
`;

interface VideoChatToolbarProps {
  camOn: boolean;
  micOn: boolean;
  handleClickVideoOff: MouseEventHandler<HTMLSpanElement>;
  handleClickVideoOn: MouseEventHandler<HTMLSpanElement>;
  handleClickAudioOff: MouseEventHandler<HTMLSpanElement>;
  handleClickAudioOn: MouseEventHandler<HTMLSpanElement>;
  handleClickExit: MouseEventHandler<HTMLSpanElement>;
}

export default function VideoChatToolbar({
  camOn,
  micOn,
  handleClickVideoOff,
  handleClickVideoOn,
  handleClickAudioOff,
  handleClickAudioOn,
  handleClickExit,
}: VideoChatToolbarProps): ReactElement {
  return (
    <>
      <ToolbarBackground />
      <ToolbarContainer>
        {camOn ? (
          <span onClick={handleClickVideoOff}>
            <Icon iconName="videocam" />
          </span>
        ) : (
          <span onClick={handleClickVideoOn}>
            <Icon iconName="videocam_off" />
          </span>
        )}
        {micOn ? (
          <span onClick={handleClickAudioOff}>
            <Icon iconName="mic" />
          </span>
        ) : (
          <span onClick={handleClickAudioOn}>
            <Icon iconName="mic_off" />
          </span>
        )}

        <Icon iconName="screen_share" />
        <Icon iconName="extension" />
        <span onClick={handleClickExit}>
          <Icon iconName="logout" />
        </span>
      </ToolbarContainer>
    </>
  );
}
