import { ReactElement, useState, useEffect } from 'react';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';

import { Text } from '@atoms';
import { VideoRoomConfigModal, UserVideoComponent, VideoChatToolbar } from '../webrtc';
import { useAuthState } from '@store';

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol()}

  .session-title {
    margin-bottom: 20px;
  }
`;

const SessionWrapper = styled.div`
  display: relative;
  width: 100%;
`;

const SessionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

interface UserDevice {
  mic: string;
  cam: string;
}

const OPENVIDU_SERVER_URL = 'https://3.38.39.72';
// const OPENVIDU_SERVER_URL = 'https://localhost:4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

export default function VideoChat(): ReactElement {
  const router = useRouter();

  const [OV, setOV] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();
  const [publisher, setPublisher] = useState<StreamManager>();
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [isConfigModalShow, setIsConfigModalShow] = useState<boolean>(true);
  const [userDevice, setUserDevice] = useState<UserDevice>({
    mic: '',
    cam: '',
  });

  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);

  const { name } = useAuthState();
  const myUserName = name ? name : 'MeetInSsafy';
  const mySessionId = `session_of_${myUserName}`;
  const sessionTitle = `[${myUserName}]님의 세션`;

  // React Lifecycle Hook
  useEffect(() => {
    // componentDidMount
    window.addEventListener('beforeunload', onbeforeunload);

    // componentWillUnmount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  });

  // Dynamic module import
  useEffect(() => {
    (async () => {
      import('openvidu-browser')
        .then((OpenViduModule) => {
          setOV(new OpenViduModule.OpenVidu());
        })
        .catch((error) => {
          console.log('openvidu import error: ', error.code, error.message);
        });
    })();
  }, []);

  const onbeforeunload = () => {
    leaveSession();
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    let subs = subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subs.splice(index, 1);
      setSubscribers([...subs]);
    }
  };

  const handlerConfigModalCloseBtn = () => {
    setPublisher(undefined);
    setIsConfigModalShow(false);
    console.log('Config cancel. Redirect previous page.');
    router.back();
  };

  const handlerJoinBtn = (micSelected: string, camSelected: string) => {
    setUserDevice({
      mic: micSelected,
      cam: camSelected,
    });

    setMicOn(micSelected !== '');
    setCamOn(camSelected !== '');

    setIsConfigModalShow(false);
    setSession(OV?.initSession());
  };

  // 'session' hook
  useEffect(() => {
    if (!session) return;

    let mySession = session;

    // 어떤 새로운 스트림이 도착하면
    mySession.on('streamCreated', (event: any) => {
      let sub = mySession.subscribe(event.stream, ''); // targetElement(second param) ignored.
      let subs = subscribers;
      subs.push(sub);
      setSubscribers([...subs]);
    });

    // 어떤 스트림이 없어지면
    mySession.on('streamDestroyed', (event: any) => {
      deleteSubscriber(event.stream.streamManager);
    });

    // 예외가 발생하면
    mySession.on('exception', (exception: any) => {
      console.warn(exception);
    });

    getToken()
      .then((token: string) => {
        mySession.connect(token, { clientData: myUserName }).then(() => {
          if (!OV) return;

          const micIsNone = !userDevice.mic || userDevice.mic === '';
          const camIsNone = !userDevice.cam || userDevice.cam === '';

          let publisher = OV.initPublisher('', {
            audioSource: micIsNone ? undefined : userDevice.mic,
            videoSource: camIsNone ? undefined : userDevice.cam,
            publishAudio: micIsNone ? false : true,
            publishVideo: camIsNone ? false : true,
            resolution: '640x320',
            frameRate: 30,
            mirror: false,
          });

          mySession.publish(publisher);

          setPublisher(publisher);
        });
      })
      .catch((error) => {
        console.log(
          'There was an error connecting to the session:',
          error.code,
          error.message,
        );
      });
  }, [session]);

  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
      mySession.disconnect();
    }

    setOV(undefined);
    setSession(undefined);
    setSubscribers([]);
    setPublisher(undefined);
  };

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId),
    );
  };

  const createSession = (sessionId: string) => {
    return new Promise<string>((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      let headers = {
        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        'Content-Type': 'application/json',
      };

      axios
        .post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, { headers })
        .then((response) => {
          console.log('CREATE SESSION', response);
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}`,
            );
            if (
              window.confirm(
                `No connection to OpenVidu Server. This may be a certificate error at ${OPENVIDU_SERVER_URL}
                
                Click OK to navigate and accept it. If no certificate warning is shown, then check that your OpenVidu Server is up and running at ${OPENVIDU_SERVER_URL}`,
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  };

  const handleClickVideoOff = () => {
    console.log('Video OFF');
    setCamOn(false);
  };

  const handleClickVideoOn = () => {
    console.log('Video ON');
    setCamOn(true);
  };

  const handleClickAudioOff = () => {
    console.log('Audio OFF');
    setMicOn(false);
  };

  const handleClickAudioOn = () => {
    console.log('Audio ON');
    setMicOn(true);
  };

  const createToken = (sessionId: string) => {
    return new Promise<string>((resolve, reject) => {
      let data = {};
      let headers = {
        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        'Content-Type': 'application/json',
      };

      axios
        .post(
          `${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`,
          data,
          { headers },
        )
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  };

  return (
    <Wrapper>
      {session !== undefined && (
        <>
          <SessionWrapper>
            <Text text={sessionTitle} fontSetting="n26b"></Text>
            <SessionContainer>
              {publisher !== undefined && (
                <div>
                  <UserVideoComponent streamManager={publisher} />
                </div>
              )}
              {subscribers.map((sub, i) => (
                <div key={i}>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </SessionContainer>
            <VideoChatToolbar
              micOn={micOn}
              camOn={camOn}
              handleClickVideoOff={handleClickVideoOff}
              handleClickVideoOn={handleClickVideoOn}
              handleClickAudioOff={handleClickAudioOff}
              handleClickAudioOn={handleClickAudioOn}
            />
          </SessionWrapper>
        </>
      )}

      {isConfigModalShow && OV && (
        <VideoRoomConfigModal
          OV={OV}
          sessionTitle={sessionTitle}
          handlerJoin={handlerJoinBtn}
          handlerClose={handlerConfigModalCloseBtn}
        />
      )}
    </Wrapper>
  );
}
