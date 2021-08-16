import { ReactElement, SyntheticEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Input, Text } from '@atoms';
import { useAppDispatch, setLogin } from '@store';
import { Label, Button } from '@molecules';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: rgb(6, 108, 250);
  width: 100vw;
  height: 100vh;
  min-height: 500px;
  font-size: 16px;
  font-weight: 300;

  .fixed-airplane {
    position: absolute;
    top: 30px;
    right: 30px;
  }
  form {
    ${({ theme: { flexRow } }) => flexRow()};
    height: 100%;

    .fixed-title {
      margin-right: 100px;
      margin-bottom: 100px;
      @media only all and (max-width: 768px) {
        display: none;
      }
    }

    .login-area {
      height: 450px;
      width: 350px;
      padding: 40px 50px;
      box-shadow: 0 20px 25px 0 rgb(0 0 0 / 7%);
      background: #fff;
      z-index: 100;
      color: black;

      .logo {
        ${({ theme: { flexRow } }) => flexRow()};
      }

      @media only all and (max-width: 768px) {
        margin-top: 40%;
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        box-shadow: none;
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
      > button {
        box-shadow: none;
        background-color: ${({
          theme: {
            colors: { samsungLightBlue },
          },
        }) => samsungLightBlue};
      }
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
    <Wrapper>
      <div className="fixed-airplane">
        <Image alt="airplane" src="/airplane.svg" width={150} height={150} />
      </div>

      <form onSubmit={handleLogin}>
        <div className="fixed-title">
          <Image alt="title" src="/title.png" width={650} height={450} />
        </div>
        <div className="login-area">
          <div className="logo">
            <Image
              className="fixed-logo"
              alt="팀구"
              src="/teamgu_logo.png"
              width={150}
              height={150}
            />
          </div>
          <div>
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
