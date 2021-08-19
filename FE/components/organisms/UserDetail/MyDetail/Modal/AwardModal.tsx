import { ReactElement, SyntheticEvent, useState, useRef } from 'react';
import styled from 'styled-components';

import { Input, Text, Textarea } from '@atoms';
import { Button } from '@molecules';
import { postAward, updateAward } from '@repository/userprofile';
import {
  useAuthState,
  useAppDispatch,
  setAwards,
  useModalState,
  removeModal,
} from '@store';
import { MODALS } from '@utils/constants';
import { AwardModalType } from '@utils/type';

const Wrapper = styled.div`
  margin: 30px;
`;

const UpdateAward = styled.div`
  > div {
    margin-bottom: 15px;
  }

  .button-container {
    text-align: end;

    button {
      width: 5vw;
      height: 30px;
      margin-left: 5px;
    }
  }
`;

const CreateAward = styled.div`
  > div {
    margin-bottom: 15px;
  }

  .button-container {
    text-align: end;

    button {
      width: 5vw;
      height: 30px;
      margin-left: 5px;
    }
  }
`;

const StyledTextarea = styled(Textarea)`
  width: 100%;
  height: 50px;
`;

const Error = styled.div`
  font-weight: 900;
  color: red;
`;

export default function AwardModal(): ReactElement {
  const { user } = useAuthState();
  const { content } = useModalState();
  const dispatch = useAppDispatch();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const agencynRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [introduce, setIntroduce] = useState(
    content.introduce !== '소개' ? content.introduce : '',
  );

  const handleIntroduce = (e: Event & { target: HTMLTextAreaElement }) => {
    setIntroduce(e.target.value);
  };

  const handleAward = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      !agencynRef?.current?.value ||
      !nameRef?.current?.value ||
      !dateRef?.current?.value ||
      !introduce
    ) {
      setErrorMessage('모든 값을 입력해주세요.');
      setError(true);
      return;
    }
    try {
      const data: AwardModalType = {
        userId: user.id,
        id: content.id,
        agency: agencynRef.current && agencynRef.current.value,
        name: nameRef.current && nameRef.current.value,
        date: dateRef.current && dateRef.current.value,
        introduce: introduce,
      };
      console.log(data);
      const res = content.id ? await updateAward(data) : await postAward(data);
      dispatch(setAwards(res.data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(removeModal({ modalName: MODALS.AWARD_MODAL }));
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleAward}>
        {content.id ? (
          <UpdateAward>
            <div>
              <Input
                width="30vw"
                height="50px"
                ref={agencynRef}
                refValue={content.agency}
                maxLength={15}
              />
            </div>
            <div>
              <Input
                width="30vw"
                height="50px"
                ref={nameRef}
                refValue={content.name}
                maxLength={15}
              />
            </div>
            <div>
              <Input
                type="date"
                width="30vw"
                height="50px"
                ref={dateRef}
                refValue={content.date.split('T')[0]}
              />
            </div>
            <div>
              <StyledTextarea
                onChange={handleIntroduce}
                maxLength={100}
                value={introduce}
              />
              <Text
                text={introduce.length + ' / 100'}
                fontSetting="n12m"
                color="gray"
              />
            </div>
            {error && <Error>{errorMessage}</Error>}
            <div className="button-container">
              <Button title="수정" type="submit" />
              <Button
                title="닫기"
                func={() =>
                  dispatch(removeModal({ modalName: MODALS.AWARD_MODAL }))
                }
              />
            </div>
          </UpdateAward>
        ) : (
          <CreateAward>
            <div>
              <Input
                placeHolder={content.agency}
                width="30vw"
                height="50px"
                ref={agencynRef}
                maxLength={15}
              />
            </div>
            <div>
              <Input
                placeHolder={content.name}
                width="30vw"
                height="50px"
                ref={nameRef}
                maxLength={15}
              />
            </div>
            <div>
              <Input type="date" width="30vw" height="50px" ref={dateRef} />
            </div>
            <div>
              <StyledTextarea
                placeholder={content.introduce}
                onChange={handleIntroduce}
                maxLength={100}
              />
              <Text
                text={introduce.length + ' / 100'}
                fontSetting="n12m"
                color="gray"
              />
            </div>
            {error && <Error>{errorMessage}</Error>}
            <div className="button-container">
              <Button title="생성" type="submit" />
              <Button
                title="닫기"
                func={() =>
                  dispatch(removeModal({ modalName: MODALS.AWARD_MODAL }))
                }
              />
            </div>
          </CreateAward>
        )}
      </form>
    </Wrapper>
  );
}
