# π€ΌββοΈ ν(μΉ)κ΅¬: νκ΅¬νκΈ°

<div align=center>
	<a href="https://teamgu.co.kr/">
		<img src="FE/public/logo.png" width="320px">
  	</a>
	<p> β demo page </p>
  <h3>ν¨μ¨μ μΌλ‘ νκ΅¬νμ</h3>
</div>
<br/>

## π§· Link

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

## μλΉμ€μ€λͺ/μ£ΌμκΈ°λ₯

μκ°-μν΅-κ΅¬μ±-κ΄λ¦¬κΉμ§ νλΉλ© λͺ¨λ  κ³Όμ μ νκ΅¬μμ ν΄κ²°νμ!

SSAFY κ΅μ‘μμΌλ‘μ¨ WebEx, Mattermost, Google Sheet λ₯Ό μ€κ°λ©° ν λΉλ©μ νλ κ³Όμ μμ κ²ͺμλ λΆνΈν¨μ νκ΅¬ νλλ‘ λͺ¨λ κ°μ νκ³ , κ΄λ¦¬μμ κ΄μ  μμ€νμ μ§κ΄μ μΌλ‘, λ¬Έμν μμμ λ°μλν ν¨μΌλ‘μ¨ μ¬μ©μμ κ΄λ¦¬μ λͺ¨λμκ² νΈλ¦¬ν¨μ μ κ³΅ν΄μ£Όλ μλΉμ€μλλ€.

## μ£ΌμκΈ°μ μ€ν

- FE: Nextjs(React), TypeScript, Storybook, Redux(react-redux, toolkit), styled-components
- BE: SpringBoot, Stomp, SpringSecurity, Java, Apache POI, JPA, MySQL, WebRTC(OpenVidu), Docker, Jenkins, AWS EC2, AWS RDS, Redis

## πͺ Code Reusability

- [Storybook](https://team-gu.github.io/service/develop/")κ³Ό [components ν΄λ](https://github.com/team-gu/service/tree/develop/FE/components)λ₯Ό νμΈν΄λ³΄μλ©΄ λͺ¨λ  μ»΄ν¬λνΈλ [Atomic Design Pattern](https://medium.com/@janelle.wg/atomic-design-pattern-how-to-structure-your-react-application-2bb4d9ca5f97) μ λ°λ₯΄κ³  μμ΅λλ€.
- [styled-components theme provider](https://github.com/team-gu/service/blob/develop/FE/styles/theme.ts)λ₯Ό μ¬μ©νμ¬ μμ£Ό μ¬μ©νλ CSS μ½λλ₯Ό μ¬μ¬μ© νκ³  μμ΅λλ€.

## π§· DB Structure

![KakaoTalk_Photo_2021-07-30-13-36-53](https://user-images.githubusercontent.com/16266103/127600975-c7523bf7-b368-42fb-906f-bdac42bd3279.png)

- κ³΅ν΅ μ½λ νμ΄λΈμ μ΄μ©ν΄ λΆνμν κ΄κ³λ₯Ό μ΅μννκ³  join mapping νμ΄λΈμ νμ©ν©λλ€.

## π DevOps

![KakaoTalk_Photo_2021-07-30-13-36-49](https://user-images.githubusercontent.com/16266103/127600970-5d4c5b7b-b217-4036-ac78-4b492dbab210.png)

> λ°°ν¬ νμ΄νλΌμΈ

- μ€νλ§ λ°±μλλ jenkinsλ₯Ό ν΅ν΄ CI/CD μλ λ°°ν¬κ° λ©λλ€.
- νλ‘ νΈμλλ [Netlify](https://app.netlify.com/sites/nifty-jepsen-f8bdc1/deploys)λ₯Ό ν΅ν΄ λ°°ν¬λκ³  μμ΅λλ€.
- Storybookμ GitHub Actionμ ν΅ν΄ νΈμ μμ μ GitHub Pagesμ λ°°ν¬λλλ‘ [CI νμ΄νλΌμΈ](https://github.com/team-gu/service/blob/develop/.github/workflows/deploy-storybook-to-gh-pages.yml)μ κ΅¬μ±νμμ΅λλ€.
- νΈμ μμ μ μ€νλλλ‘ GitHub to GitLab [CI νμ΄νλΌμΈ](https://github.com/team-gu/service/blob/develop/.github/workflows/mirror-to-gitlab.yml)μ GitHub Actionμ μ΄μ©ν΄ κ΅¬μ±νμμ΅λλ€.

## π Documents

- [Framer μ λ¦¬](https://github.com/team-gu/service/wiki/Framer)
- [ν°νΈ λ¨μ ν¬κΈ° λΉκ΅](https://github.com/team-gu/service/wiki/%ED%8F%B0%ED%8A%B8-%EB%8B%A8%EC%9C%84-%ED%81%AC%EA%B8%B0-%EB%B9%84%EA%B5%90)
