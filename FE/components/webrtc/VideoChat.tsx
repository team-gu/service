import { ReactElement, useState, useEffect } from 'react';
import { OpenVidu, Session, Subscriber, Publisher } from 'openvidu-browser';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';

import {
  VideoRoomConfigModal,
  UserVideoComponent,
  VideoChatToolbar,
  FloatingCounter,
  FloatingChatButton,
  SidebarChat,
} from '../webrtc';
import { useAuthState } from '@store';

var OpenViduBrowser: any;

const Wrapper = styled.div`
  margin: 30px 10px;
  .session-title {
    margin-bottom: 20px;
  }
`;

const SessionWrapper = styled.div`
  display: relative;
  width: 100%;
`;

const SessionContainer = styled.div<{ number: number }>`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 5px;

  .flexItem {
    align-self: stretch;
  }

  ${({ number }) => {
    if (number > 8) {
      return `
        .flexItem {
          flex: 0 0 240px;
        }
      `;
    } else if (number > 4) {
      return `
        .flexItem {
          flex: 0 1 480px;
        }
      `;
    } else {
      return `
        .flexItem {
          flex: 0 1 600px;
        }
      `;
    }
  }};
`;

interface UserDevice {
  mic: string | undefined;
  cam: string | undefined;
}

const OPENVIDU_SERVER_URL = 'https://teamgu.xyz';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

export default function VideoChat(): ReactElement {
  const router = useRouter();

  const [OV, setOV] = useState<OpenVidu>();
  const [session, setSession] = useState<Session>();
  const [publisher, setPublisher] = useState<Publisher>();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isConfigModalShow, setIsConfigModalShow] = useState<boolean>(true);
  const [userDevice, setUserDevice] = useState<UserDevice>({
    mic: undefined,
    cam: undefined,
  });

  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [chatShow, setChatShow] = useState(false);

  const {
    user: { name },
  } = useAuthState();

  const myUserName = name  ? name : 'unknown';
  const mySessionId = router.query.id;
  const sessionTitle = `세션에 입장합니다...`;

  // React Lifecycle Hook
  useEffect(() => {
    // componentDidMount
    window.addEventListener('beforeunload', onbeforeunload);
    // Dynamic module import
    importOpenVidu().then((ob) => {
      OpenViduBrowser = ob;
      setOV(new OpenViduBrowser.OpenVidu());
    });

    // componentWillUnmount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
      clear();
    };
  }, []);

  const importOpenVidu = () => {
    return new Promise<any>((resolve, reject) => {
      import('openvidu-browser')
        .then((ob) => {
          resolve(ob);
        })
        .catch((error) => {
          console.log('openvidu import error: ', error.code, error.message);
          reject();
        });
    });
  };

  const onbeforeunload = () => {
    leaveSession();
  };

  const deleteSubscriber = (streamManager: Subscriber) => {
    let subs = subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subs.splice(index, 1);
      setSubscribers([...subs]);
    }
  };

  const clear = () => {
    setOV(new OpenViduBrowser.OpenVidu());
    setSession(undefined);
    setPublisher(undefined);
    setSubscribers([]);
    setUserDevice({ mic: '', cam: '' });
    setMicOn(false);
    setCamOn(false);
  };

  const handlerConfigModalCloseBtn = () => {
    setPublisher(undefined);
    setIsConfigModalShow(false);
    console.log('Config cancel. Redirect previous page.');
    router.push('/');
  };

  const handlerJoinBtn = (
    micSelected: string | undefined,
    camSelected: string | undefined,
    micState: boolean,
    camState: boolean,
  ) => {
    if (micSelected && camSelected) {
    }
    setUserDevice({
      mic: micSelected,
      cam: camSelected,
    });

    setMicOn(micState);
    setCamOn(camState);

    setIsConfigModalShow(false);
    setSession(OV?.initSession());
  };

  // 'session' hook
  useEffect(() => {
    if (!session) return;

    const mySession = session;

    // 어떤 새로운 스트림이 도착하면
    mySession.on('streamCreated', (event: any) => {
      const sub = mySession.subscribe(event.stream, ''); // targetElement(second param) ignored.
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

    // 스트림 속성이 변경되면
    mySession.on('streamPropertyChanged', () => {
      const subs = subscribers;
      setSubscribers([...subs]);
    });

    mySession.on('publisherStartSpeaking', (event: any) => {
      console.log('User ' + event.connection.connectionId + ' start speaking');
    });

    mySession.on('publisherStopSpeaking', (event: any) => {
      console.log('User ' + event.connection.connectionId + ' stop speaking');
    });

    getToken()
      .then((token: string) => {
        mySession.connect(token, { clientData: myUserName }).then(() => {
          if (!OV) return;

          let publisher = OV.initPublisher('', {
            audioSource: userDevice.mic ? userDevice.mic : false,
            videoSource: userDevice.cam ? userDevice.cam : false,
            publishAudio: micOn,
            publishVideo: camOn,
            resolution: '640x480',
            frameRate: 30,
            mirror: true,
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
    clear();
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

  const handleVideoStateChanged = () => {
    if (userDevice.cam) {
      publisher?.publishVideo(!camOn);
      setCamOn(!camOn);
    }
  };

  const handleAudioStateChanged = () => {
    if (userDevice.mic) {
      publisher?.publishAudio(!micOn);
      setMicOn(!micOn);
    }
  };

  const handleClickExit = () => {
    leaveSession();
    clear();
    router.push('/');
  };

  const handleClickScreenShare = () => {
    alert('화면 공유');
  };

  const handleClickGame = () => {
    alert('TMI 게임');
  };

  const handleClickGroupAdd = () => {
    alert('초대');
  };

  const handleClickChat = () => {
    setChatShow(!chatShow);
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
          <SidebarChat isShow={chatShow} session={session}>
            <SessionWrapper>
              <SessionContainer number={subscribers.length + 1}>
                {publisher !== undefined && (
                  <div className="flexItem">
                    <UserVideoComponent streamManager={publisher} />
                  </div>
                )}
                {subscribers.map((sub, i) => (
                  <div key={i} className="flexItem">
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </SessionContainer>
              <VideoChatToolbar
                micOn={micOn}
                camOn={camOn}
                handleClickVideoOff={handleVideoStateChanged}
                handleClickVideoOn={handleVideoStateChanged}
                handleClickAudioOff={handleAudioStateChanged}
                handleClickAudioOn={handleAudioStateChanged}
                handleClickExit={handleClickExit}
                handleClickScreenShare={handleClickScreenShare}
                handleClickGame={handleClickGame}
                handleClickGroupAdd={handleClickGroupAdd}
              />
              <FloatingCounter />
              <FloatingChatButton handleClick={handleClickChat} />
            </SessionWrapper>
          </SidebarChat>
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
