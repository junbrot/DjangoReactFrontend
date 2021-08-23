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
> 스터디 게시물 중 한개를 클릭할 시, 스터디 상세 보기 페이지로 이동 
