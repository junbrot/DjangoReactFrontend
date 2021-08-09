import './App.css';
import React,{useState,useEffect,useReducer} from 'react';
import axios from 'axios';
import StudyBoard from './componenets/StudyBoard';
import CreateArticle from './componenets/CreateArticle';
import ReadOneArticle from './componenets/ReadOneArticle';

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

  const[userId,setUserId] = useState('')
  const[title,setTitle] = useState('')
  const[description,setDescription] = useState('')
  const[location,setLocation] = useState('')
  const[gatherMember,setGatherMember] = useState('')
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/StudyBoard/`,{
      headers:{
        'Authorization':`Token 0d6702b069c67a208999afb48b59d6e65593ea35`
      }
    })
    .then(resp=>setArticles(resp.data))
  },[])
  
  const CreateBtn = ()=>{
    axios.get(`http://localhost:8000/api/StudyBoard/`,{
      headers:{
        'Authorization':`Token 0d6702b069c67a208999afb48b59d6e65593ea35`
      }
    })
    .then(resp=>setArticles(resp.data))
    .then(()=>dispatch({type:'readMode'}))
  }

  const oneArticleReadBtn = (userId,title,description,userBigCity,userSmallCity,userDetailCity,gatherMember) => {
    setUserId(userId)
    setTitle(title)
    setDescription(description)
    setLocation(userBigCity+' '+userSmallCity+' '+userDetailCity)
    setGatherMember(gatherMember)
    dispatch({type:'readOneMode'})
  }

  console.log(state.mode)

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
    console.log(userId,title,description,location,gatherMember)
    header = <h2>Title : {title}</h2>
    body = <div><button className="btn btn-primary" onClick={()=>dispatch({type:'readMode'})}>Show StudyBoard</button></div>;
    tail = <ReadOneArticle description={description} location={location} gatherMember={gatherMember}/>
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
