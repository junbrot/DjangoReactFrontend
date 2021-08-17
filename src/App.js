import './App.css';
import React,{useState,useEffect,useReducer} from 'react';
import StudyBoard from './components/StudyBoard';
import CreateArticle from './components/CreateArticle';
import ReadOneArticle from './components/ReadOneArticle';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom'
import StudyBoardAPI from './API/StudyBoardAPI';
import CommentAPI from './API/CommentAPI';
import ApplicantAPI from './API/ApplicantAPI';
import StudyAPI from './API/StudyAPI';

const initialState={mode:'readMode'}
  
const reducer = (state,action) => {
  switch(action.type){
    case 'createMode':
      return {mode:'createMode'}
    case 'readMode':
      return {mode:'readMode'}
    case 'updateMode':
      return {mode:'updateMode'}
    case 'readOneMode':
      return {mode:'readOneMode'}
    default :
      return {mode:'readMode'}
  }
}

function App() {
  let history = useHistory()
  const [articles,setArticles] = useState([])
  const [article,setArticle] = useState('')
  const[state,dispatch] = useReducer(reducer,initialState)
  const[Comments,setComments] = useState([])
  const[Applicants,setApplicants] = useState([])
  
  const [token,setToken, removeToken] = useCookies(['mytoken','userId','id'])
  const[studyID,setStudyID] = useState('')
  
  useEffect(()=>{

    StudyAPI.getStudyMemberID(token['id'],token['mytoken'])
    .then(resp=>{
      try{
        if(resp.data[0]){
          setStudyID(resp.data[0].Study_key)
        }
      }
      catch{}
    })
    .catch(error=>console.log(error))

    StudyBoardAPI.getStudyBoardList(token['mytoken'])
    .then(resp=>setArticles(resp.data))
    .catch(error=>console.log(error))

  },[token])
  
  const logoutBtn = () => {
    removeToken('id')
    removeToken('userId')
    removeToken('mytoken')
    alert("Logout")
    history.push('/') 
  }

  const MyStudyBtn = () => {
    history.push('/Study')  
  }

  const RefreshBtn = ()=>{
    StudyBoardAPI.getStudyBoardList(token['mytoken'])
    .then(resp=>setArticles(resp.data))
    .then(()=>dispatch({type:'readMode'}))
  }

  const ModifyBtn = (ModifiedArticle) => {

    ModifiedArticle['StudyBoard_key'] = article.StudyBoard_key
    StudyBoardAPI.ModifyBtn(ModifiedArticle,article.StudyBoard_key,token['mytoken'])
    .then(()=>RefreshBtn())
    .catch(errors=>console.log(errors))
  }

  const DeleteBtn = () => {

    StudyBoardAPI.DeleteBtn(article.StudyBoard_key,token['mytoken'])
    .then(()=>RefreshBtn())
    .catch(errors=>console.log(errors))
  }

  const oneArticleReadBtn = (Article) => {
    setArticle(Article)
    dispatch({type:'readOneMode'})
    ReadComments(Article.StudyBoard_key)
    ReadApplicants(Article.StudyBoard_key)
  }

  const ReadComments = (Id) => {
    CommentAPI.ReadComments(Id,token['mytoken'])
    .then(resp=>setComments(resp.data))
    .catch(errors=>console.log(errors))
  }

  const PostCommentBtn =(comment_textfield)=> {
    const newComment = {'StudyBoard_key':article.StudyBoard_key,'comment_user':token['userId'],'comment_textfield':comment_textfield,'User_key':token['id']}
    CommentAPI.PostCommentBtn(newComment,token['mytoken'])
    .then(resp=>ReadComments(article.StudyBoard_key))
    .catch(errors=>console.log(errors))
  }

  const ModifyCommentBtn = (Comment) => {
    CommentAPI.ModifyCommentBtn(Comment,article.StudyBoard_key,Comment.id,token['mytoken'])
    .then(resp=>ReadComments(article.StudyBoard_key))
    .catch(errors=>console.log(errors))
  }

  const DeleteCommentBtn = (comment_id) => {
    CommentAPI.DeleteCommentBtn(comment_id,article.StudyBoard_key,token['mytoken'])
    .then(resp=>ReadComments(article.StudyBoard_key))
    .catch(errors=>console.log(errors))
  }

  const ModifyOneArticleBtn = () => {
    dispatch({type:'updateMode'})
  }

  const ReadApplicants = (Id) => {
    ApplicantAPI.ReadApplicants(Id,token['mytoken'])
    .then(resp=>setApplicants(resp.data))
    .catch(errors=>console.log(errors))
  }

  const ApplicantBtn = () => {

    var info = null;
    StudyBoardAPI.getOneStudyBoard(token['mytoken'],article.StudyBoard_key)
    .then(resp=>info = resp.data)
    .catch(error=>console.log(error))
    .then(()=>{
      if(info.gatherMember > info.ApplyMember)
      {
        var userKey = token['id']
        const newApply = {'StudyBoard_key':article.StudyBoard_key,'apply_user':token['userId'],'User_key':Number(userKey)}
      
        ApplicantAPI.ApplicantBtn(article.StudyBoard_key,newApply,token['mytoken'])
        .then(()=>{
          ReadApplicants(article.StudyBoard_key)
          info['ApplyMember'] += 1 
          StudyBoardAPI.ModifyBtn(info,article.StudyBoard_key,token['mytoken'])
          article.ApplyMember += 1
        })
        .catch(errors=>alert("Register allows only one time"))
      }
      else{
        alert("full")
      }
    })
    
  }

  const FinishGatheringBtn =()=> {
    console.log(Applicants)
    // 나중에 StudyBoard 삭제 기능까지 추가    
    var StudyInfo = {'User_key':Number(token['id']),'title':article.title,'duration':article.duration}
    var Study_id = 0
    ApplicantAPI.PostStudyMaster(StudyInfo,token['mytoken'])
    .then(resp=>Study_id=resp.data['id'])
    .catch(error=>console.log(error))
    .then(()=>FinishGatheringBtn2(Study_id))
  }

  const FinishGatheringBtn2 =(Study_id)=> {
    
    setStudyID(Study_id)
    ApplicantAPI.PostStudyMember(Study_id,Number(token['id']),token['mytoken'])
    .then(()=>FinishGatheringBtn3(Study_id))
    .catch(errors=>console.log("PostStudyMember Error"))
  }

  const FinishGatheringBtn3 = (Study_id) => {

    Applicants.map(Applicant=>{
      return ApplicantAPI.PostStudyMember(Study_id,Applicant.User_key,token['mytoken'])
      .catch(error => console.log(error))
    })
    RefreshBtn()
  }

  var header = null;
  var body = null;
  var tail = null;

  if(state.mode === 'readMode'){
    header = <h2>스터디 게시판</h2>;
    
    if(studyID)
      body = <section id="toMyStudy"><button className="btn btn-primary btn-sm" onClick={MyStudyBtn}>My Study</button></section>;
    else
      body = <section id="CreateStudyBord"><button className="btn btn-success" onClick={()=>dispatch({type:'createMode'})}>Create StudyBoard</button></section>;
      tail = <StudyBoard articles={articles} oneArticleReadBtn={oneArticleReadBtn}/>;
  }
  else if(state.mode === 'createMode'){
    header = <h2>스터디 게시글 생성</h2>;
    body = <section id="ShowStudyBoard"><button className="btn btn-primary" onClick={()=>dispatch({type:'readMode'})}>Show StudyBoard</button></section>;
    tail = <CreateArticle RefreshBtn={RefreshBtn}/>;
  }
  else if(state.mode === 'readOneMode'){
    header = <h2>Title : {article.title}</h2>
    body = <section id="ShowStudyBoard"><button className="btn btn-primary" onClick={()=>dispatch({type:'readMode'})}>Show StudyBoard</button></section>;
    tail = <ReadOneArticle ArticleInfo={article} ModifyOneArticleBtn={ModifyOneArticleBtn}
              Comments={Comments} PostCommentBtn={PostCommentBtn} ModifyCommentBtn={ModifyCommentBtn} DeleteCommentBtn={DeleteCommentBtn}
              Applicants={Applicants} ApplicantBtn={ApplicantBtn} FinishGatheringBtn={FinishGatheringBtn}/>
  }      
  else if(state.mode==='updateMode'){
    header = <h2>스터디 게시글 수정</h2>;
    body = <section id="ShowStudyBoard"><button className="btn btn-primary" onClick={()=>dispatch({type:'readMode'})}>Show StudyBoard</button></section>;
    tail = <CreateArticle ModifyBtn={ModifyBtn} ArticleInfo={article} DeleteBtn={DeleteBtn}/>;
  }

  return (
    <div className="App">
      
      <article id="StudyBoardHead" className="row">
        <section id="LogoutRefreshForStudyBoard"><button className="btn btn-danger btn-sm" onClick={()=>logoutBtn()}>Logout/Refresh</button></section>
        <section id="StudyBoardHeadContent"className="d-flex justify-content-center">
        {header}
        </section>
      </article>

      <article id="StudyBoardBody" className="row">
        <section id="StudyBoardBodyContent" className="d-flex justify-content-end">
        {body}
        </section>
      </article>
      
      <br/>
      <article id="StudyBoardFoot">
      {tail}
      </article>
    </div>
  );
}

export default App;
