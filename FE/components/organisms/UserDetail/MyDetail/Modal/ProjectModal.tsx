import { ReactElement, SyntheticEvent, useState, useRef } from 'react';
import { Input, Textarea, Text } from '@atoms';
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

const StyledTextarea = styled(Textarea)`
  width: 100%;
  height: 50px;
`;

const Error = styled.div`
  font-weight: 900;
  color: red;
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

  const [position, setPosition] = useState<string>(projectModalData.position);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [introduce, setIntroduce] = useState(
    projectModalData.introduce !== '소개' ? projectModalData.introduce : '',
  );

  const handleIntroduce = (e: Event & { target: HTMLTextAreaElement }) => {
    setIntroduce(e.target.value);
  };

  const handleProject = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      !nameRef?.current?.value ||
      !position ||
      !urlRef?.current?.value ||
      !introduce
    ) {
      setErrorMessage('모든 값을 입력해주세요.');
      setError(true);
      return;
    }

    try {
      const data: ProjectType = {
        userId: user.id,
        id: projectModalData.id,
        name: nameRef.current && nameRef.current.value,
        position: position,
        url: urlRef.current && urlRef.current.value,
        introduce: introduce,
      };
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
                  maxLength={15}
                />
              </div>
              <div>
                <SimpleSelect
                  options={SkillOptions}
                  onChange={(position) => {
                    setPosition(position.value);
                  }}
                  value={[
                    {
                      name: projectModalData.position,
                      label: projectModalData.position,
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
                  maxLength={50}
                />
              </div>
              <div>
                <StyledTextarea onChange={handleIntroduce} maxlength={100}>
                  {introduce}
                </StyledTextarea>
                <Text
                  text={introduce.length + ' / 100'}
                  fontSetting="n12m"
                  color="gray"
                />
              </div>
              {error && <Error>{errorMessage}</Error>}
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
                  maxLength={15}
                  ref={nameRef}
                />
              </div>
              <div>
                <SimpleSelect
                  options={SkillOptions}
                  onChange={(position) => {
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
                  maxLength={50}
                  ref={urlRef}
                />
              </div>
              <div>
                <StyledTextarea
                  placeholder={projectModalData.introduce}
                  onChange={handleIntroduce}
                  maxlength={100}
                />
                <Text
                  text={introduce.length + ' / 100'}
                  fontSetting="n12m"
                  color="gray"
                />
              </div>
              {error && <Error>{errorMessage}</Error>}
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
