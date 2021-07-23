import { ReactElement, useState, useEffect } from 'react';
import { OpenVidu, Session, StreamManager } from 'openvidu-browser';
import { useAuthState } from '@store';
import { Text } from '@atoms';
import { Button } from '@molecules';

import styled from 'styled-components';
import axios from 'axios';

import UserVideoComponent from './UserVideoComponent';

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol()}

  .session-title {
    margin-bottom: 20px;
  }
`;

const Join = styled.div`
  text-align: center;
`;

const SessionContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 10px;
`;

const OPENVIDU_SERVER_URL = 'https://3.38.39.72:443';
// const OPENVIDU_SERVER_URL = 'https://localhost:4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

let OV: OpenVidu = null;

export default function VideoChat(): ReactElement {
  const [session, setSession] = useState<Session>();
  const [publisher, setPublisher] = useState<StreamManager>();
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);

  const { name } = useAuthState();
  const myUserName = name ? name : 'MeetInSsafy';
  const mySessionId = `session_of_${myUserName}`;
  const sessionTitle = `[${myUserName}]님의 세션`

  // React Lifecycle Hook
  useEffect(() => {
    // componentDidMount
    window.addEventListener('beforeunload', onbeforeunload);

    // componentWillUnmount
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    }
  });

  const onbeforeunload = () => {
    leaveSession();
  }

  const deleteSubscriber = (streamManager: StreamManager) => {
    let subs = subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subs.splice(index, 1);
      setSubscribers([...subs]);
    }
  }

  const joinSession = () => {
    import('openvidu-browser')
      .then((OpenViduModule) => {
        OV = new OpenViduModule.OpenVidu();
        setSession(OV.initSession());
      })
      .catch((error) => {
        console.log('openvidu import error: ', error.code, error.message);
      });
  }

  // 'session' hook
  useEffect(() => {
    if (!session)
      return;
    
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
    })

    getToken()
      .then((token) => {
        mySession
          .connect(token, { clientData: myUserName })
          .then(() => {
            let publisher = OV.initPublisher('', {  // targetElement is empty string
              audioSource: undefined,               // 오디오. 기본값 마이크
              videoSource: undefined,               // 비디오. 기본값 웹캠
              publishAudio: false,                  // 오디오 킬 건지
              publishVideo: true,                   // 비디오 킬 건지
              resolution: '640x320',                // 해상도
              frameRate: 30,                        // 프레임
              insertMode: 'APPEND',                 // How the video is inserted in the target element 'video-container'
              mirror: false,                        // 좌우반전
            });

            mySession.publish(publisher);

            setPublisher(publisher);
          });
      })
      .catch((error) => {
        console.log('There was an error connecting to the session:', error.code, error.message);
      });
  }, [session]);

  const leaveSession = () => {
    const mySession = session;
    if (mySession) {
        mySession.disconnect();
    }

    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setPublisher(undefined);
  }

  const getToken = () => {
    return createSession(mySessionId).then((sessionId) => createToken(sessionId));
  }

  const createSession = (sessionId: string) => {
    return new Promise<string>((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      let headers = {
        'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        'Content-Type': 'application/json',
      };

      axios.post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`, data, { headers })
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
              'No connection to OpenVidu Server. This may be a certificate error at ' +
              OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                OPENVIDU_SERVER_URL +
                '"\n\nClick OK to navigate and accept it. ' +
                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                OPENVIDU_SERVER_URL +
                '"'
              )
            ) {
              window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
            }
          }
        });
    });
  }

  const createToken = (sessionId: string) => {
    return new Promise((resolve, reject) => {
      let data = {};
      let headers = {
        'Authorization': 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
        'Content-Type': 'application/json',
      };

      axios.post(`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionId}/connection`, data, { headers })
        .then((response) => {
          console.log('TOKEN', response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }

  return (
    <Wrapper>
      {session === undefined ? (
        <Join>
          <Text text={sessionTitle} fontSetting='n36m' className="session-title"/>
          
          {publisher !== undefined ? (
            <UserVideoComponent streamManager={publisher} />
          ) : null}
          <Text text={myUserName} fontSetting='n20m'/>

          <Button title="세션 참여" func={joinSession} />
        </Join>
      ) : null}
      {session !== undefined ? (
        <>
          <Text text={sessionTitle} fontSetting='n26b'></Text>
          <SessionContainer>
            {publisher !== undefined ? (
              <div className="stream-container col-md-6 col-xs-6">
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div key={i} className="stream-container col-md-6 col-xs-6">
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}

          </SessionContainer>
        </>
      ) : null}
      
    </Wrapper>
  );
}
