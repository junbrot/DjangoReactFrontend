## 비대면 스터디 모집 게시판과,  스터디 협업툴을 제공하는 웹어플리케이션

#### 1. login   


backend :  
> Django에서 제공하는 User authentication을 사용,    
> REST framework의 TokenAuthentication을 통한 인증



frontend :
> id,password 입력창, login버튼, 계정생성 버튼 구현. 
> login시 token은 react-cookie의 useCookie를 통해 쿠키가 저장되고, 
> 다시 로그인 시 token이 존재하면, 로그인 없이 스터디 게시판으로 넘어감


