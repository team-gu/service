import { useState, ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAuthState, useAppDispatch } from '@store';
import { useScrollPosition } from '@hooks/useWindow';
import { setLogout } from '@store';

const Wrapper = styled.nav<{ isShowByScroll: Boolean }>`
  position: fixed;
  top: ${({ isShowByScroll }) => (isShowByScroll ? 0 : '-100px')};
  left: 0;
  width: 100%;
  display: flex;
  border-bottom: 1px solid #000;
  ${({ theme: { flexRow } }) => flexRow('space-between')};
  transition: 0.5s;
  padding: 10px 0 0 5%;
  background-color: #fff;
  z-index: 100;

  .logo {
    position: relative;
    font-weight: 700;
    color: #fff;
    text-decoration: none;
    font-size: 2em;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: 0.5s;
  }

  ul {
    position: relative;
    display: flex;
    padding-right: 10%;
    ${({ theme: { flexRow } }) => flexRow()};

    li {
      position: relative;
      list-style: none;
      margin-left: 10px;
      letter-spacing: 2px;

      a {
        position: relative;
        color: black;
        text-decoration: none;
        font-weight: 500;
        transition: 0.5s;

        &:hover {
          color: red;
        }
      }
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
      <div className="logo">
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
      </div>
      <ul>
        {user.name ? (
          <>
            <li>공지사항</li>
            <li>
              <Link href="userdetail">
                <a>마이페이지</a>
              </Link>
            </li>
            <li>
              <Link href="humanpool">
                <a>인력풀</a>
              </Link>
            </li>
            <li>팀구성현황</li>
            <li
              onClick={() => {
                dispatch(setLogout());
                router.push('/');
              }}
            >
              로그아웃
            </li>
          </>
        ) : (
          <li>
            <Link href="login">
              <a>로그인</a>
            </Link>
          </li>
        )}
      </ul>
    </Wrapper>
  );
}
