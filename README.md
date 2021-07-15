# 작업 일지
## 1주차

명세에 맞춰 회원가입, 로그인 기능과 Spinner, 네비게이션 바 같은 부가기능을 구현해야 했습니다. Vue를 사용하지 않고 SSR에 최적화된 Next.js를 사용하자는 제안을 했습니다. 이번주는 팀원들과 짝 프로그래밍을 하고 각자 학습을 통해 Next.js에 익숙해지는 시간을 가졌습니다.

저희가 사용한 기술스택은 아래와 같습니다.

- SPA: Next.js(+ TypeScript)
- State Management: Redux Toolkit(+ react-redux)
- Test: Jest(+ testing-library/react)
- CSS-in-JS: styled-components
- Design System: Storybook
- ETC: ESLint(+ prettier), simple-peer(WebRTC)

### 월

https://github.com/ssafy-null/fe/pull/1

요약: 로그인 컴포넌트를 구현하였습니다.

- Module alias 설정을 위해 tsconfig, next.config, storybook에 alias를 정의하였습니다.
- CDD를 위한 Storybook을 도입했습니다.
- 로그인 상황에서의 endpoint 요청 함수를 제작했으며, authSlice를 만들었습니다.
- Modal, Image, Input, Text, Button, Login 컴포넌트를 구현했습니다.
- useDispatch, useSelector의 상태를 정의할 custom hook를 추가했습니다.

### 화

https://github.com/ssafy-null/fe/pull/2

요약: SignUp 컴포넌트를 구현했습니다.

- storybook next mocking을 추가했습니다.
- Input 컴포넌트에 필요한 props를 추가했습니다.
- Label, SignUp, register 컴포넌트를 구현했습니다.
- 회원가입, 아이디 중복체크 endpoint 요청 함수를 제작했습니다.
- input 컴포넌트에 props로 내리는 ref를 forwardRef로 처리했습니다.

### 수

https://github.com/ssafy-null/fe/pull/3

요약: 명세에 맞게 네이밍 등을 수정하였으며, Spinner, Navbar 등의 컴포넌트를 제작하였습니다.

- 회원가입 상황에서 에러메시지 노출이 가능하게끔 Input 컴포넌트에 기능을 추가했습니다.
- 회원가입 등의 컴포넌트를 명세에 맞게 수정했습니다.
- 공통 컴포넌트를 _app.tsx에 묶었습니다.
- Spinner, Navbar, main, signin 컴포넌트를 제작했습니다.
- 유저 정보를 가져오는 endpoint 요청 함수를 제작했습니다.
- Spinner를 출력시킬 전역 상태를 정의할 uiSlice를 만들었습니다.

### 목

요약: 1주차 회고 문서를 작성하였습니다.

각자 지금까지 진행된 프로젝트를 리뷰하고 Next.js를 좀 더 심도깊게 학습하는 시간을 가졌습니다.

