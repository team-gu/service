import { ReactElement, SyntheticEvent, useState, useRef } from 'react';
import styled from 'styled-components';
import { Input } from '@atoms';
import { Button } from '@molecules';
import { changePassword } from '@repository/userprofile';
import { useAuthState, useAppDispatch, removeModal } from '@store';
import { MODALS } from '@utils/constants';

const Wrapper = styled.div`
  margin: 30px;
  input {
    width: 100%;
    height: 30px;
  }
`;

const ChangePW = styled.div`
  width: 350px;

  > div {
    margin-bottom: 15px;
  }
  .button-container {
    text-align: center;
    button {
      width: 70px;
      height: 30px;
      margin-left: 5px;
    }
  }
`;

const Error = styled.div`
  font-weight: 900;
  color: red;
`;

export default function ChangePasswordModal(): ReactElement {
  const { user } = useAuthState();
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const confirmNewPasswordRef = useRef<HTMLInputElement>(null);

  const handlePassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (
      !emailRef?.current?.value ||
      !passwordRef?.current?.value ||
      !newPasswordRef?.current?.value ||
      !confirmNewPasswordRef?.current?.value
    ) {
      setErrorMessage('모든 값을 입력해주세요.');
      setError(true);
      return;
    }
    if (emailRef?.current?.value !== user.email) {
      setErrorMessage('이메일이 다릅니다.');
      setError(true);
      return;
    }
    const re =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (!re.test(newPasswordRef?.current?.value)) {
      setErrorMessage(
        '숫자, 영문, 특수문자 각 1자리 이상, 8자-16자 사이를 입력해주세요.',
      );
      setError(true);
      return;
    }
    if (newPasswordRef?.current?.value !== passwordRef?.current?.value) {
      setErrorMessage('새로운 비밀번호를 입력해주세요.');
      setError(true);
      return;
    }
    if (
      newPasswordRef?.current?.value !== confirmNewPasswordRef?.current?.value
    ) {
      setErrorMessage('변경하실 비밀번호를 올바르게 입력해주세요.');
      setError(true);
      return;
    }
    try {
      const data = {
        email: emailRef?.current?.value,
        modPassword: newPasswordRef?.current?.value,
        oriPassword: passwordRef.current.value,
      };
      await changePassword(data);
      alert('비밀번호가 정상적으로 변경되었습니다.');
      dispatch(removeModal({ modalName: MODALS.CHANGEPASSWORD_MODAL }));
    } catch (e) {
      console.log(e);
      setErrorMessage('비밀번호가 틀립니다.');
      setError(true);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handlePassword}>
        <ChangePW>
          <div>
            <div style={{ display: 'none' }}>
              <Input aria-hidden="true" />
              <Input type="password" aria-hidden="true" />
            </div>
            <Input
              placeHolder={'이메일을 입력해주세요.'}
              width="100%"
              height="40px"
              ref={emailRef}
              maxLength={30}
              autoComplete="off"
            />
          </div>
          <div>
            <Input
              placeHolder={'기존 비밀번호를 입력해주세요.'}
              type="password"
              width="100%"
              height="40px"
              ref={passwordRef}
              maxLength={16}
              autoComplete="off"
            />
          </div>
          <div>
            <Input
              placeHolder={'새로운 비밀번호를 입력해주세요.'}
              type="password"
              width="100%"
              height="40px"
              ref={newPasswordRef}
              maxLength={16}
              autoComplete="off"
            />
          </div>
          <div>
            <Input
              placeHolder={'새로운 비밀번호를 다시 한 번 입력해주세요.'}
              type="password"
              width="100%"
              height="40px"
              ref={confirmNewPasswordRef}
              maxLength={16}
              autoComplete="off"
            />
          </div>
          {error && <Error>{errorMessage}</Error>}
          <div className="button-container">
            <Button title="변경" type="submit" />
            <Button
              title="닫기"
              func={() =>
                dispatch(
                  removeModal({ modalName: MODALS.CHANGEPASSWORD_MODAL }),
                )
              }
            />
          </div>
        </ChangePW>
      </form>
    </Wrapper>
  );
}
