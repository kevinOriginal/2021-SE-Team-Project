# Attendance Management System
![교사-수업상세페이지](https://user-images.githubusercontent.com/76427521/120205277-bdb1db00-c264-11eb-9e31-84b0e18bbaaf.PNG)
## Contents
### - [1st Checkpoint](#1st-Checkpoint)
 - [Problem Statement](#problem-statement)
 - [Sub-Group](#sub-group)
 - [Requirements (Stories)](#1-requirements-stories)
 - [Use Case](#2-use-case)
 - [Domain Model](#3-domain-model)
### - [2nd Checkpoint](#2nd-Checkpoint)
 - [System Design Document(SDD)](#1-system-design-documentsdd)
### - [3rd Checkpoint](#3rd-Checkpoint)
 - [UI](#1-ui)
 - [ERD](#2-erd)

### - Frontend & Server READ.ME
- [Frontend](/frontend/README.md)
- [Server](/server/README.md)


## Contributors

|  이름  |   학번   |   Github ID   | 비고 |
| :----: | :------: | :-----------: | :--: |
| 김지혜 | 20161863 |  jihye-kim11  |
| 박종혁 | 20185536 |    jjonyo     |  PM  |
| 윤진호 | 20161676 |  jhyoon9705   |
| 이한용 | 20151322 |    lhy0718    |
| 정나린 | 20180396 |    jnl1128    |
|  진겸  | 20153031 | kevinOriginal |


## Demo

### Live Demo 접속하기 

- Frontend - https://hardcore-kirch-ce6c93.netlify.app/
  
- Backend - https://sw-engineering.festa.dev/api/swagger/
  REST API로 구상을 했기 때문에 restful api 의 각각의 api를 테스트 해볼 수 있다. 현재 AWS 위에 올라가있다.



### Local 에서 실행을 하는 방법 

클라이언트(Web)은 Node.js 위에서, 서버와 DB는 운영체제에 상관없이 는 docker 위에서 돌아가므로 다음 환경만 갖추고 있으면 된다.

#### 미리 설치 해야 할 것

- Node.js 14 이상 & npm
- yarn 1.0 이상
- Docker Deskop
- docker-compose

1. yarn 이 깔려있지 않다면, 다음 명령어를 실행합니다.

```bash
# 아무대서나 실행 가능
$ npm install -g yarn
```

**yarn을 깔 때 빼곤 `npm` 명령어를 사용할 일이 없으니 유의해주세요.**



#### Docker 컨테이너를 통해 서버와 DB를 띄우는 방법

2. yarn 및 docker-compose 가 잘 설치 되었나 확인

```bash
$ yarn --version
1.22.5 # 이렇게 버전 명이 뜨면 성공 (꼭 이 버전과 일치하지 않아도 무방)

$ docker-compose --version
docker-compose version 1.29.1, build c34c88b2 # # 이렇게 버전 명이 뜨면 성공 (꼭 이 버전과 일치하지 않아도 무방)
```



3. 패키지 의존성 설치 (package.json이 바뀔 때 마다 해주어야 함 )

```bash
# 루드에 있다는 가정하에 server로 들어감
$ cd ./server

# server 디렉토리 내에서 실행
$ yarn
```

이러면 패키지들이  깔리고, 이미 다 깔려있다면 `Already up to date` 라 뜹니다.



4. Docker compose를 통해 컨테이너를 띄우고 정해진 명령어를 미리 실행해 서버와 디비를 띄웁니다. (따라서 우리는 따로 서버와 디비를 킬 필요가 없음)

```bash
# 주의 프로젝트 루트 디렉토리에서 실행해야함! (/server 이 아닙니다)
$ cd .. # server 내에 있을 때만 이 명령어를 통해 루트로 나온다. (이미 루트면 실행 할 필요 X)
$ docker-compose -f docker-compose.dev.yml up
```



5. 개발을 마치고 종료할 때 (터미널에서 도커 환경을 끄고 싶을 때)

```bash
Ctrl+C 누르면 됨 (Mac & Windows 동일함)
```



#### Node.js 를 사용하여 클라이언트 개발 서버 띄우기

1. 패키지 의존성 설치 (package.json이 바뀔 때 마다 해주어야 함 )

   ```bash
   # 루드에 있다는 가정하에 server로 들어감
   $ cd ./frontend
   
   # server 디렉토리 내에서 실행
   $ yarn
   ```

   이러면 프런트엔드에 필요한 패키지들이  깔리고, 이미 다 깔려있다면 `Already up to date` 라 뜹니다.

2. 해당 디렉토리에서 바로 yarn을 통해 개발 서버를 실행 합니다.

   ```bash
   # 주의 프로젝트 루트 디렉토리에서 실행해야함! (/server 이 아닙니다)
   $ yarn start
   ```

3. 개발을 마치고 종료할 때 (터미널에서 도커 환경을 끄고 싶을 때)

   ```bash
    Ctrl+C 누르면 됨 (Mac & Windows 동일함)
     
   ```

   




## Problem Statement

### Problem and Purpose

코로나-19 바이러스로 인한 비대면 수업이 장기화되었다. 제 4차 감염이 예상되는 가운데, 초중고등학교 학생들은 돌봄 부재 속에 방치되어 있다. 비대면 상황 속에서 교수자, 학부모 학생은 아래와 같은 문제점을 겪고 있다.

1. 교수자는 학생에게 공지사항이 제대로 전달이 되었는지 확인하기 어렵다.
2. 학부모는 자녀의 수업 공지사항을 확인하기 어렵다.
3. 학생은 해당 수업에 출결 처리가 정상적으로 처리되었는지 확인하기 어렵고 수업 참여에 대한 동기부여를 얻기 어렵다.

우리는 교수자, 학부모, 학생 모두가 비대면 상황에서 돌봄 공백을 느끼지 않을 수 있는 서비스가 있었으면 좋겠다. 우리는 교수자가 학생과 학부모에게 공지사항을 일괄 전송하고 확인했는지 여부까지 파악해 소통의 문제를 해결할 수 있기를 원한다. 우리는 학부모가 수업별 공지사항를 교수자로부터 확인받아 자녀에 대한 고민을 덜길 바란다. 마지막으로 우리는 학생들이 수업 참여에 대한 동기부여를 잃지 않고 출석과 과제 참여를 높이기 위한 시스템이 있기를 바란다.

### Scenarios

#### 출결관리 웹

출결관리 웹에 접속함과 동시에 로그인 화면이 뜬다. 이때 로그인을 할 수 있는 사용자는 회원가입이 되어있는 교수자와 학생이다.

교수자 계정으로 로그인할 경우, 미리 등록된 정보에 따라 교수자(사용자)가 담당하고 있는 수업의 목록들이 테이블 형식으로 화면에 뜨기 된다. 교수자는 이 화면에서 `추가`, `수정`, `삭제` 버튼들을 통해 수업 목록에서 수업을 추가, 수정, 삭제할 수 있다. 수업 목록들 중 하나를 클릭하여 들어갈 경우 해당 수업을 수강하고 있는 학생들의 명단이 테이블 형식으로 뜨고, 학생들의 이름 옆에는 학생별로 학생의 당일 출결을 체크할 수 있는 4가지(출석, 결석, 지각, 공결)의 체크박스가 있다. 교수자는 이 체크박스들을 단순히 체크함으로써 학생들의 출결체크가 가능하게 된다.  또한 학생들 목록 중에서 검색을 통해 검색조건(학생 이름 등)에 부합하는 학생만을 따로 출력이 가능하다. 교수자는 학생에게 출결과 관련하여 별점(Star Point)를 부과할 수 있으며, 학생들은 자신의 별점과 학급내 별점 순위의 백분율 값을 확인할 수 있다. 또한 교수는 자신이 담당하는 과목의 목록을 확인할 수 있고, 과목별로 해당 과목을 수강하는 학생들에게 일괄적으로 공지를 보낼 수 있다.

학생은 회원 가입시 학교, 학번, 이름 등의 정보를 서비스에 제공한다. 학생은 자신의 학교에서 개설된 수업 목록 중에서 수강중인 수업을 검색하여 수업 그룹에 들어갈 수 있다. 학생이 그룹 신청을 요청하면 과목을 개설한 교수자의 확인 절차를 통해 신청이 완료 또는 거절된다.

## Sub-Group

| Group     | Desecription                                                                    | Contributor    |
| --------- | ------------------------------------------------------------------------------- | -------------- |
| Auth+Core | 개발 환경 세팅 및 사용자 모델 정의, 사용자가 앱에 로그인 및 회원가입            | 김지혜, 진겸   |
| Teacher   | 학생에 대한 출석 체크, 수업 및 학생 목록, 정보 조회, 출결 결과 및 공지사항 발송 | 이한용, 정나린 |
| Student   | 수업 신청, 개인 출결현황 및 수업참여도 확인                                     | 박종혁, 윤진호 |

------------------------------------------------------------

## 1st Checkpoint

### 0. Meeting logs
  - [210324](/docs/회의록/210324_minutes.md)
  - [210406](/docs/회의록/210406_minutes.md)
  - [210423](/docs/회의록/210423_minutes.md)

### 1. Requirements (Stories)
  - [Core & Auth](/docs/Core/Requirements.md)
  - [Teacher](/docs/Teacher/Requirements.md)
  - [Student](/docs/Student/Requirements.md)

### 2. Use Case
  - [Core & Auth](/docs/Core/UseCases.md)
  - [Teacher](/docs/Teacher/UseCases.md)
  - [Student](/docs/Student/Usecases.md)

  Actor | Actor's Goal | Use Case Name
-|-|-
교수자 | 교수자가 본인임을 인증하고 가입 및 로그인을 할 수 있기 위함 | 교수자 온보딩 (UC-1)
교수자 | 학생들의 출결을 관리 하기 위함 | 출결 관리(UC-2)
교수자 | 학생에게 별점을 부여하거나 뺏기 위함 | 별점 부여 (UC-3)
교수자 | 수업을 만들고 그 정보를 관리하기 위함 | 교수의 수업 관리 (UC-4)
교수자 | 학부모 혹은 학생에게 공지사항을 발송하기 위함 | 공지 발송(UC-5)
교수자 | 자신의 프로필 및 정보를 수정하기 위함 | 교수자정보관리(UC-6)
학생 | 학생이 본인임을 인증하고 가입 및 로그인을 할 수 있기 위함 | 학생 온보딩 (UC-7)
학생 | 나의 이번 학기 수업 목록을 선택해서 그 정보를 보기 위함 | 수업 신청 (UC-8)
학생 | 학생이 수업의 공지 및 출결상태를 확인 하기 위함 | 수업상태확인(UC-9)
학생 | 자신의 프로필 및 정보를 수정하기 위함 | 학생정보관리(UC-10)
교수자,학생 | 지정된 도메인의 메일주소를 가지고 있는지 확인하기 위함 | 교수자 온보딩 (UC-1), 학생 온보딩 (UC-7)
교수자,학생 | 서비스 회원 탈퇴를 하기 위함 | 회원탈퇴(UC-11)
서버 | 학부모가 학생들의 출결상태를 확인하기 위함 | 출결 확인(UC-12)
서버,클라이언트 | 사용자 요청에 대한 유효성 검사 (타입, 범위, URL, ...) | 유효성 검사(UC-13)

### 3. Domain Model
  - [Core & Auth](/docs/Core/DomainModel.md)
  - [Teacher](/docs/Teacher/DomainModel.md)
  - [Student](/docs/Student/DomainModel.md)

-----------------------------------------------------------------
## 2nd Checkpoint

### 0. Meeting logs 
  - [210505](/docs/회의록/210505_minutes.md)
  - [210508](/docs/회의록/210508_minutes.md)

### 1. System Design Document(SDD)

#### Core
  - [Sequence Diagram](/docs/Core/SequenceDiagram.md)
  - [Class Diagram](/docs/Core/Classdiagram.md)

#### Teacher
  - [Sequence Diagram](/docs/Teacher/SequenceDiagram.md)
  - [Class Diagram](/docs/Teacher/Classdiagram.md)

#### Student
  - [Sequence Diagram](/docs/Student/SequenceDiagram.md)
  - [Class Diagram](/docs/Student/ClassDiagram.md)

-----------------------------------------------------------------
## 3rd Checkpoint

### 0. Meeting logs
  - [210519](/docs/회의록/210519_minutes.md)
  - [210522](/docs/회의록/210522_minutes.md)
  - [210531](/docs/회의록/210531(final)_minutes.md)

### 1. UI
  - [UI Mockup](/docs/UI/UI_Mockup.md)



### 2. ERD

  - [ERD](/docs/ERD/ERD.md)


### 3. 기술 스택에 및 활용 방안

- 운영체제에 관계 없이, 그리고 빠른 배포를 위해 docker (가상 환경) 위해서 서버와 DB를 띄우도록 했다. 

- Backend와 Frontend가 유기적으로 개발을 병행 할 수 있도록 둘 다 **한 언어인 JavaScript** 기반으로 코드를 작성 했다. 여기서 더 나아가 서버에서는 **타입 안정성을 보장하기 위해 TypeScript**를 사용했다.

- **SOLID 디자인 패턴**을 최대한 따르기 위해 Node.js runtime 위에서 동작하는 Nest.js 라는 프레임워크를 사용하였다.

  - 다음 과 같은 방식을 서버는 전반적으로 따른다. 

    

    ![image](https://user-images.githubusercontent.com/18115360/120211033-6d8a4700-c26b-11eb-96eb-a287ec58cd95.png)

    

    - User이 route를 접속하면 controller 을 거쳐 알맞는 서비스로 가도록 설계를 하였다.

    ![img](https://docs.nestjs.com/assets/Controllers_1.png)

    - Provider pattern 을 통해 dependency injection 기법을 활용했다.

    ![img](https://docs.nestjs.com/assets/Components_1.png)

- Client - Server 간 쉽게 소통을하고 모듈화된 개발 을 하기 위해 **REST API**를 사용하였으며 swagger 문서화를 통해 테스트를 직접 해볼 수 있게 했다.

- 중복이 사당한 UI가 많아 이에 최적화된 Reusability 가 좋은 View Library 인 **React**를 사용하였다.

- **AWS와 Netlify**를 와 같은 IaaS 를 활용하여, Email 발송, Uri 처리, deveops 처리, deployment 관리를 체계적이고 쉽게 할 수 있었다.  

- Agile 하게 개발을 하게 Open source를 최대한 활용했다.

- 개발 프로세스를 자동 화 하기 위해 CI/CD를 도입. (원래는 develop/staging/master 3 가지 브랜치로 나뉘어야 하나, 프로젝트 규모와 시간 관계상 master 한 브랜치에서만 되도록 했다.)

![hi](https://user-images.githubusercontent.com/18115360/120210323-9c53ed80-c26a-11eb-9047-546a384d40aa.png)

