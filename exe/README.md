# 포팅 메뉴얼

## 1. 배포 환경

### 환경

```
SSAFY에서 제공한 i5a202.p.ssafy.io 서버
작업 경로 : /home/ubuntu/compose/

역할 : 백엔드 자동 CI/CD
```

### /docker-compose.yml

```yaml
version: "3"
services:
  jenkins:
    container_name: jenkins-compose
    build:
      context: jenkins-dockerfile
      dockerfile: Dockerfile
    environment:
      TZ: "Asia/Seoul"
    user: root
    ports:
      - 8000:8080
      - 8888:50000
    volumes:
      - /home/ubuntu/compose/jenkins:/var/jenkins_home
      - /home/ubuntu/.ssh:/root/.ssh
  spring:
    container_name: spring-compose
    restart: on-failure
    build:
      context: spring-dockerfile
      dockerfile: Dockerfile
    environment:
      TZ: "Asia/Seoul"
    ports:
      - 8080:8080
    volumes:
      - /home/ubuntu/compose/jenkins/workspace/teamgu-backend-server/BE/teamgu/build/libs:/deploy
      - /etc/letsencrypt/live/i5a202.p.ssafy.io/keystore.p12:/etc/letsencrypt/live/i5a202.p.ssafy.io/keystore.p12
```

### /jenkins-dockerfile/Dockerfile

```dockerfile
FROM jenkins/jenkins:lts

USER root
RUN apt-get update &&\
    apt-get upgrade -y &&\
    apt-get install -y openssh-client
```

### /spring-dockerfile/Dockerfile

```dockerfile
FROM openjdk:8-jdk

ENTRYPOINT java -jar /deploy/teamgu-0.0.1-SNAPSHOT.jar

EXPOSE 8080
```

### jenkins shell code

```shell
cd BE/teamgu && chmod +x gradlew && ./gradlew clean build
ssh -t -t ubuntu@$(/sbin/ip route | awk '/default/ { print $3 }') <<EOF
	cd /home/ubuntu/compose && docker-compose up --build -d && docker-compose restart spring
	exit
EOF
```

## 2. 프로젝트에서 사용하는 외부서비스 정보 문서

- FE 배포: Netlify
- BE 배포: AWS EC2
- BE DB: AWS RDS
- WebRTC 시그널링: OpenVidu

## 3. 데이터베이스 덤프 파일

> [dump.sql](./dump.sql)

## 4. 시연 시나리오

### 팀원을 구하는 과정

팀장 역할 : A

섭외하려는 사람 : B

공통 프로젝트가 끝난 시점에 A는 팀원을 구하기 위해 팀구를 사용

A는 팀구에 로그인, 팀풀에 들어가서 원하는 느낌의 팀을 만들기 시작

팀 이름과 팀 소개는 이목을 끌만한 걸로 작성

- 본인이 원하는 트랙을 작성
- 여기서 선택 할 수 있는 트랙은 팀 만들기 이전에 왼쪽 필터에서 선택한 프로젝트에 할당되어진 트랙만 선택가능

추가적으로 본인이 추구하는 기술 스택을 나열 ( 타이핑과 펼쳐지는 셀렉트 박스에서 선택 가능 )

인력풀로 이동해서 특화 → 트랙을 선택 → 기술 스택 선택 후 나오는 인원들 하나씩 확인

확인 하면서 돋보이는 자기소개, 기술 스택이 본인이 추구하는 바와 딱 맞는 사람 B에게 관심이 간다

그 사람과 얘기를 해보기 위해 오른쪽 하단의 채팅을 켜서 채팅 초대

B화면에서 뜨는 채팅 알림

채팅 안에서

A는 간단한 인사(채팅) 후, 진솔한 대화를 위해 화상채팅을 요청한다.

B는 그에 응한다.

화상채팅 내에서

A는 팀에 대해서 소개하고

B는 생각해보고 답하겠다고 하고 나간다.

B는 팀풀에서 팀에 대한 정보를 확인하고, 구성원에 대해서 확인하고, 팀에 합류하기로 한다.

채팅 안에서

B는 A에게 함께 팀 하고싶다 채팅을 보낸다.

A가 B를 팀에 초대한다.

B는 초대를 수락한다.

### 팀을 구하는 과정

팀을 구하는 입장(인력) : A

팀원을 받는 사람(팀장) : B

공통 프로젝트가 끝난 시점에 A는 특화 프로젝트 팀을 구하기 위해 팀구에 접속

팀풀에 접속, 자동으로 최근 프로젝트(특화)로 필터링된 것을 보고 감탄

본인이 할 수 있는 스킬을 필요로 하는 팀들을 보기 위해 스킬 필터링 시작

C, C++, MySQL 등 다양한 스킬 필터를 많이 넣어본다

알맞는 팀이 나오지 않자 스킬을 하나씩 줄여본다.

일치하는 팀이 여러개 나온다.

하지만 본인이 원하지 않는 트랙을 하는 팀도 나온다. 이를 위해 본인이 하고 싶은 트랙 필터를 설정.

나온 팀들 중에 본인이 팀원으로 합류하고 싶은 팀카드의 오른쪽 하단에 있는 채팅 버튼을 통해 해당 팀의 팀장인 B와 대화 시작

대화를 진행하는 방식에는 텍스트로 채팅하는 방식과 화상채팅을 통해 서로의 얼굴을 보고 대화하는 두 가지 방법이 존재. 원하는 방법을 선택해서 서로 이야기를 하면 된다.

만약 서로가 생각하는 방향성이 다르다면 그대로 채팅창을 닫고 다른 팀에 컨택하면 된다.

팀장과 얘기하다가 서로의 이해관계가 일치하면 B(팀장)가 A(인력)에게 채팅 박스의 오른쪽 상단에 있는 팀 초대 버튼을 눌러서 A(인력)를 초대한다

A(인력)에게 B(팀장)의 팀원 초대 메시지가 채팅창을 통해 발송되고 A(인력)는 초대 메시지에 수락, 거절 버튼을 통해 팀에 합류 하기/안하기 할 수 있다

팀에 합류된 이후에는 팀풀 페이지의 최상단에 나의 팀에서 합류되었는지를 확인할 수 있다.

### 팀 빌딩 관리

관리자

- 프로젝트를 추가한다.
  - 관리자 계정으로 팀구 페이지에서 접속
  - 프로젝트 관리탭으로 이동
  - 프로젝트 목록 텍스트 옆의 + 버튼을 클릭하여 교육생들이 시행할 프로젝트의 세부사항에 대해 작성
    - 프로젝트 수행할 기수
    - 프로젝트의 구분(공통, 특화, 자율)
    - 해당 프로젝트 내에서 선택 가능한 트랙들을 추가
    - 교육생들에게 보이기 시작할 활성화 날짜
    - 프로젝트가 수행되는 기간을 입력하고 추가 버튼을 눌러 프로젝트 카드 생성
    - 이를 기반으로 아래에서 해당 프로젝트에 참여시킬 교육생들을 import 할 수 있다
- 프로젝트에 참여시킬 교육생 명단을 import
  - [전체 사용자 관리]에서 import
    - 교육생을 한꺼번에 회원가입 시키는 작업으로, 교육생의 계정이 없는 경우에 시행한다.
    - [학번, 이름, 이메일, 전공여부]의 데이터를 담은 엑셀 파일을 업로드한다.
  - [교육생 관리]에서 import
    - 프로젝트에 참여시킬 교육생을 한꺼번에 등록한다.
    - [이메일] 데이터를 담은 엑셀 파일을 업로드한다. 해당 이메일들은 모두 이미 가입된 계정이어야 한다.
- 프로젝트 팀빌딩이 시작되었음을 공지 사항에 등록
  - "X기 XX 프로젝트가 시작되었습니다. 자유롭게 인력풀, 팀풀, 채팅, 화상채팅을 이용하여 팀을 만들어주시기 바랍니다. 이용 안내는 아래와 같습니다...(중략)"
- 대시보드를 통한 교육생들의 팀 구성 현황과 트랙 별 팀 구성을 확인
  - 막대 그래프를 통해 지역 별, 팀구성 현황을 단번에 파악
  - 카운트를 통해 트랙 별, 구성이 완료된 또는 진행중인 팀 개수 파악
  - 하단 표를 통해, 지역, 반, 팀 유무 등을 기준으로 그룹핑하여 본인이 원하는 정보(통계)를 얻어낸다.
- 팀 빌딩 완료 후 교육생 명단을 export
  - 각 교육생에 대한 팀 구성 현황(세로비) 또는 각 팀에 대한 교육생 현황(가로비)에 대해서 한 번의 클릭으로 export한다.
- 관리자는 전체 사용자 관리, 대시보드, 교육생 관리, 팀 관리의 검색창에서 원하는 교육생을

  [ 검색할 수 있다 ]

  - 자동검색을 지원한다
  - 학번, 이름, 이메일, 지역, 반, 등 해당 페이지에서 보여지는 테이블의 모든 컬럼에 대해서 자동검색이 가능하다.

  [ 필터링 할 수 있다 ]

  - 지역, 반, 팀 유무, 팀 번호, 리더 여부, 전공 여부, 희망 포지션에 대해서 필터를 on/off할 수 있다
  - 필터를 선택하는 순서에 따라 순차적으로 필터링된 데이터를 펼치고 접어서 볼 수 있다.
