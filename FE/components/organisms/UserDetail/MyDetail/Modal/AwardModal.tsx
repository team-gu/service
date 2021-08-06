import { ReactElement, SyntheticEvent, useState, useRef } from 'react';
import { Input } from '@atoms';
import { Button } from '@molecules';
import { ModalWrapper } from '@organisms';
import { postAward, updateAward } from '@repository/userprofile';
import { useAuthState, useAppDispatch, setAwards } from '@store';
import styled from 'styled-components';

interface AwardType {
  userId: number;
  id?: number | null;
  agency: string | null;
  date: string | null;
  name: string | null;
  introduce: string | null;
}

const Wrapper = styled.div`
  margin: 30px;
`;

const UpdateAward = styled.div`
  div {
    margin-bottom: 15px;

    button {
      width: 5vw;
      height: 20px;
      margin-left: 5px;
    }
  }
`;

const CreateAward = styled.div`
  div {
    margin-bottom: 15px;

    button {
      width: 5vw;
      height: 20px;
      margin-left: 5px;
    }
  }
`;

const Error = styled.div`
  font-weight: 900;
  color: red;
`;

export default function AwardModal({
  awardModalData,
  setShowAwardModal,
}: any): ReactElement {
  const { user } = useAuthState();
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const agencynRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLInputElement>(null);

  const handleAward = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      !agencynRef?.current?.value ||
      !nameRef?.current?.value ||
      !dateRef?.current?.value ||
      !introduceRef?.current?.value
    ) {
      setErrorMessage('모든 값을 입력해주세요.');
      setError(true);
      return;
    }
    try {
      const data: AwardType = {
        userId: user.id,
        id: awardModalData.id,
        agency: agencynRef.current && agencynRef.current.value,
        name: nameRef.current && nameRef.current.value,
        date: dateRef.current && dateRef.current.value,
        introduce: introduceRef.current && introduceRef.current.value,
      };
      const res = awardModalData.id
        ? await updateAward(data)
        : await postAward(data);
      dispatch(setAwards(res.data));
      setShowAwardModal(false);
    } catch (e) {
      console.log(e);
      setShowAwardModal(false);
    }
  };

  return (
    <ModalWrapper modalName="addAward">
      <Wrapper>
        <form onSubmit={handleAward}>
          {awardModalData.id ? (
            <UpdateAward>
              <div>
                <Input
                  width="30vw"
                  height="50px"
                  ref={agencynRef}
                  refValue={awardModalData.agency}
                />
              </div>
              <div>
                <Input
                  width="30vw"
                  height="50px"
                  ref={nameRef}
                  refValue={awardModalData.name}
                />
              </div>
              <div>
                <Input
                  type="date"
                  width="30vw"
                  height="50px"
                  ref={dateRef}
                  refValue={awardModalData.date}
                />
              </div>
              <div>
                <Input
                  width="30vw"
                  height="50px"
                  ref={introduceRef}
                  refValue={awardModalData.introduce}
                />
              </div>
              {error && <Error>{errorMessage}</Error>}
              <div>
                <Button title="수정" type="submit" />
                <Button title="닫기" func={() => setShowAwardModal(false)} />
              </div>
            </UpdateAward>
          ) : (
            <CreateAward>
              <div>
                <Input
                  placeHolder={awardModalData.agency}
                  width="30vw"
                  height="50px"
                  ref={agencynRef}
                />
              </div>
              <div>
                <Input
                  placeHolder={awardModalData.name}
                  width="30vw"
                  height="50px"
                  ref={nameRef}
                />
              </div>
              <div>
                <Input type="date" width="30vw" height="50px" ref={dateRef} />
              </div>
              <div>
                <Input
                  placeHolder={awardModalData.introduce}
                  width="30vw"
                  height="50px"
                  ref={introduceRef}
                />
              </div>
              {error && <Error>{errorMessage}</Error>}
              <div>
                <Button title="생성" type="submit" />
                <Button title="닫기" func={() => setShowAwardModal(false)} />
              </div>
            </CreateAward>
          )}
        </form>
      </Wrapper>
    </ModalWrapper>
  );
}
