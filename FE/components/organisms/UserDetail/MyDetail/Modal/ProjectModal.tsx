import { ReactElement, SyntheticEvent, useEffect, useRef } from 'react';
import { Input } from '@atoms';
import { Button } from '@molecules';
import { ModalWrapper } from '@organisms';
import { postProject, updateProject } from '@repository/projects';
import { useAuthState } from '@store';
import styled from 'styled-components';

interface ProjectType {
  userId: number;
  id?: number | null;
  name: string | null;
  position: string | null;
  url: string | null;
  introduce: string | null;
}

const Wrapper = styled.div`
  margin: 30px;
`;

export default function ProjectModal({
  projectModalData,
  setShowProjectModal,
}: any): ReactElement {
  const { user } = useAuthState();

  const nameRef = useRef<HTMLInputElement>(null);
  const positionRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (projectModalData.id) {
      if (nameRef.current) {
        nameRef.current.value = projectModalData.name;
      }
      if (positionRef.current) {
        positionRef.current.value = projectModalData.position;
      }
      if (urlRef.current) {
        urlRef.current.value = projectModalData.url;
      }
      if (introduceRef.current) {
        introduceRef.current.value = projectModalData.introduce;
      }
    }
  }, []);

  const handleProject = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data: ProjectType = {
        userId: user.id,
        id: projectModalData.id,
        name: nameRef.current && nameRef.current.value,
        position: positionRef.current && positionRef.current.value,
        url: urlRef.current && urlRef.current.value,
        introduce: introduceRef.current && introduceRef.current.value,
      };
      projectModalData.id ? await updateProject(data) : await postProject(data);
      setShowProjectModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalWrapper modalName="addProject">
      <Wrapper>
        <form onSubmit={handleProject}>
          {projectModalData.id ? (
            <>
              <Input width="30vw" height="50px" ref={nameRef} />
              <Input width="30vw" height="50px" ref={positionRef} />
              <Input width="30vw" height="50px" ref={urlRef} />
              <Input width="30vw" height="50px" ref={introduceRef} />
              <Button title="수정" type="submit" />
              <Button title="닫기" func={() => setShowProjectModal(false)} />
            </>
          ) : (
            <>
              <Input
                placeHolder={projectModalData.name}
                width="30vw"
                height="50px"
                ref={nameRef}
              />
              <Input
                placeHolder={projectModalData.position}
                width="30vw"
                height="50px"
                ref={positionRef}
              />
              <Input
                placeHolder={projectModalData.url}
                width="30vw"
                height="50px"
                ref={urlRef}
              />
              <Input
                placeHolder={projectModalData.introduce}
                width="30vw"
                height="50px"
                ref={introduceRef}
              />
              <Button title="생성" type="submit" />
              <Button title="닫기" func={() => setShowProjectModal(false)} />
            </>
          )}
        </form>
      </Wrapper>
    </ModalWrapper>
  );
}
