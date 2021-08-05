import { ReactElement, useState } from 'react';
import { MyDetail, MyDetailEdit } from './MyDetail';

export default function UserDetail(): ReactElement {
  const [edit, setEdit] = useState<boolean>(false);

  const changeEdit = () => {
    setEdit(!edit);
  };

  return edit ? (
    <MyDetailEdit changeEditMode={changeEdit} />
  ) : (
    <MyDetail changeEditMode={changeEdit} />
  );
}
