import { useState, useEffect, useRef, ReactElement, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Icon } from '@atoms';
import { useAuthState, useAppDispatch, setLogout } from '@store';
import { useScrollPosition } from '@hooks/useWindow';
const Wrapper = styled.nav<{ isShowByScroll: Boolean }>`
  font-family: 'Roboto', sans-serif;
  position: fixed;
  top: ${({ isShowByScroll }) => (isShowByScroll ? 0 : '-130px')};
  left: 0;
  margin: 0 auto;
  width: 70%;
  margin-left: 15%;
  height: 110px;
  ${({ theme: { flexRow } }) => flexRow('space-between')};
  transition: 0.5s;
  background-color: #fff;
  z-index: 100;

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
`;

const Menu = styled.div<{ show: Boolean }>`
  position: absolute;
  top: 100px;
  right: -53px;
  width: 145px;
  background: #cecece;
  box-sizing: 0 5px 25px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  transition: 0.5s;
  opacity: ${({ show }) => (show ? '1' : '0')};

  ul {
    display: inline-block;
  }

  li {
    list-style: none;
    padding: 10px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    ${({ theme: { flexRow } }) => flexRow()};

    a {
      display: inline-block;
      text-decoration: none;
      color: #000;
      font-weight: 500;
      transition: 0.5s;
    }

    a:hover {
      color: red;
    }
  }

  h3 {
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding: 20px 0;
    font-weight: 500;
    line-height: 1.2em;
  }
  span {
    font-size: 14px;
    font-weight: 400;
    color: #fff;
  }
`;

export default function Navbar(): ReactElement {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAuthState();

  const menuRef = useRef();
  const [show, setShow] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(true);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(!show);
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  });

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
        {user.name ? (
          <Link href="/humanpool">
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
      </div>
      <div>
        <ul>
          <li>
            <a>공지사항</a>
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
        <Image
          className="profileImage"
          alt="프로필사진"
          src="/profile.png"
          width={'40%'}
          height={'40%'}
          onClick={() => {
            setShow(!show);
          }}
        />
      </div>
      <Menu show={show} ref={menuRef}>
        <h3>
          {user.name}
          <br />
          <span>{user.studentNumber}</span>
        </h3>
        <ul>
          <li>
            <Icon iconName="account_circle" />
            <Link href="/userdetail">
              <a className="hoverable">마이페이지</a>
            </Link>
          </li>
          <li
            onClick={() => {
              dispatch(setLogout());
              router.push('/');
            }}
          >
            <>
              <Icon iconName="logout" />
              <a>로그아웃</a>
            </>
          </li>
        </ul>
      </Menu>
    </Wrapper>
  );
}
