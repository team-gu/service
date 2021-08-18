import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Title } from '@molecules';
import { Icon, Text } from '@atoms';

interface Items {
  id: number;
  title: string;
  func: any;
  iconName?: string;
}

interface RoomUserList {
  user_id: number;
  name: string;
  email: string;
}

interface DropdownMenuProps {
  children: ReactElement;
  items?: Items[];
  roomUserList?: RoomUserList[];
}

const Wrapper = styled.div<{ isOpen: boolean; isRoomUserHover: boolean }>`
  ${({ theme: { flexRow } }) => flexRow()};
  list-style-type: none;
  position: relative;
  text-align: center;
  z-index: 12;
  ${({ isOpen }) =>
    isOpen &&
    `
			fill: #0b3895;
			transform: scale(1);
		`}

  .list {
    width: ${({ isRoomUserHover }) => (isRoomUserHover ? '210px' : '120px')};
    padding: 10px 0;
    position: absolute;
    top: 25px;
    right: -25px;
    z-index: 12;
    background-color: #fff;
    border-radius: 5px;
    transition: 0.25s ease all;
    transform: scale(0);
    transform-origin: 0 1;
    box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.15);
    ${({ theme: { flexCol } }) => flexCol()};
    transform: ${({ isOpen }) => isOpen && 'scale(1)'};

    .item {
      ${({ theme: { flexRow } }) => flexRow()};
      width: ${({ isRoomUserHover }) => (isRoomUserHover ? '180px' : '90px')};
      padding: 0 5px;

      .each {
        ${({ theme: { flexRow }, isRoomUserHover }) =>
          flexRow(isRoomUserHover ? 'flex-start' : 'center')};
        width: 100%;
        height: 100%;
        padding: 5px 0;
        user-select: none;
        text-align: left;
        font-size: 15px;
        color: #9e9e9e;
        > div:hover,
        &:hover {
          color: #f2886b;
          text-decoration: none;
        }
        cursor: pointer;
      }

      i {
        cursor: pointer;
      }
    }
  }
`;

export default function DropdownMenu({
  children,
  items,
  roomUserList,
}: DropdownMenuProps): ReactElement {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper
      isOpen={isOpen}
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      isRoomUserHover={roomUserList?.length > 0}
    >
      {children}
      <ul className="list">
        {items?.map(({ id, title, func, iconName }: Items) => (
          <li className="item" key={id} onClick={func}>
            {iconName ? (
              <div>
                <Icon iconName={iconName} />
                <div className="each">{title}</div>
              </div>
            ) : (
              <div className="each">{title}</div>
            )}
          </li>
        ))}
        {roomUserList?.length > 0 && (
          <Title title="참가자" fontSetting="n14b">
            {roomUserList?.map(({ user_id, name, email }: RoomUserList) => (
              <li className="item" key={user_id}>
                <div
                  className="each"
                  onClick={() => router.push(`/userdetail/${user_id}`)}
                >
                  <Text
                    className="item"
                    text={`${name}(${email})`}
                    fontSetting="n12m"
                  />
                </div>
              </li>
            ))}
          </Title>
        )}
      </ul>
    </Wrapper>
  );
}
