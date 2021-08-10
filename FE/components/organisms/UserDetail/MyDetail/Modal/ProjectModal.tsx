import { ReactElement, SyntheticEvent, useState, useRef } from 'react';
import { Input, Textarea, Text } from '@atoms';
import { Button, SimpleSelect } from '@molecules';
import { ModalWrapper } from '@organisms';
import { postProject, updateProject } from '@repository/userprofile';
import {
  useAuthState,
  useModalState,
  useAppDispatch,
  setProjects,
  removeModal,
} from '@store';
import styled from 'styled-components';
import { MODALS } from '@utils/constants';
import { ProjectModalType } from '@utils/type';

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

export default function ProjectModal(): ReactElement {
  const { user } = useAuthState();
  const { content } = useModalState();
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  const [position, setPosition] = useState<string>(content.position);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [introduce, setIntroduce] = useState(
    content.introduce !== '소개' ? content.introduce : '',
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
      const data: ProjectModalType = {
        userId: user.id,
        id: content.id,
        name: nameRef.current && nameRef.current.value,
        position: position,
        url: urlRef.current && urlRef.current.value,
        introduce: introduce,
      };
      console.log(data);
      const res = content.id
        ? await updateProject(data)
        : await postProject(data);
      dispatch(setProjects(res.data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(removeModal({ modalName: MODALS.PROJECT_MODAL }));
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleProject}>
        {content.id ? (
          <UpdateProject>
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
              <SimpleSelect
                options={SkillOptions}
                onChange={(position) => {
                  setPosition(position.value);
                }}
                value={[
                  {
                    name: content.position,
                    label: content.position,
                  },
                ]}
              />
            </div>
            <div>
              <Input
                width="30vw"
                height="50px"
                ref={urlRef}
                refValue={content.url}
                maxLength={50}
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
            <div>
              <Button title="수정" type="submit" />
              <Button
                title="닫기"
                func={() =>
                  dispatch(removeModal({ modalName: MODALS.PROJECT_MODAL }))
                }
              />
            </div>
          </UpdateProject>
        ) : (
          <CreateProject>
            <div>
              <Input
                placeHolder={content.name}
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
                placeholder={content.position}
              />
            </div>
            <div>
              <Input
                placeHolder={content.url}
                width="30vw"
                height="50px"
                maxLength={50}
                ref={urlRef}
              />
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
            <div>
              <Button title="생성" type="submit" />
              <Button
                title="닫기"
                func={() =>
                  dispatch(removeModal({ modalName: MODALS.PROJECT_MODAL }))
                }
              />
            </div>
          </CreateProject>
        )}
      </form>
    </Wrapper>
  );
}
