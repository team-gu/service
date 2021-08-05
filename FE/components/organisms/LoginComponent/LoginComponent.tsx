import { ReactElement, SyntheticEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppDispatch, setLogin } from '@store';
import { Input, Text } from '@atoms';
import { Button } from '@molecules';
import { ModalWrapper } from '@organisms';

const Wrapper = styled.div`
  width: 250px;
  height: 180px;
  display: flex;
  ${({ theme: { flexCol } }) => flexCol()};

  .input {
    margin-bottom: 20px;
  }

  button {
    margin-bottom: 5px;
  }
`;

export default function LoginComponent(): ReactElement {
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
      const res = await dispatch(
        setLogin(
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
          },
          router,
        ),
      );
      if (res.status === 404 || res.status === 401) {
        setError(true);
        setErrorMessage('아이디 혹은 비밀번호가 틀립니다.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ModalWrapper modalName="login">
      <Wrapper>
        <form onSubmit={handleLogin}>
          <Input ref={emailRef} placeHolder="이메일 입력" />
          <Input
            type="password"
            ref={passwordRef}
            placeHolder="비밀번호 입력"
          />
          {error && <Text text={errorMessage} color="red" />}
          <Button title="로그인" type="submit" />
        </form>
      </Wrapper>
    </ModalWrapper>
  );
}
