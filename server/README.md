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



## API-list


### users

#####  이메일 유효성 및 중복 확인(/api/users/email-verification/{email})

- 회원가입시 이메일 인증을 위해 이메일을 입력할 때 사용.

![image-20210531194646817](https://user-images.githubusercontent.com/59490892/120205988-960f4280-c265-11eb-99f6-91f7404d65f0.png)


- cau2@cau.ac.kr 입력 시 유효한 status code(200)가 response된다.

![image-20210531195024849](https://user-images.githubusercontent.com/59490892/120206114-bd660f80-c265-11eb-8c6b-48f9607a0973.png).png)





##### 이메일 인증번호(/api/users/email-validation)

- 회원가입시 이메일로 전송된 이메일 인증번호 확인 시 사용한다. (현재 코드는 000000 으로 통일)

![image-20210531195610667](https://user-images.githubusercontent.com/59490892/120206195-d969b100-c265-11eb-8a64-dc8c36f5b2bb.png)


- status code

![image-20210531200008547](https://user-images.githubusercontent.com/59490892/120206244-eab2bd80-c265-11eb-9c0e-28fd9c4cb5a8.png)


- 인증코드를 정상적으로 입력하였을때의 결과값이다.  email string이 유효하며 code string=000000이므로 status code(200)이고 True

![image-20210531195754652](https://user-images.githubusercontent.com/59490892/120206277-f69e7f80-c265-11eb-909a-3b01714dc9d3.png)


- 인증코드를 잘못 입력하였을때의 결과값이다. email string이 유효하며 code string=111111이므로 status code(200)이고 False. 
- 
![image-20210531182335055](https://user-images.githubusercontent.com/59490892/120206297-fdc58d80-c265-11eb-8c24-47c76cb9699c.png)

### auth
##### 회원가입(/api/auth/sign-up)

- 회원가입시 사용되는 api

- role,email,password,fullName,grade,classnumber,studentNumber,phone을 request한다.

![image-20210531225155611](https://user-images.githubusercontent.com/59490892/120206391-1c2b8900-c266-11eb-90a0-fc05e7680133.png)


- 정상적으로 회원가입이 완료된 경우 status code(200)가 response된다.

![image-20210531203611613](https://user-images.githubusercontent.com/59490892/120206367-1766d500-c266-11eb-8607-4340849fb569.png)





##### 로그인(/api/auth/login)

- 로그인에 사용되는 api

- request: email/password를 전송하여 request

![image-20210531225132344](https://user-images.githubusercontent.com/59490892/120206424-25b4f100-c266-11eb-9388-d09074c3979e.png)


- response: id,role,email,fullName,grade,classnumber,studentNumber,phone response

- 정상적으로 로그인이 완료된 경우 status code(200)가 response된다.

![image-20210531201123841](https://user-images.githubusercontent.com/59490892/120206521-43825600-c266-11eb-86aa-d0b5f519060a.png)






##### 로그아웃(/api/auth/logout)

- 로그아웃에 사용되는 api
- 정상적으로 로그아웃이 완료된 경우 status code(201)가 response된다.

![image-20210531182525311](https://user-images.githubusercontent.com/59490892/120206537-49783700-c266-11eb-8ae4-557ef0d9d9a5.png)



##### 내 정보 조회(/api/auth/me)

- 현재 로그인 되어있는 user의 정보를 불러와 데이터값을 조회하는 경우 사용된다.
- 정상적으로 조회된 경우 status code(200)과 함께 user의 데이터 값이 response된다.

![image-20210531203718633](https://user-images.githubusercontent.com/59490892/120206576-539a3580-c266-11eb-8c71-134032174abe.png)





##### 탈퇴(/api/auth)

- 회원 탈퇴시 사용된다.
- 정상적으로 회원 탈퇴된 경우 status code(200)가 response된다.

![image-20210531201628363](https://user-images.githubusercontent.com/59490892/120206587-58f78000-c266-11eb-8da9-45c49673f10c.png)






### lecture
##### 전체 수업 리스트 조회(/api/lecture)

- 학생이 수강신청을 할 때 필요한 리스트를 반환해주는 api이다.
- page,pagesize,order 값을 설정하여 반환되는 데이터의 수와 정렬 방식을 조정해줄 수 있다.
- 정상적으로 데이터가 조회된 경우 status code(200)와 함께 현재 조회가능한 lecture list가 response된다.

![image-20210531193347608](https://user-images.githubusercontent.com/59490892/120206599-5d239d80-c266-11eb-8555-2cc6be046e07.png)



##### 수업 개설(/api/lectures)

- TEACHER가 본인이 강의할 수업을 개설할 때 사용된다.

- 현재 login되어있는 user의 role='TEACHER'일 경우에만 사용된다

- lectureName(강의명),grade,lectureCode,lectureTime(수업시간)을 request한다.

![image-20210531225327147](https://user-images.githubusercontent.com/59490892/120206616-63b21500-c266-11eb-8578-9cfd6baf7d46.png)

![image-20210531203823541](https://user-images.githubusercontent.com/59490892/120206731-847a6a80-c266-11eb-9081-1658ab424a80.png)


- 정상적으로 강의가 개설된 경우 status code(200)가 response된다.

![image-20210531203833420](https://user-images.githubusercontent.com/59490892/120206692-7a586c00-c266-11eb-8723-6d62329752b6.png)







##### 수강 신청(/api/lectures/{lectureId})

- 학생이 수강할 lecture를 수강신청할 때 사용된다.

- 학생이 수강신청 하고자 하는 lectureId값을 request한다.

- 정상적으로 강의가 개설된 경우 status code(200)가 response된다.

![image-20210531205114051](https://user-images.githubusercontent.com/59490892/120206767-8fcd9600-c266-11eb-88d5-cdaf9213e466.png)


- responese body 부분에서 수강신청을 진행한 student의 데이터가 "users" 리스트에 추가되었음을 확인할 수 있다.

![image-20210531205143007](https://user-images.githubusercontent.com/59490892/120206787-952ae080-c266-11eb-8957-0b9ba2e3cdc6.png)







##### user 수업 리스트 조회(/api/lectures/users/{userId})

- Teacher/Student가 현재 본인이 강의/수강하고 있는lecture 목록을 조회할 때 사용된다
- 정상적으로 수업이 조회된 경우 status code(200)와 lecture list가 response된다.

![image-20210531193644709](https://user-images.githubusercontent.com/59490892/120206817-9d831b80-c266-11eb-80d3-9f9c7a7d24a8.png)



### attendence
##### 출석체크(/api/attendence)

- 교수가 학생의 출석체크를 진행할 때 사용된다.

- CreateAttendanceDto는 userId(학생ID),lectureId(수업ID),nth(수업차시),check(출결현황)으로 이루어져있다.

- check는 ATTENDED/ABSENT/TARDY/ETC 총 4가지 값 중 1가지로 이루어져야한다.

![image-20210531225714077](https://user-images.githubusercontent.com/59490892/120206853-abd13780-c266-11eb-9bb6-23ed8c1dbf8e.png)


- 다음은 check에 'ABSENT'를 넣어 request했을때의 결과이다.

![image-20210531230053631](https://user-images.githubusercontent.com/59490892/120207311-3b76e600-c267-11eb-9b06-33dc3116c122.png)

- 정상적으로 출석체크가 완료되어 status code(200)와 response된다.

![image-20210531225051730](https://user-images.githubusercontent.com/59490892/120206990-d3280480-c266-11eb-8f61-531c52cba7c9.png)


- 다음은 check에 null값을 넣어 request했을때의 결과이다.

![image-20210531182124067](https://user-images.githubusercontent.com/59490892/120206962-c86d6f80-c266-11eb-8a01-10ce03e7206b.png)


- status code(500)와 response된다.

![image-20210531225216255](https://user-images.githubusercontent.com/59490892/120206986-cf947d80-c266-11eb-9ca5-0ff915d8b070.png)

