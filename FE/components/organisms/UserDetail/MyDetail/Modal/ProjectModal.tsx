import { ReactElement, SyntheticEvent, useState, useRef } from 'react';
import { Input } from '@atoms';
import { Button, SimpleSelect } from '@molecules';
import { ModalWrapper } from '@organisms';
import { postProject, updateProject } from '@repository/userprofile';
import { useAuthState, useAppDispatch, setProjects } from '@store';
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

const SkillOptions = [
  {
    value: 'Front',
    label: 'Front',
  },
  {
    value: 'Back',
    label: 'Back',
  },
];

export default function ProjectModal({
  projectModalData,
  setShowProjectModal,
}: any): ReactElement {
  const { user } = useAuthState();
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLInputElement>(null);

  const [position, setPosition] = useState<string>(projectModalData.position);

  const handleProject = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const data: ProjectType = {
        userId: user.id,
        id: projectModalData.id,
        name: nameRef.current && nameRef.current.value,
        position: position,
        url: urlRef.current && urlRef.current.value,
        introduce: introduceRef.current && introduceRef.current.value,
      };
      console.log(data);
      const res = projectModalData.id
        ? await updateProject(data)
        : await postProject(data);
      dispatch(setProjects(res.data));
      setShowProjectModal(false);
    } catch (e) {
      console.log(e);
      setShowProjectModal(false);
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
                <SimpleSelect
                  options={SkillOptions}
                  onChange={(position) => {
                    console.log(position);
                    setPosition(position.value);
                  }}
                  value={[
                    {
                      name: user.wishPositionCode,
                      label: user.wishPositionCode,
                    },
                  ]}
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
                <SimpleSelect
                  options={SkillOptions}
                  onChange={(position) => {
                    console.log(position);
                    setPosition(position.value);
                  }}
                  placeholder={projectModalData.position}
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
