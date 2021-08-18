import { ReactElement, useState } from 'react';
import { MyDetail, MyDetailEdit } from './MyDetail';

const USER_INFO = 0;
const USER_PROJECT = 1;
export default function UserDetail(): ReactElement {
  const [edit, setEdit] = useState<boolean>(false);
  const [route, setRoute] = useState(USER_INFO);

  const changeEdit = () => {
    setEdit(!edit);
  };

  return edit ? (
    <MyDetailEdit
      changeEditMode={changeEdit}
      route={route}
      setRoute={setRoute}
    />
  ) : (
    <MyDetail changeEditMode={changeEdit} route={route} setRoute={setRoute} />
  );
}
