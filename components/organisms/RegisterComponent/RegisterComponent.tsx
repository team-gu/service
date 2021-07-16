import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { Label, Button } from '@molecules';
import { Input } from '@atoms';

import { postSignUp, getCheckIdDuplicate } from '@repository/baseRepository';

const Wrapper = styled.div`
  ${({ theme: { flexCol } }) => flexCol()}
`;

export default function RegisterComponent(): ReactElement {
  const [form, setForm] = useState({
    userId: '',
    name: '',
    password: '',
    passwordConfirm: '',
    department: '',
    position: '',
  });

  const [error, setError] = useState({
    userId: '',
    name: '',
    password: '',
    passwordConfirm: '',
    department: '',
    position: '',
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

  const handleError = (name: string, value: string, isSuccess = false) => {
    setError({
      ...error,
      [name]: value + (isSuccess ? '/1' : '/0'),
    });
  };

  const handleUserIdBlur = async ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'userId' && value === '') {
      return handleError(name, '필수 입력 항목입니다.');
    }
    try {
      // const { status } = await getCheckIdDuplicate(form.userId);

      // if (status === 409) {
      //   return handleError(name, '이미 존재하는 사용자 아이디 입니다.');
      // }
      return handleError(name, '사용 가능한 사용자 아이디 입니다.', true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGeneralBlur = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'name' && value === '') {
      return handleError(name, '필수 입력 항목입니다.');
    }
    return handleError(name, '사용 가능합니다.', true);
  };

  // TODO: handleError 두번 요청시 비동기로 실행되는 문제?? 때문에 값이 덮어씌어짐
  const handlePasswordBlur = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'password' && value === '') {
      handleError('passwordConfirm', '');
      return handleError(name, '필수 입력 항목입니다. ');
    }

    // TODO: 정규식 찢어서 에러메시지 각각을 처리하도록 해야 함
    const regex = new RegExp(
      /^.*(?=^.{9,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
    );

    if (!regex.test(form.password)) {
      handleError('passwordConfirm', '');
      return handleError(
        name,
        '비밀번호는 영문, 숫자, 특수문자 조합 최소 9글자 최대 16글자여야 합니다.',
      );
    }
  };

  const handlePasswordConfirmBlur = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'passwordConfirm' && value === '') {
      return handleError(name, '필수 입력 항목입니다. ');
    }
    if (form.password !== value)
      return handleError(name, '비밀번호가 일치하지 않습니다.');
    return handleError(name, '비밀번호가 일치합니다.', true);
  };

  const handleSubmit = async () => {
    try {
      if (form.userId === '') return alert('아이디를 입력하세요.');
      if (form.password === '') return alert('비밀번호를 입력하세요.');
      if (form.passwordConfirm === '')
        return alert('비밀번호 확인을 입력하세요.');

      if (form.userId.length > 16)
        return alert('아이디는 16자 이하여야 합니다.');
      if (form.password !== form.passwordConfirm)
        return alert('비밀번호가 일치하지 않습니다.');

      if (form.department.length > 30)
        return alert('소속은 30자 이하여야 합니다.');
      if (form.position.length > 30)
        return alert('직책은 30자 이하여야 합니다.');

      // TODO: status destructuring 되는지 확인해봐야함
      const { status } = await getCheckIdDuplicate(form.userId);

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

      await postSignUp({
        department: form.department,
        position: form.position,
        name: form.name,
        user_id: form.userId,
        password: form.password,
      });

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
          funcBlur={handleUserIdBlur}
          name="userId"
          maxLength={16}
          error={error.userId}
        />
      </Label>
      <Label text="Username">
        <Input
          func={handleInput}
          funcBlur={handleGeneralBlur}
          name="name"
          maxLength={30}
          error={error.name}
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
          funcBlur={handlePasswordConfirmBlur}
          name="passwordConfirm"
          maxLength={16}
          error={error.passwordConfirm}
        />
      </Label>
      <Label text="Department">
        <Input func={handleInput} name="department" maxLength={30} />
      </Label>
      <Label text="Position">
        <Input func={handleInput} name="position" maxLength={30} />
      </Label>
      <Button title="Sign Up" func={() => handleSubmit()} />
    </Wrapper>
  );
}
