import {
  MouseEventHandler,
  ReactElement,
  ChangeEvent,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import ModalWrapper from '../organisms/Modal/ModalWrapper';
import { OpenVidu, Publisher } from 'openvidu-browser';

import { Button, Label } from '@molecules';
import { Icon, Input } from '@atoms';
import { OpenViduVideoComponent } from '../webrtc';

import { LoggerUtil } from './util/LoggerUtil';
import { DevicesUtil } from './util/DeviceUtil';
import { Util } from './util/Util';
import { IDevice } from './types/device-type';

interface VideoRoomConfigModalProps {
  OV: OpenVidu;
  sessionTitle: string;
  handlerClose: MouseEventHandler;
  handlerJoin: (micSelected: string, camSelected: string) => void;
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
    'header header'
    'camera config'
    'footer footer';

  .modal-header {
    grid-area: header;
    text-align: center;
    margin: 30px 10px 20px;
  }

  .self-video {
    grid-area: camera;
    width: 320px;
    height: 240px;
    margin: 10px 10px 10px 20px;
  }

  .video-config {
    grid-area: config;
    width: 320px;
    height: 240px;
    display: flex;
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
    width: 90%;
  }

  i {
    justify-self: center;
    font-size: 32px;
  }

  select {
    width: 90%;
  }
`;

let loggerUtil: LoggerUtil;
let util: Util;
let devicesUtil: DevicesUtil;

export default function VideoRoomConfigModal({
  OV,
  sessionTitle,
  handlerClose,
  handlerJoin,
}: VideoRoomConfigModalProps): ReactElement {
  const [cameras, setCameras] = useState<IDevice[]>([]);
  const [microphones, setMicrophones] = useState<IDevice[]>([]);
  const [camSelected, setCamSelected] = useState<string>('');
  const [micSelected, setMicSelected] = useState<string>('');
  const [localCamStream, setLocalCamStream] = useState<Publisher>();

  useEffect(() => {
    (async function init() {
      loggerUtil = new LoggerUtil();
      util = new Util();
      devicesUtil = new DevicesUtil(OV, loggerUtil, util);

      // To get user's permission of video and audio
      await OV.initPublisherAsync('', {
        resolution: '320x240',
      });

      // After permit, get devices
      await devicesUtil.initDevices();
      setMicrophones([...devicesUtil.getMicrophones()]);
      setCameras([...devicesUtil.getCameras()]);

      // Set default device
      setMicSelected(devicesUtil.getMicSelected().device);
      setCamSelected(devicesUtil.getCamSelected().device);
    })();
  }, []);

  const handleCameraChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCamSelected(event.target.value);
  };

  const handleMicrophoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMicSelected(event.target.value);
  };

  // Publish every time the camera changes
  useEffect(() => {
    // TODO: 카메라가 필요없는 None을 선택해도 On-Air 불빛이 꺼지지 않는다.

    if (camSelected || camSelected === '') publishUserCameraStream();
  }, [camSelected]);

  const publishUserCameraStream = () => {
    const micIsNone = !micSelected || micSelected === '';
    const camIsNone = !camSelected || camSelected === '';

    if (camIsNone && localCamStream) {
      localCamStream.publishVideo(false);
      // TODO: 타입 에러 localCamStream
      setLocalCamStream({ ...localCamStream });
      return;
    }

    const stream = OV.initPublisher('', {
      audioSource: micIsNone ? undefined : micSelected,
      videoSource: camIsNone ? undefined : camSelected,
      publishAudio: false,
      publishVideo: camIsNone ? false : true,
      resolution: '320x240',
      frameRate: 30,
      mirror: true,
    });
    setLocalCamStream(stream);
  };

  return (
    <ModalWrapper modalName="videoConfigModal">
      <GridContainer>
        <div className="modal-header">
          <SessionTitle>{sessionTitle}</SessionTitle>
        </div>
        <CloseBtn onClick={handlerClose}>
          <Icon iconName="highlight_off" color="indianred" />
        </CloseBtn>

        <div className="self-video">
          {localCamStream !== undefined && (
            <OpenViduVideoComponent streamManager={localCamStream} />
          )}
        </div>

        <div className="video-config">
          <IconsAndInputs>
            <Icon iconName="account_circle" color="gray" />
            <div>
              <Label text="Nickname">
                <></>
              </Label>
              <Input
                type="text"
                value="meet-in-ssafy"
                width="230px"
                readOnly={true}
              />
            </div>
            <Icon iconName="mic" color="gray" />
            <Label text="Microphone">
              <select value={micSelected} onChange={handleMicrophoneChange}>
                {microphones?.map((mic, i) => (
                  <option key={i} value={mic.device}>
                    {mic.label}
                  </option>
                ))}
              </select>
            </Label>
            <Icon iconName="videocam" color="gray" />
            <Label text="Camera">
              <select value={camSelected} onChange={handleCameraChange}>
                {cameras?.map((cam, i) => (
                  <option key={i} value={cam.device}>
                    {cam.label}
                  </option>
                ))}
              </select>
            </Label>
          </IconsAndInputs>
        </div>
        <div className="modal-footer">
          <Button
            title="JOIN"
            func={() => handlerJoin(micSelected, camSelected)}
          />
        </div>
      </GridContainer>
    </ModalWrapper>
  );
}
