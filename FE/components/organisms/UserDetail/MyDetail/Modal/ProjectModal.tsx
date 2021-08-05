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

const UpdateProject = styled.div`
  div {
    margin-bottom: 15px;

    button {
      width: 5vw;
      height: 20px;
      margin-left: 5px;
    }
  }
`;

const CreateProject = styled.div`
  div {
    margin-bottom: 15px;

    button {
      width: 5vw;
      height: 20px;
      margin-left: 5px;
    }
  }
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
            <UpdateProject>
              <div>
                <Input
                  width="30vw"
                  height="50px"
                  ref={nameRef}
                  refValue={projectModalData.name}
                />
              </div>
              <div>
                <Input
                  width="30vw"
                  height="50px"
                  ref={positionRef}
                  refValue={projectModalData.position}
                />
              </div>
              <div>
                <Input
                  width="30vw"
                  height="50px"
                  ref={urlRef}
                  refValue={projectModalData.url}
                />
              </div>
              <div>
                <Input
                  width="30vw"
                  height="50px"
                  ref={introduceRef}
                  refValue={projectModalData.introduce}
                />
              </div>
              <div>
                <Button title="수정" type="submit" />
                <Button title="닫기" func={() => setShowProjectModal(false)} />
              </div>
            </UpdateProject>
          ) : (
            <CreateProject>
              <div>
                <Input
                  placeHolder={projectModalData.name}
                  width="30vw"
                  height="50px"
                  ref={nameRef}
                />
              </div>
              <div>
                <Input
                  placeHolder={projectModalData.position}
                  width="30vw"
                  height="50px"
                  ref={positionRef}
                />
              </div>
              <div>
                <Input
                  placeHolder={projectModalData.url}
                  width="30vw"
                  height="50px"
                  ref={urlRef}
                />
              </div>
              <div>
                <Input
                  placeHolder={projectModalData.introduce}
                  width="30vw"
                  height="50px"
                  ref={introduceRef}
                />
              </div>
              <div>
                <Button title="생성" type="submit" />
                <Button title="닫기" func={() => setShowProjectModal(false)} />
              </div>
            </CreateProject>
          )}
        </form>
      </Wrapper>
    </ModalWrapper>
  );
}
