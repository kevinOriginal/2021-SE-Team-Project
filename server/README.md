# Attendence Management System: Server

<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>


[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Prerequistes

- Node.js 14 이상 & npm
- yarn 1.0 이상
- Docker Deskop
- docker-compose



### API가 잘 나왔는지 테스트 하는 방법

다음 url로 접속을 합니다. Swagger 접속 주소:  `localhost:3000/api/swagger`

Swagger이라는 프로그램을 이용하여 현재 서버에 나와있는 모든 api를 보며 테스트 할 수 있습니다. 
`Try It Out` 버튼을 누르면 굳이 postman 같은 툴을 쓰지 않고 swagger 내에서 바로 테스트가 가능합니다.
`Execute` 을 누르면 서버로 request가 전송이 되고, 밑에 Responses 영역에 Response code (200, 400 등) 과 detail이 돌아옵니다. 



### 개발환경 안내

 docker은 가상 컨테이너로, 그 위에서 서버(Node.js ) 및 DB (Postgres) 가 돌아가게 됩니다. 컨테이너 내에서 둘은 연결이 되어 있으며 DB포트 5432, 서버는 포트 3000으로 통신을 합니다. 컨테이너 내에서도 이 포트로 통신하며 컨테이너 외부 (우리 머신과 통신할때도) DB와 서버 둘다 외부로도 노출이 되어있어서 둘다 같은 포트를 쓰면 됩니다. 

DB  생성 및 테이블 새롭게 생성은 어떻게 되나요? 그건 TypeORM 이라는 ORM이 우리가 entity 를 만들고 파일에 저장 할 때 마다 자동으로 해줍니다. 

DB 에 접속할 때 필요한 정보는 모두 .develeopment.env 에 있습니다.

현재 AWS 로 이메일 보내는 기능은 임시로 꺼놨습니다.



### 개발환경 실행 방법

1. yarn 이 깔려있지 않다면, 다음 명령어를 실행합니다.

```bash
# 아무대서나 실행 가능
$ npm install -g yarn
```

**yarn을 깔 때 빼곤 `npm` 명령어를 사용할 일이 없으니 유의해주세요.**



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

이러면 뭐가 여러개 깔리고, 이미 다 깔려있다면 `Already up to date` 라 뜹니다.


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





### 유의 사항

1. 실수로 npm을 써 `npm-lock.json` 파일이 생겼다면 지웁시다.
2. 디렉토리 어디에서 실행 하는지 확인을 꼭 합시다.
3. 



