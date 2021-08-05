import { ReactElement, SyntheticEvent, useEffect, useRef } from 'react';
import { Input } from '@atoms';
import { Button } from '@molecules';
import { ModalWrapper } from '@organisms';
import { postAward, updateAward } from '@repository/projects';
import { useAuthState } from '@store';
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

export default function AwardModal({
  awardModalData,
  setShowAwardModal,
}: any): ReactElement {
  const { user } = useAuthState();

  const agencynRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (awardModalData.id) {
  //     if (agencynRef.current) {
  //       agencynRef.current.value = awardModalData.agency;
  //     }
  //     if (nameRef.current) {
  //       nameRef.current.value = awardModalData.name;
  //     }
  //     if (dateRef.current) {
  //       dateRef.current.value = awardModalData.date;
  //     }
  //     if (introduceRef.current) {
  //       introduceRef.current.value = awardModalData.introduce;
  //     }
  //   }
  // }, []);

  const handleAward = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data: AwardType = {
        userId: user.id,
        id: awardModalData.id,
        agency: agencynRef.current && agencynRef.current.value,
        name: nameRef.current && nameRef.current.value,
        date: dateRef.current && dateRef.current.value,
        introduce: introduceRef.current && introduceRef.current.value,
      };
      console.log(data);
      awardModalData.id ? await updateAward(data) : await postAward(data);
      setShowAwardModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalWrapper modalName="addAward">
      <Wrapper>
        <form onSubmit={handleAward}>
          {awardModalData.id ? (
            <>
              <Input
                width="30vw"
                height="50px"
                ref={agencynRef}
                refValue={awardModalData.agency}
              />
              <Input
                width="30vw"
                height="50px"
                ref={nameRef}
                refValue={awardModalData.name}
              />
              <Input width="30vw" height="50px" ref={dateRef} />
              <Input width="30vw" height="50px" ref={introduceRef} />
              <Button title="수정" type="submit" />
              <Button title="닫기" func={() => setShowAwardModal(false)} />
            </>
          ) : (
            <>
              <Input
                placeHolder={awardModalData.agency}
                width="30vw"
                height="50px"
                ref={agencynRef}
              />
              <Input
                placeHolder={awardModalData.name}
                width="30vw"
                height="50px"
                ref={nameRef}
              />
              <Input
                placeHolder={awardModalData.date}
                width="30vw"
                height="50px"
                ref={dateRef}
              />
              <Input
                placeHolder={awardModalData.introduce}
                width="30vw"
                height="50px"
                ref={introduceRef}
              />
              <Button title="생성" type="submit" />
              <Button title="닫기" func={() => setShowAwardModal(false)} />
            </>
          )}
        </form>
      </Wrapper>
    </ModalWrapper>
  );
}
