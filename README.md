<div align=center>
  <h3>저희 프로젝트는 GitHub에서 관리되었습니다. (아래 아이콘 클릭)</h3>
	<a href="https://github.com/team-gu/service/pulls?q=is%3Apr+">
		<img src="http://mne.tools/mne-bids/assets/GitHub.png" height="100px">
	</a>
</div>

# 🤼‍♂️ 팀(친)구: 팀구하기 [![Netlify Status](https://api.netlify.com/api/v1/badges/10fbd5a5-b7d9-486a-af29-1670e61ffbb5/deploy-status)](https://nifty-jepsen-f8bdc1.netlify.app/)

<div align=center>
  <img src="FE/public/logo.png" width="320px">
  <h3>효율적으로 팀구하자</h3>
</div>
<br/>

## 🧷 Link

<div align=center>
	<a href="https://github.com/team-gu/service/pulls?q=is%3Apr+">
		<img src="http://mne.tools/mne-bids/assets/GitHub.png" height="50px">
	</a>
		<a href="https://team-gu.github.io/service/develop/">
		<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--A-93deMc--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/or34romslob844gmmv90.png" height="50px">
	</a>
		<a href="http://i5a202.p.ssafy.io:8080/swagger-ui/#/">
		<img src="https://s3-us-west-2.amazonaws.com/assertible/integrations/swagger-logo-horizontal.jpeg" height="50px">
	</a>
</div>

## 📝 Code Review

- [스크롤 이벤트에 반응하는 네브바 구성 #14](https://github.com/team-gu/service/pull/14)
- [화상채팅 툴바 구현 #38](https://github.com/team-gu/service/pull/38)
- [공지사항 목록 및 세부사항 조회 완성 #52](https://github.com/team-gu/service/pull/52)
- [SecurityConfig 파일 복원 및 매핑 오류 수정 #56](https://github.com/team-gu/service/pull/56)
- [로그인과 로그아웃을 구현했습니다 #70](https://github.com/team-gu/service/pull/70)

## 🪄 Code Reusability
- [Storybook](https://team-gu.github.io/service/develop/")과 [components 폴더](https://github.com/team-gu/service/tree/develop/FE/components)를 확인해보시면 모든 컴포넌트는 [Atomic Design Pattern](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97) 을 따르고 있습니다.
- [styled-components theme provider](https://github.com/team-gu/service/blob/develop/FE/styles/theme.ts)를 사용하여 자주 사용하는 CSS 코드를 재사용 하고 있습니다.

## 🧷 DB Structure
![KakaoTalk_Photo_2021-07-30-13-36-53](https://user-images.githubusercontent.com/16266103/127600975-c7523bf7-b368-42fb-906f-bdac42bd3279.png)

- 공통 코드 테이블을 이용해 불필요한 관계를 최소화하고 join mapping 테이블을 활용합니다.

## 📌 DevOps
![KakaoTalk_Photo_2021-07-30-13-36-49](https://user-images.githubusercontent.com/16266103/127600970-5d4c5b7b-b217-4036-ac78-4b492dbab210.png)
> 배포 파이프라인

- 스프링 백엔드는 jenkins를 통해 CI/CD 자동 배포가 됩니다.
- 프론트엔드는 [Netlify](https://app.netlify.com/sites/nifty-jepsen-f8bdc1/deploys)를 통해 배포되고 있습니다.
- Storybook은 GitHub Action을 통해 푸시 시점에 GitHub Pages에 배포되도록 [CI 파이프라인](https://github.com/team-gu/service/blob/develop/.github/workflows/deploy-storybook-to-gh-pages.yml)을 구성하였습니다.
- 푸시 시점에 실행되도록 GitHub to GitLab [CI 파이프라인](https://github.com/team-gu/service/blob/develop/.github/workflows/mirror-to-gitlab.yml)을 GitHub Action을 이용해 구성하였습니다.

## 📚 Documents
- [Framer 정리](https://github.com/team-gu/service/wiki/Framer)
- [폰트 단위 크기 비교](https://github.com/team-gu/service/wiki/%ED%8F%B0%ED%8A%B8-%EB%8B%A8%EC%9C%84-%ED%81%AC%EA%B8%B0-%EB%B9%84%EA%B5%90)


## 🗂 Folder Structure
```
.
├── README.md
├── __mocks__
│   ├── next
│   │   ├── image.js
│   │   ├── link.js
│   │   └── router.js
│   └── react-redux.js
├── components
│   ├── atoms
│   │   ├── Icon
│   │   ├── Input
│   │   ├── Text
│   │   └── index.ts
│   ├── molecules
│   │   ├── Button
│   │   ├── ChatBubble
│   │   ├── ChatInput
│   │   ├── Checkbox
│   │   ├── FloatingButton
│   │   ├── Label
│   │   ├── ProfileContainer
│   │   ├── ProfileImage
│   │   ├── Spinner
│   │   ├── Summary
│   │   ├── Tag
│   │   ├── Title
│   │   └── index.ts
│   ├── organisms
│   │   ├── ChatList
│   │   ├── ChatRoom
│   │   ├── ChatRoute
│   │   ├── Footer
│   │   ├── Layout
│   │   ├── LineBackground
│   │   ├── LoginComponent
│   │   ├── Modal
│   │   ├── Navbar
│   │   ├── RegisterComponent
│   │   └── index.ts
│   └── webrtc
│       ├── FloatingChatButton.stories.tsx
│       ├── FloatingChatButton.tsx
│       ├── FloatingCounter.stories.tsx
│       ├── FloatingCounter.tsx
│       ├── OpenViduVideoComponent.tsx
│       ├── SidebarChat.stories.tsx
│       ├── SidebarChat.tsx
│       ├── UserVideoComponent.tsx
│       ├── VideoChat.stories.tsx
│       ├── VideoChat.tsx
│       ├── VideoChatLayout.stories.tsx
│       ├── VideoChatToolbar.stories.tsx
│       ├── VideoChatToolbar.tsx
│       ├── VideoRoomConfigModal.stories.tsx
│       ├── VideoRoomConfigModal.tsx
│       ├── index.ts
│       ├── types
│       └── util
├── context
│   └── serverContext.ts
├── hooks
│   └── useWindow.ts
├── jest.config.js
├── jest.setup.js
├── next-env.d.ts
├── next.config.js
├── package.json
├── pages
│   ├── _app.tsx
│   ├── _documents.js
│   ├── api
│   ├── humanpool
│   ├── index.tsx
│   ├── login
│   ├── main
│   ├── register
│   ├── rtc
│   └── userdetail
├── public
├── repository
│   ├── baseRepository.test.js
│   └── baseRepository.ts
├── store
│   ├── authSlice.test.js
│   ├── authSlice.ts
│   ├── index.ts
│   ├── modalSlice.test.js
│   ├── modalSlice.ts
│   ├── stickySlice.ts
│   ├── uiSlice.test.js
│   └── uiSlice.ts
├── styles
│   ├── globalStyles.ts
│   ├── respondTo.ts
│   ├── styled.d.ts
│   └── theme.ts
├── test
│   └── test-utils.tsx
├── tsconfig.json
├── utils
│   ├── constants.ts
│   ├── snippet.test.js
│   ├── snippet.ts
│   ├── storage.test.js
│   └── storage.ts
└── yarn.lock
```

## 🚀 Feature
WIP
