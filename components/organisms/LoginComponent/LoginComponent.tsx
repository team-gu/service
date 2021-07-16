import { ReactElement, useRef } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import { Button } from '@molecules';
import { Input } from '@atoms';
import { useAppDispatch } from '@hooks';
import { setLogin } from '@store';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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

  const idRef: any = useRef<HTMLInputElement>(null);
  const passwordRef: any = useRef<HTMLInputElement>(null);

  const handleLogin = () => {
    if (idRef.current.value === '') {
      return alert('아이디가 입력되지 않았습니다.');
    }
    if (passwordRef.current.value === '') {
      return alert('비밀번호가 입력되지 않았습니다.');
    }
    dispatch(
      setLogin(
        { id: idRef.current.value, password: passwordRef.current.value },
        router,
      ),
    );
  };

  return (
    <Wrapper>
      <Input ref={idRef} placeHolder="아이디 입력" />
      <Input
        type="password"
        ref={passwordRef}
        placeHolder="비밀번호 입력"
      ></Input>
      <Button title="로그인" func={() => handleLogin()} />
      <Button title="회원가입" func={() => router.push('register')} />
    </Wrapper>
  );
}
