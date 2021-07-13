import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Label, Button } from '@molecules';
import { Input } from '@atoms';

import { postSignUp, getCheckIdDuplicate } from '@repository/baseRepository';

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol()}
`;

export default function SignUp(): ReactElement {
  const [form, setForm] = useState({
    id: '',
    userName: '',
    password: '',
    passwordConfirm: '',
    team: '',
    role: '',
  });

  const [error, setError] = useState({
    id: '',
    userName: '',
    password: '',
    passwordConfirm: '',
    team: '',
    role: '',
  });

  const handleInput = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [name]: value,
    });
    setError({
      ...error,
      [name]: '',
    });
  };

  const handleError = (name: string, value: string) => {
    setError({
      ...error,
      [name]: value,
    });
  };

  const handleIdBlur = async ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'id' && value === '') {
      return handleError(name, '필수입력값입니다.');
    }
    try {
      const { status } = await getCheckIdDuplicate(form.id);

      if (status === 409) {
        return handleError(name, '이미 중복된 아이디입니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGeneralBlur = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'userName' && value === '') {
      return handleError(name, '필수입력값입니다.');
    }
  };

  const handlePasswordBlur = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if ((name === 'password' || name === 'passwordConfirm') && value === '') {
      return handleError(name, '필수입력값입니다. ');
    }

    const regex = new RegExp(
      /^.*(?=^.{9,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
    );

    if (!regex.test(form.password))
      return handleError(
        name,
        '비밀번호는 영문, 숫자, 특수문자 조합 최소 9글자 최대 16글자여야 합니다.',
      );

    if (name === 'passwordConfirm') {
      if (form.password !== value)
        return handleError(name, '비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = async () => {
    try {
      if (form.id === '') return alert('아이디를 입력하세요.');
      if (form.password === '') return alert('비밀번호를 입력하세요.');
      if (form.passwordConfirm === '')
        return alert('비밀번호 확인을 입력하세요.');

      if (form.id.length > 16) return alert('아이디는 16자 이하여야 합니다.');
      if (form.password !== form.passwordConfirm)
        return alert('비밀번호가 일치하지 않습니다.');

      if (form.team.length > 30) return alert('소속은 30자 이하여야 합니다.');
      if (form.role.length > 30) return alert('직책은 30자 이하여야 합니다.');

      // TODO: status destructuring 되는지 확인해봐야함
      const { status } = await getCheckIdDuplicate(form.id);

      if (status === 409) {
        return alert('이미 중복된 아이디입니다.');
      }

      const regex = new RegExp(
        /^.*(?=^.{9,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
      );

      if (!regex.test(form.password))
        return alert(
          '비밀번호는 영문, 숫자, 특수문자 조합 최소 9글자 최대 16글자여야 합니다.',
        );

      await postSignUp(form);

      alert('회원가입이 완료되었습니다!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <Label text="id">
        <Input
          func={handleInput}
          funcBlur={handleIdBlur}
          name="id"
          maxLength={16}
          error={error.id}
        />
      </Label>
      <Label text="Username">
        <Input
          func={handleInput}
          funcBlur={handleGeneralBlur}
          name="userName"
          maxLength={30}
          error={error.userName}
        />
      </Label>
      <Label text="Password">
        <Input
          type="password"
          func={handleInput}
          funcBlur={handlePasswordBlur}
          name="password"
          maxLength={16}
          error={error.password}
        />
      </Label>
      <Label text="Password Confirm">
        <Input
          type="password"
          func={handleInput}
          funcBlur={handlePasswordBlur}
          name="passwordConfirm"
          maxLength={16}
          error={error.passwordConfirm}
        />
      </Label>
      <Label text="Team">
        <Input func={handleInput} name="team" maxLength={30} />
      </Label>
      <Label text="Role">
        <Input func={handleInput} name="role" maxLength={30} />
      </Label>
      <Button title="Sign Up" func={() => handleSubmit()} />
    </Wrapper>
  );
}
