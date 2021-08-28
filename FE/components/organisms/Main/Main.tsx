import { ReactElement, SyntheticEvent, useRef, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { respondTo } from '@styles/respondTo';

import { useAppDispatch, setLogin, displayModal } from '@store';
import { MODALS, TEST_ACCOUNTS } from '@utils/constants';

import { Label, Button, Checkbox } from '@molecules';
import { Input, Text } from '@atoms';

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
      ${respondTo.mobile`
        display: none;
      `}
    }

    .login-area {
      width: 350px;
      padding: 40px 50px;
      box-shadow: 0 20px 25px 0 rgb(0 0 0 / 7%);
      background: #fff;
      z-index: 100;
      color: black;

      .logo {
        ${({ theme: { flexRow } }) => flexRow()};
      }

      ${respondTo.mobile`
        width: 90%;
        box-shadow: none;
      `}
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

    Input {
      height: 30px;
      border: 1px solid #ddd;
    }

    Button {
      ${({ theme: { flexRow } }) => flexRow()};
      ${respondTo.mobile`
        width: 85%;
      `}
    }
  }
`;

const FindPassword = styled.div`
  margin-top: 8px;
  ${({ theme: { flexRow } }) => flexRow()};
  cursor: pointer;
`;

export default function Home(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const emailRef: any = useRef<HTMLInputElement>(null);
  const passwordRef: any = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [toggleCheck, setToggleCheck] = useState(false);

  const findPassword = async () => {
    dispatch(
      displayModal({
        modalName: MODALS.FINDPASSWORD_MODAL,
      }),
    );
  };

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();

    // TODO: 저녁에 heroku 배포 완료되면 삭제해야 할 부분
    return dispatch(
      displayModal({
        modalName: MODALS.ALERT_MODAL,
        content: '현재 서버 이전 중 입니다.'
      }),
    );
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
      if (res) {
        if (res.statusCode === 404 || res.statusCode === 401) {
          setError(true);
          setErrorMessage('아이디 혹은 비밀번호가 틀립니다.');
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCheck = ({ target: { checked }}: ChangeEvent<HTMLInputElement>) => {
    setToggleCheck(checked);
    if (checked) {
      const { email, password } = TEST_ACCOUNTS[Math.floor(Math.random() * 2)];
      emailRef.current.value = email;
      passwordRef.current.value = password;
      emailRef.current.disabled = true;
      return passwordRef.current.disabled= true;
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
    emailRef.current.disabled = false;
    passwordRef.current.disabled= false;
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
                      width={'100%'}
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
                    width={'100%'}
                  />
                </Label>
              </div>
            </div>
            <div className="errorMessage">
              {error && <Text text={errorMessage} color="red" />}
            </div>
            <Checkbox func={handleCheck} checked={toggleCheck} >
              <Text text="랜덤 계정 선택" fontSetting="n12m" />
            </Checkbox>
            <div className="form-btn">
              <Button title="로그인" type="submit" width={'90%'} />
            </div>
            <FindPassword onClick={findPassword}>
              <Text text="비밀번호 찾기" color="#a9aeb4" />
            </FindPassword>
          </div>
        </div>
      </form>
    </Wrapper>
  );
}
