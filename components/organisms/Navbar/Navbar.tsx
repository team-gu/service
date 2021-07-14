import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '@hooks';

import { setLogout } from '@store';
import { get } from '@utils/snippet';

const Wrapper = styled.nav`
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  #fixed-bar-wrap {
    width: 1024px;
    margin: 0 auto;
    padding: 16px 0;
    position: relative;

    ${({ theme: { flexRow } }) => flexRow('space-between')};
    section {
      a,
      div {
        cursor: pointer;

        margin: 5px;
        color: #4d5159;
        text-decoration: none;
      }
    }
  }

  #fixed-bar #fixed-bar-wrap #fixed-bar-search {
    position: absolute;
    left: 152px;
    top: 16px;
    border-radius: 5px;
    border: solid 1px #e9ecef;
    text-decoration: none;
    padding: 0 1.6rem;
    height: 40px;
    box-sizing: border-box;
  }
`;
export default function Navbar(): ReactElement {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { name } = useAppSelector(get('auth'));

  return (
    <Wrapper>
      <div id="fixed-bar-wrap">
        <h1 id="fixed-bar-logo-title">
          <Link href="/">
            <a>
              <Image
                className="fixed-logo"
                alt="당근마켓"
                src="/logo.svg"
                width={100}
                height={50}
              />
            </a>
          </Link>
        </h1>
        <section>
          {name ? (
            <div
              onClick={() => {
                dispatch(setLogout());
                router.push('/');
              }}
            >
              로그아웃
            </div>
          ) : (
            <>
              <Link href="signin">로그인</Link>
              <Link href="register">회원가입 </Link>
            </>
          )}
        </section>
      </div>
    </Wrapper>
  );
}
