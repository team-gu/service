import { ReactElement, SyntheticEvent, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppDispatch, setLogin } from '@store';
import { Input } from '@atoms';
import { Button } from '@molecules';
import { ModalWrapper } from '@organisms';

const Wrapper = styled.div`
  width: 250px;
  height: 150px;
  display: flex;
  ${({ theme: { flexCol } }) => flexCol()};

  .input {
    margin-bottom: 20px;
  }

  button {
    margin-bottom: 10px;
  }
`;

export default function LoginComponent(): ReactElement {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const emailRef: any = useRef<HTMLInputElement>(null);
  const passwordRef: any = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (emailRef.current.value === '') {
      return alert('아이디가 입력되지 않았습니다.');
    }
    if (passwordRef.current.value === '') {
      return alert('비밀번호가 입력되지 않았습니다.');
    }
    await dispatch(
      setLogin(
        { email: emailRef.current.value, password: passwordRef.current.value },
        router,
      ),
    );
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
          <Button title="로그인" type="submit" />
        </form>
      </Wrapper>
    </ModalWrapper>
  );
}