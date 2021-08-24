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
> 댓글을 위한 Comment 모델 (StudyBoard 모델을 foreignkey로 가짐)
> 
> 스터디 지원자를 받는 Applicant 모델 (StudyBoard 모델을 foreignkey로 가짐)
>
> Study 모집이 완료되면, 신청한 인원들과 생성한 인원을 포함시키는 StudyMember 모델 (Study 모델을 foreignkey로 가짐)
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

<br/>

<br/>

+ 스터디 모집 마감 버튼 클릭시 

<br/>

backend :  
> 
> 
> Study 모델에 새로운 Study 생성
>
> 모집 인원과 스터디 생성자 정보가 StudyMember 모델에 생성 
> 
> 그 후 스터디 모집 공고를 삭제
>
>

<br/>

frontend :
> 진행중인 스터디가 있을 시, 스터디 게시판 목록의 스터디 생성 버튼이 MyStudy 버튼으로 출력
>
> MyStudy 버튼을 클릭할 시 생성된 Study로 이동
>
> 진행중인 스터디가 있을 시, 다른 스터디에 지원 기능과 스터디 생성 기능 사용이 제한됨. 
>



<br/>

<br/>

### 3. Study(스터디)   

<br/>

+ 스터디 상단 부분

<br/>

frontend :
> 스터디 제목 표시
>
> logout 버튼 구현 
>
> 스터디 게시판으로 이동할 수 있는 StudyBoard 버튼 구현
>
> 스터디 생성자의 경우 스터디의 제목을 수정할 수 있는 modify title 버튼 표시
>

<br/>

<br/>

+ 스터디 플레너 

<br/>

backend :  
>
> 1. StudyPlanner 모델
> 
> 스터디 id와 user id를 foreign key로 가지고, title 필드를 가짐
>
> 2. StudyPlannerComponent 모델
> 
> 스터디 id, user id, StudyPlanner id를 foreign key로 가지고
>
> 제목, 시작시간, 기간, 성공여부를 표현하는 필드를 가짐
>

<br/>

frontend :
>
> StudyPlanner를 생성할 수 있는 Create Study Planner 버튼 구현
> 
> 1. All StudyPlanners
> 
>> 각각의 StudyPlanner는 title과 생성한 사람의 id를 표시.
>>
>> 자신이 생성한 StudyPlannerComponent는 title, 유저 이름, 시간이 표시 되고, 
>>
>> Success와 Fail 버튼이 표시됨. 
>>
>> 둘중 하나를 클릭할 시 버튼이 사라지고, Success or Fail 글자만 영구적으로 표시됨
>>
>> StudyPlanner 생성자인 경우 Planner를 삭제하는 delete버튼 표시
>
> 2. See detail
> 
>> 하나의 StudyPlanner에 대한 상세 정보를 볼 수 있는 See detail 버튼 구현
>>
>> See detail 클릭시 하나의 클릭한 StudyPlanner의 정보만 화면에 표시
>>
>> 성공 실패 여부를 표시할 수 있는 Success, Fail 버튼과 
>> 
>> 자신이 생성한 StudyPlannerComponent를 수정, 삭제할 수 있는 버튼 구현
>>
>> StudyPlannerComponent를 생성할 수 있는 Add Plan버튼 구현
>>
>> All StudyPlanners 모드로 돌아갈 수 있는 See Planners 버튼 구현
>> 
>> StudyPlanner 생성자인 경우 Planner의 제목을 수정할 수 있는 Modify Title 버튼 표시
>>
>>
>>
>>
>>


