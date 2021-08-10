import { ReactElement, SyntheticEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Input, Text } from '@atoms';
import { useAppDispatch, setLogin } from '@store';
import { Label, Button } from '@molecules';
import styled from 'styled-components';

const Wrapper = styled.div<{ img: string }>`
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  margin-left: 38vw;
  width: 62vw;
  height: 100vh;
  font-size: 16px;
  font-weight: 300;

  .login-area {
    position: absolute;
    height: auto;
    margin-top: 0;
    top: 50%;
    height: 450px;
    margin-top: -224px;
    left: 20vw;
    width: 350px;
    padding: 40px 50px;
    box-shadow: 0 20px 25px 0 rgb(0 0 0 / 7%);
    background: #fff;
    z-index: 100;
    color: black;

    @media only all and (max-width: 768px) {
      margin-top: 100px;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  .form-inner {
    ${({ theme: { flexCol } }) => flexCol('space-between', '')};
    .password {
      margin-top: 40px;
    }
  }

  .form-btn {
    margin-top: 50px;
  }

  .errorMessage {
    margin-top: 35px;
    margin-left: 12px;
  }

  Input {
    height: 30px;
    border: 1px solid #ddd;
    padding: 5px 18px;
    margin: 12px;
  }

  Button {
    ${({ theme: { flexRow } }) => flexRow()};
    margin-left: 12px;
    @media only all and (max-width: 768px) {
      width: 85%;
    }
  }

  @media only all and (max-width: 768px) {
    background-image: url('');
  }
`;

export default function Home(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const emailRef: any = useRef<HTMLInputElement>(null);
  const passwordRef: any = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (emailRef.current.value === '') {
      setError(true);
      setErrorMessage('아이디가 입력되지 않았습니다.');
      return;
    }
    if (passwordRef.current.value === '') {
      setError(true);
      setErrorMessage('비밀번호가 입력되지 않았습니다.');
      return;
    }
    try {
      setError(false);
      setErrorMessage('');
      const res = await dispatch(
        setLogin(
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          },
          router,
        ),
      );
      if (res.status) {
        if (res.status === 404 || res.status === 401) {
          setError(true);
          setErrorMessage('아이디 혹은 비밀번호가 틀립니다.');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper img={'/mainPage_background.png'}>
      <form onSubmit={handleLogin}>
        <div className="login-area">
          <div className="in-head">
            <Image
              className="fixed-logo"
              alt="팀구"
              src="/teamgu_logo.png"
              width={250}
              height={120}
            />
          </div>
          <div className="field-set log-in">
            <div className="form-inner">
              <div className="id">
                <Label text="아이디">
                  <div>
                    <Input
                      ref={emailRef}
                      placeHolder="이메일 입력"
                      type="text"
                      width={'80%'}
                    />
                  </div>
                </Label>
              </div>
              <div className="password">
                <Label text="비밀번호">
                  <Input
                    ref={passwordRef}
                    placeHolder="비밀번호 입력"
                    type="password"
                    width={'80%'}
                  />
                </Label>
              </div>
            </div>
            <div className="errorMessage">
              {error && <Text text={errorMessage} color="red" />}
            </div>
            <div className="form-btn">
              <Button title="로그인" type="submit" width={'90%'} />
            </div>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
