import { ReactElement, SyntheticEvent, useState, useRef } from 'react';
import styled from 'styled-components';
import { Input } from '@atoms';
import { Button } from '@molecules';
import { findPassword } from '@repository/userprofile';
import { useAppDispatch, removeModal } from '@store';
import { MODALS } from '@utils/constants';

const Wrapper = styled.div`
  margin: 30px;
`;

const FindPW = styled.div`
  > div:first-child {
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

export default function FindPasswordModal(): ReactElement {
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);

  const handlePassword = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!emailRef?.current?.value) {
      setErrorMessage('이메일을 입력해주세요.');
      setError(true);
      return;
    }

    try {
      const data = {
        email: emailRef?.current?.value,
      };
      console.log(data);
      await findPassword(data);
      alert('비밀번호가 초기화 되었습니다.');
      dispatch(removeModal({ modalName: MODALS.FINDPASSWORD_MODAL }));
    } catch (e) {
      console.log(e);
      setErrorMessage('올바르지 않은 이메일입니다.');
      setError(true);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handlePassword}>
        <FindPW>
          <div>
            <Input
              placeHolder={'이메일을 입력해주세요.'}
              width="30vw"
              height="50px"
              ref={emailRef}
              maxLength={30}
              autoComplete="off"
              width="100%"
              height="30px"
            />
          </div>
          {error && <Error>{errorMessage}</Error>}
          <div className="button-container">
            <Button title="확인" type="submit" />
            <Button
              title="닫기"
              func={() =>
                dispatch(removeModal({ modalName: MODALS.FINDPASSWORD_MODAL }))
              }
            />
          </div>
        </FindPW>
      </form>
    </Wrapper>
  );
}
