# 🤼‍♂️ 팀(친)구: 팀구하기

<div align=center>
	<a href="https://teamgu.co.kr/">
		<img src="FE/public/logo.png" width="320px">
  	</a>
  <h3>효율적으로 팀구하자</h3>
</div>
<br/>

## 🧷 Link

<div align=center>
	<a href="https://github.com/team-gu/service/pulls?q=is%3Apr+">
		<img src="http://mne.tools/mne-bids/assets/GitHub.png" height="50px">
	</a>
	<a href="https://determined-stonebraker-d1dfc9.netlify.app/">
		<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--A-93deMc--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/or34romslob844gmmv90.png" height="50px">
	</a>
	<a href="https://www.youtube.com/watch?v=J9ycKogF9Jo&feature=youtu.be">
		<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1004px-Logo_of_YouTube_%282015-2017%29.svg.png" height="50px">
	</a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/10fbd5a5-b7d9-486a-af29-1670e61ffbb5/deploy-status)](https://nifty-jepsen-f8bdc1.netlify.app/)

</div>

## 서비스설명/주요기능

소개-소통-구성-관리까지 팀빌딩 모든 과정을 팀구에서 해결하자!

SSAFY 교육생으로써 WebEx, Mattermost, Google Sheet 를 오가며 팀 빌딩을 하는 과정에서 겪었던 불편함을 팀구 하나로 모두 개선하고, 관리자의 관제 시스템을 직관적으로, 문서화 작업을 반자동화 함으로써 사용자와 관리자 모두에게 편리함을 제공해주는 서비스입니다.

## 주요기술스택

- FE: Nextjs(React), TypeScript, Storybook, Redux(react-redux, toolkit), styled-components
- BE: SpringBoot, Stomp, SpringSecurity, Java, Apache POI, JPA, MySQL, WebRTC(OpenVidu), Docker, Jenkins, AWS EC2, AWS RDS, Redis

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
