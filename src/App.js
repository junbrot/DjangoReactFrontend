import './App.css';
import React,{useState,useEffect,useReducer} from 'react';
import axios from 'axios';
import StudyBoard from './components/StudyBoard';
import CreateArticle from './components/CreateArticle';
import ReadOneArticle from './components/ReadOneArticle';
import {useCookies} from 'react-cookie';

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
  }
}

function App() {
  
  const [articles,setArticles] = useState([])
  const[state,dispatch] = useReducer(reducer,initialState)

  const[Id,setId] = useState('')
  const[userId,setUserId] = useState('')
  const[title,setTitle] = useState('')
  const[description,setDescription] = useState('')
  const[location,setLocation] = useState('')
  const[gatherMember,setGatherMember] = useState('')
  
  const[Comments,setComments] = useState([])
  // const[UserWriteComments,setUserWriteComments] = useState([])

  const[token] = useCookies(['mytoken','userId','id'])

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/StudyBoard/`,{
      headers:{
        'Authorization':`Token ${token['mytoken']}`
      }
    })
    .then(resp=>setArticles(resp.data))
  },[])
  
  const CreateBtn = ()=>{
    axios.get(`http://localhost:8000/api/StudyBoard/`,{
      headers:{
        'Authorization':`Token ${token['mytoken']}`
      }
    })
    .then(resp=>setArticles(resp.data))
    .then(()=>dispatch({type:'readMode'}))
  }

  const oneArticleReadBtn = (Id,userId,title,description,userBigCity,userSmallCity,userDetailCity,gatherMember) => {
    
    setId(Id)
    setUserId(userId)
    setTitle(title)
    setDescription(description)
    setLocation(userBigCity+' '+userSmallCity+' '+userDetailCity)
    setGatherMember(gatherMember)
    dispatch({type:'readOneMode'})
    ReadComments(Id)
  }

  const ReadComments = (Id) => {

    axios.get(`http://localhost:8000/api/Comments/${Id}/`,{
      headers:{
        'Authorization':`Token ${token['mytoken']}`
      }
    })
    .then(resp=>setComments(resp.data))
    .catch(errors=>console.log(errors))

    // axios.get(`http://localhost:8000/api/Comments/${Id}/${token['id']}/`,{
    //   headers:{
    //     'Authorization':`Token ${token['mytoken']}`
    //   }
    // })
    // .then(resp=>setUserWriteComment(resp.data))
    // .catch(errors=>console.log(errors))
  }

  const CommentBtn =(comment_textfield)=> {
    
    const newComment = {'StudyBoard_key':Id,'comment_user':token['userId'],'comment_textfield':comment_textfield,'User_key':token['id']}
    axios.post(`http://localhost:8000/api/Comments/`,
    newComment,
    {headers:{'Authorization':`Token ${token['mytoken']}`}}
    )
    .then(resp=>ReadComments(Id))
    .catch(errors=>console.log(errors))
  }

  // console.log(state.mode)

  var header = null;
  var body = null;
  var tail = null;

  if(state.mode === 'readMode'){
    header = <h2>스터디 게시판</h2>;
    body = <div><button className="btn btn-success" onClick={()=>dispatch({type:'createMode'})}>Create Study</button></div>;
    tail = <StudyBoard articles={articles} oneArticleReadBtn={oneArticleReadBtn}/>;
  }
  else if(state.mode === 'createMode'){
    header = <h2>스터디 게시글 생성</h2>;
    body = <div><button className="btn btn-primary" onClick={()=>dispatch({type:'readMode'})}>Show StudyBoard</button></div>;
    tail = <CreateArticle  CreateBtn={CreateBtn}/>;
  }
  else if(state.mode === 'readOneMode'){
    header = <h2>Title : {title}</h2>
    body = <div><button className="btn btn-primary" onClick={()=>dispatch({type:'readMode'})}>Show StudyBoard</button></div>;
    tail = <ReadOneArticle description={description} location={location} 
              gatherMember={gatherMember} Comments={Comments} CommentBtn={CommentBtn}/>
  }

  return (
    <div className="App">
      
      <div className="row">
        <div className="d-flex justify-content-center">
        {header}
        </div>
      </div>

      <div className="row">
        <div className="d-flex justify-content-end">
        {body}
        </div>
      </div>
      
      <br/>
      {tail}
    </div>
  );
}

export default App;
