# Attendence Management System: Frontend

# Demo 

## 0. 공통
### 0-a. 로그인 화면
![login](https://user-images.githubusercontent.com/76427521/120201549-8a6d4d00-c260-11eb-9efb-7dc9ceea6a94.PNG)
> - 사이트에 접속하면 나오는 초기화면</br>
> - 이미 회원가입 되어있는 사용자는 e-mail과 password를 입력하여 로그인, 아닐 경우 회원가입 클릭하여 계정등록 진행

### 0-b. 회원가입 - 학생(Student)/교사(Teacher) 선택
![signup](https://user-images.githubusercontent.com/76427521/120201639-a07b0d80-c260-11eb-8214-3ce75858771f.PNG)
> - 회원가입시에 학생(Student)/교사(Teacher)을 선택할 수 있다.
___
## 1. 교사

### 1-a. 회원가입(교사용)
![signup-t](https://user-images.githubusercontent.com/76427521/120205048-79263f80-c264-11eb-9900-ef7f26b790e4.PNG)
> - 이메일 인증을 통한 회원가입 구현. `@cau.ac.kr` 형식의 메일만 인증 가능하다.
</br>

![signtup-t인증](https://user-images.githubusercontent.com/76427521/120205086-85aa9800-c264-11eb-8827-f6f00b2efa80.PNG)
> - 데모버전이므로 실제로 메일이 발송되지는 않는다. `000000`을 입력하면 인증에 성공한다.
</br>

### 1-b. 나의 수업 조회(교사용)
![교사수업-초기](https://user-images.githubusercontent.com/76427521/120206490-37969400-c266-11eb-87dd-134270d4dc46.PNG)
> - 로그인에 성공한 후의 첫 화면</br>
> - 사용자(교사)가 담당하고 있는 수업 목록이 출력된다.
</br>

### 1-c. 수업추가(교사용)
![교사-수업추가 팝업](https://user-images.githubusercontent.com/76427521/120205160-9955fe80-c264-11eb-9b16-8ace67699446.PNG)
> - 수업추가 버튼을 클릭하면 나오는 팝업화면
</br>

![교사-수업추가팝업입력](https://user-images.githubusercontent.com/76427521/120205198-a377fd00-c264-11eb-91da-f2b443381bec.PNG)
> - 교시는 `시간추가`를 통하여 추가할 수 있다.
</br>

![교사-수업추가완료](https://user-images.githubusercontent.com/76427521/120205845-65c7a400-c265-11eb-8541-4c500b81c1e9.PNG)
> - 수업추가가 완료되면 `나의 수업 조회` 페이지에서 추가한 수업을 확인할 수 있다.
</br>

### 1-d. 차시선택 팝업-출석체크 클릭시(교사용)
![교사-차시입력팝업](https://user-images.githubusercontent.com/76427521/120205251-b4c10980-c264-11eb-89b9-d3eef65821ca.PNG)
> - 수업의 출석체크 버튼을 클릭하면 몇 차시의 출석체크를 진행할 것인지를 묻는 팝업이 나온다.
</br>

### 1-e. 수업상세 페이지(교사용)
![교사-수업상세페이지](https://user-images.githubusercontent.com/76427521/120205277-bdb1db00-c264-11eb-9e31-84b0e18bbaaf.PNG)
> - 차시를 선택하고 확인버튼을 누르면 출석체크를 할 수 있는 `수업상세페이지`로 들어오게 된다.<br>
> - 이 수업을 수강하는 모든 학생의 목록을 볼 수 있으며, 각 버튼을 통해 `출석/결석/지각/기타` 로 출결체크가 가능하다.
</br>

___
## 2. 학생

### 2-a. 회원가입(학생용)
![signup-s](https://user-images.githubusercontent.com/76427521/120205300-c5717f80-c264-11eb-9535-a4dbeaa302d6.PNG)
> - 교사용의 가입화면과 달리 `학년/반/번호` 를 입력하는 폼이 존재한다.<br>
> - 이메일 인증은 교사용과 동일하다.
</br>

### 2-b. 나의 수업 조회(학생용)
![학생수업-초기](https://user-images.githubusercontent.com/76427521/120205337-d15d4180-c264-11eb-9364-ea647a608311.PNG)
> - 학생으로 로그인하면 나오는 초기 화면
> - 사용자가 수강하고 있는 수업목록을 확인할 수 있다.
</br>

### 2-c. 수강신청(학생용)
![학생-수업목록](https://user-images.githubusercontent.com/76427521/120205450-ee921000-c264-11eb-8c26-662c32870152.PNG)
> - `수강신청`페이지에 들어오면 교사들이 개설한 수업목록(학교에 개설된 모든 수업목록)을 볼 수 있다.<br>
> - 오른쪽 `신청`버튼을 통해 수강신청이 가능하다.
</br>

![학생-수강신청팝업](https://user-images.githubusercontent.com/76427521/120205476-f5b91e00-c264-11eb-8f96-6b270056c00a.PNG)
> - `신청`버튼을 누르면 신청을 확인하는 팝업이 나온다.
</br>

![학생-수업목록(추가후)](https://user-images.githubusercontent.com/76427521/120205506-fe115900-c264-11eb-9ad9-42a01b27ee0c.PNG)
> - 수강신청에 성공하면 `나의 수업 조회`페이지에서 수업목록에 추가된 것을 확인할 수 있다.
