## 비대면 스터디 모집 게시판과,  스터디 협업툴을 제공하는 웹어플리케이션

<br/>

### 1. login   

<br/>


backend :  
> Django에서 제공하는 User authentication을 사용,
>     
> REST framework의 TokenAuthentication을 통한 인증

<br/>

frontend :
> id,password 입력창, login버튼, 계정생성 버튼 구현. 
> 
> 한번 login시 react-cookie를 통해 token쿠키가 저장되고,
>
> 다시 로그인 시 token이 존재하면, 로그인 없이 스터디 게시판으로 넘어감

<br/>

<br/>

### 2. studyboard(스터디 모집 게시판)   

<br/>

+ 스터디 게시판 초기 화면

<br/>

backend :  
> api 통신은 django-cors-headers를 사용해 local과 통신 확인
>     
> sqlite에 StudyBoard 모델 생성, django rest_framework의 serializer를 통한 직렬화
>
> rest_framework.decorators의 APIView를 통한 view 구현
>

<br/>

frontend :
> 스터디 게시판 목록은 
> 
> 1. 스터디를 생성한 유저 id
> 2. 스터디 title
> 3. 모집 인원 
> 4. 지원자 수 
> 5. upload한 날짜 
> 6. 스터디 기간 
> 
> 으로 구성
>
> logout버튼 구현
>
> 스터디 생성 버튼 구현 
>
> 스터디 게시물 중 한개를 클릭할 시, 스터디 상세 보기 페이지로 이동 

<br/>

<br/>

+ 스터디 생성

<br/>

frontend :
> 
> 1. 제목
> 2. 스터디 내용
> 3. 모집 인원 
> 4. 기간
> 으로 구성
>
> Submit 버튼을 클릭할 시 스터디가 생성 되고, 스터디 게시판 화면으로 이동
>
> 스터디 게시판 화면으로 이동하는 Show StudyBoard 버튼 구현
>
> logout 버튼 구현


<br/>

<br/>

+ 스터디 상세 보기 페이지

<br/>

backend :  
> 댓글을 위한 Comment 모델,
> 
> 스터디 지원자를 받는 Applicant 모델
>
> Study 모집이 완료되면, 신청한 인원들과 생성한 인원을 포함시키는 StudyMember 모델,
>
> Study의 생성 시간 및 Study 기간, 제목을 포함시키는 Study 모델 구현
>
>

<br/>

frontend :
> 1. 제목
> 2. 스터디 내용
> 3. 모집 인원
> 4. 지원자 수
> 5. 스터디 기간
> 6. 모집 마감일 (스터디 생성 10일이 지나면 자동으로 모집 마감)
>
> 로그아웃 버튼, 스터디 게시판 목록 페이지로 이동 버튼 구현
> 
> 스터디 생성자일 경우, 스터디 모집 수정버튼과, 모집 마감 버튼 표시
>
> 댓글 입력, 자신이 입력한 댓글 수정 및 삭제 기능 구현
>
>
>
>
