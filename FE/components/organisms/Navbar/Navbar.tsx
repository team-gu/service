import { useState, ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { DropdownMenu } from '@molecules';
import { Text } from '@atoms';
import { useAuthState, useAppDispatch, setLogout } from '@store';
import { useScrollPosition } from '@hooks/useWindow';
import { getImageURL, ROUTE_TO_KOREAN } from '@utils/constants';

const Wrapper = styled.nav<{ isShowByScroll: Boolean }>`
  font-family: 'Roboto', sans-serif;
  position: fixed;
  top: ${({ isShowByScroll }) => (isShowByScroll ? 0 : '-130px')};
  left: 0;
  margin: 0 auto;
  width: 100vw;
  height: 110px;
  background-color: white;
  transition: 0.5s;
  backdrop-filter: blur(30px);
  z-index: 20;
  ${({ theme: { flexRow } }) => flexRow()};

  .container {
    ${({ theme: { flexRow } }) => flexRow('space-between')};
    width: 70%;

    .logo {
      ${({ theme: { flexRow } }) => flexRow()};
      .route {
        ${({ theme: { flexRow } }) => flexRow()};
        height: 30px;
        border-left: 1px solid grey;
        padding-left: 20px;
      }
    }
    ul {
      display: flex;
      cursor: pointer;
      li {
        position: relative;
        list-style: none;
        letter-spacing: 2px;
        cursor: pointer;
        a {
          cursor: pointer;
          display: block;
          padding: 15px;
          text-decoration: none;
          color: #555;
          font-weight: 800;
        }

        a:hover {
          color: #000;
        }
        a:after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: 0%;
          content: '.';
          color: transparent;
          background: #000;
          height: 1px;
        }
        a:hover:after {
          width: 100%;
          transition: all 0.5s;
        }
      }
    }

    .profileImage {
      border: 1px solid #000;
      border-radius: 50%;
      cursor: pointer;

      Image {
        object-fit: cover;
      }
    }

    .userName {
      font-size: 12px;
      margin-left: 4px;

      span {
        color: #3797f4;
        font-weight: 900;
      }

      user-select: none;
    }

    .list {
      top: 40px;
    }
  }
`;

export default function Navbar(): ReactElement {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuthState();

  const [hideOnScroll, setHideOnScroll] = useState(true);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll],
    undefined,
    false,
    100,
  );

  return (
    <Wrapper isShowByScroll={hideOnScroll}>
      <div className="container">
        <div className="logo">
          {user.name ? (
            <Link href="/humanpool">
              <a>
                <Image
                  className="fixed-logo"
                  alt="팀구"
                  src="/logo.png"
                  width={120}
                  height={60}
                />
              </a>
            </Link>
          ) : (
            <Link href="/">
              <a>
                <Image
                  className="fixed-logo"
                  alt="팀구"
                  src="/logo.png"
                  width={120}
                  height={50}
                />
              </a>
            </Link>
          )}
          <Text
            text={ROUTE_TO_KOREAN[router.pathname.split('/')[1]]}
            className="route"
            color="gray"
          />
        </div>
        <div>
          <ul>
            <li>
              <Link href="/notice">
                <a>공지사항</a>
              </Link>
            </li>

            <li>
              <Link href="/humanpool">
                <a>인력풀</a>
              </Link>
            </li>
            <li>
              <Link href="/team">
                <a>팀구성현황</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <DropdownMenu
            items={[
              {
                id: 1,
                title: '마이페이지',
                func: () => router.push('/userdetail'),
                iconName: 'account_circle',
              },
              {
                id: 2,
                title: '로그아웃',
                func: () => {
                  dispatch(setLogout(router));
                },
                iconName: 'logout',
              },
            ]}
          >
            <>
              <Image
                className="profileImage"
                alt="프로필사진"
                src={getImageURL(user.img)}
                width={'40%'}
                height={'40%'}
              />
              <p className="userName">
                {user.studentNumber}
                <br />
                <span>{user.name}</span>님
              </p>
            </>
          </DropdownMenu>
        </div>
      </div>
    </Wrapper>
  );
}
