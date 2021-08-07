import {
  MouseEventHandler,
  ReactElement,
  ChangeEvent,
  useEffect,
  useState,
  MouseEvent,
} from 'react';
import styled from 'styled-components';
import ModalWrapper from '../organisms/Modal/ModalWrapper';
import { OpenVidu, Publisher, StreamManager } from 'openvidu-browser';

import { Button, Label } from '@molecules';
import { Icon, Input } from '@atoms';
import { OpenViduVideoComponent } from '../webrtc';

import { LoggerUtil } from './util/LoggerUtil';
import { DevicesUtil } from './util/DeviceUtil';
import { Util } from './util/Util';
import { IDevice } from './types/device-type';
import { useAuthState } from '@store';

interface VideoRoomConfigModalProps {
  OV: OpenVidu;
  sessionTitle: string;
  handlerClose: MouseEventHandler;
  handlerJoin: (
    micSelected: string | undefined,
    camSelected: string | undefined,
    micState: boolean,
    camState: boolean,
  ) => void;
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
  const { user } = useAuthState();
  const [cameras, setCameras] = useState<IDevice[]>([]);
  const [microphones, setMicrophones] = useState<IDevice[]>([]);
  const [camSelected, setCamSelected] = useState<string>();
  const [micSelected, setMicSelected] = useState<string>();
  const [localCamStream, setLocalCamStream] = useState<Publisher>();

  const [camOn, setCamOn] = useState(true);
  const [micOn, setMicOn] = useState(true);

  useEffect(() => {
    (async function init() {
      loggerUtil = new LoggerUtil();
      util = new Util();
      devicesUtil = new DevicesUtil(OV, loggerUtil, util);

      try {
        // To get user's permission of video and audio
        const initForPermit = await OV.initPublisherAsync('', {
          publishAudio: false,
          publishVideo: true,
        });
        allTrackOff(initForPermit);

        // After permit, get devices
        await devicesUtil.initDevices();
      } catch (e) {
        console.error(e.message);
        if (e.name === 'DEVICE_ACCESS_DENIED') {
          alert('장치에 접근할 수 없습니다.');
          setCamOn(false);
          setMicOn(false);
        }
      }

      setMicrophones([...devicesUtil.getMicrophones()]);
      setCameras([...devicesUtil.getCameras()]);

      // Set default device
      setMicSelected(devicesUtil.getMicSelected().device);
      setCamSelected(devicesUtil.getCamSelected().device);
    })();
  }, []);

  useEffect(() => {
    return () => {
      allTrackOff(localCamStream);
    }
  }, [localCamStream]);

  useEffect(() => {
    if (camSelected && camOn) {
      publishUserCameraStream();
    } else {
      if (localCamStream) {
        allTrackOff(localCamStream);
      }
    }
  }, [camSelected, camOn]);

  const handleCameraChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCamSelected(event.target.value);
  };

  const handleMicrophoneChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMicSelected(event.target.value);
  };

  const publishUserCameraStream = async () => {
    const stream = await OV.initPublisher('', {
      audioSource: micSelected,
      videoSource: camSelected,
      publishAudio: false,
      publishVideo: camOn,
      resolution: '320x240',
      frameRate: 30,
      mirror: true,
    });

    setLocalCamStream(stream);
  };

  const handleCamOnChanged = () => {
    if (camSelected) {
      localCamStream?.publishVideo(!camOn);
      setCamOn(!camOn);
    }
  };

  const allTrackOff = (sm: StreamManager | undefined) => {
    if (sm) {
      sm.stream
        .getMediaStream()
        .getTracks()
        .map((m) => {
          m.enabled = false;
          m.stop();
        });
    } 
  };

  const handleMicOnChanged = () => {
    if (micSelected) {
      setMicOn(!micOn);
    }
  };

  const onJoin = () => {
    allTrackOff(localCamStream);
    handlerJoin(micSelected, camSelected, micOn, camOn);
  };

  const onClose = (event: MouseEvent) => {
    allTrackOff(localCamStream);
    handlerClose(event);
  };

  return (
    <ModalWrapper modalName="videoConfigModal">
      <GridContainer>
        <div className="modal-header">
          <SessionTitle>{sessionTitle}</SessionTitle>
        </div>
        <CloseBtn onClick={onClose}>
          <Icon iconName="highlight_off" color="indianred" />
        </CloseBtn>

        <div className="self-video">
          {localCamStream && (
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
                value={user.name ? user.name : 'unknown'}
                width="230px"
                readOnly={true}
              />
            </div>

            {micOn ? (
              <Icon iconName="mic" color="gray" func={handleMicOnChanged} />
            ) : (
              <Icon iconName="mic_off" color="gray" func={handleMicOnChanged} />
            )}

            <Label text="Microphone">
              <select value={micSelected} onChange={handleMicrophoneChange}>
                {microphones?.map((mic, i) => (
                  <option key={i} value={mic.device}>
                    {mic.label}
                  </option>
                ))}
              </select>
            </Label>

            {camOn ? (
              <Icon
                iconName="videocam"
                color="gray"
                func={handleCamOnChanged}
              />
            ) : (
              <Icon
                iconName="videocam_off"
                color="gray"
                func={handleCamOnChanged}
              />
            )}

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
          <Button title="JOIN" func={onJoin} />
        </div>
      </GridContainer>
    </ModalWrapper>
  );
}
