import React,{useEffect,useState,useCallback, useReducer} from 'react'
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom'
import StudyPlannerAPI from '../API/StudyPlannerAPI';
import StudyAPI from '../API/StudyAPI';
import StudyHead from './StudyHead';
import StudyPlannersComp from './StudyPlannersComp';
import OneStudyPlannerComp from './OneStudyPlannerComp';
import MyStudyPlannersComp from './MyStudyPlannersComp';
import StudyCommentAPI from '../API/StudyCommentAPI';
import StudyCommentComp from './StudyCommentComp';
import StudyCalendar from './StudyCalendar';

const initialState={mode:'StudyPlanners'}
  
const reducer = (state,action) => {
  switch(action.type){
    case 'Calendar':
      return {mode:'Calendar'}
    case 'Comments':
      return {mode:'Comments'}
    default :
      return {mode:'StudyPlanners'}
  }
}


function Study() {
    
    let history = useHistory()

    const [token,setToken, removeToken] = useCookies(['mytoken','userId','id'])
    const [StudyInfo,SetStudyInfo] = useState('')
    const[state,dispatch] = useReducer(reducer,initialState)

    const [modifyTitleCond,setModifyTitleCond] = useState(false)
    const [title,setTitle] = useState('')

    const [createStudyPlannerCond,setcreateStudyPlannerCond] = useState(false)
    const [studyPlannerTitle,setstudyPlannerTitle] = useState('')

    const [myStudyPlannerCond,setMyStudyPlannerCond] = useState(false)

    const [StudyPlanners,setStudyPlanners] = useState([])
    const [StudyPlanner,setStudyPlanner] = useState('')
    const [OneStudyPlannerCond,setOneStudyPlannerCond] = useState(false)

    const [ModifyStudyPlannerCond,setModifyStudyPlannerCond] = useState(false)
    const [ModifyStudyPlannerTitle,setModifyStudyPlannerTitle] = useState('')

    const [CreateComponentCond,setCreateComponentCond] = useState(false)
    const [CreateComponentTitle,setCreateComponentTitle] = useState('')
    const [CreateComponentDuration,setCreateComponentDuration] = useState('')
    
    const [ModifyComponentCond,setModifyComponentCond] = useState(false)
    const [ModifyComponentInfo,setModifyComponentInfo] = useState('')
    const [ModifyComponentTitle,setModifyComponentTitle] = useState('')
    const [ModifyComponentDuration,setModifyComponentDuration] = useState('')

    const [Comments,setComments] = useState('')
    const [Comment,setComment] = useState('')

    const [CreateCommentDescription,setCreateCommentDescription] = useState('')

    const [ModifyCommentCond,setModifyCommentCond] = useState(false)
    const [ModifyCommentDescription,setModifyCommentDescription] = useState('')

    const [CommentShowCond,setCommentShowCond] = useState(false)

    const [CalendarShowCond,setCalendarShowCond] = useState(false)

    const GetStudyCommentsFirst = useCallback(async (id)=>{
        var reverseComment = []
        StudyCommentAPI.getStudyComment(id,token['mytoken'])
        .then(resp=>{
            resp.data.map(comment=>{
                reverseComment=[comment,...reverseComment]
                return null;
            })
            return null;
        })
        .catch(error=>console.log(error))
        .then(()=>setComments(reverseComment))
    },[token]);

    const GetStudyPlannersComponentFirst = useCallback(async (id,data) => {
        var allData = []

        data.map(onedata=>{
            var oneData = onedata
            var oneComponent
            StudyPlannerAPI.getStudyPlannerComponent(id,onedata.id,token['mytoken'])
            .then(resp=>oneComponent=resp.data)
            .catch(error=>console.log(error))
            .then(()=>{
                oneData['component'] = oneComponent
                allData=[...allData,oneData]
                setStudyPlanners(allData)
                GetStudyCommentsFirst(id)
            })
            return null;
        })
    },[token,GetStudyCommentsFirst]);

    const GetStudyPlannersFirst = useCallback(async (id) => {
        var data
        StudyPlannerAPI.getStudyPlanner(id,token['mytoken'])
        .then(resp=>data = resp.data)
        .catch(error=>console.log(error))
        .then(()=>GetStudyPlannersComponentFirst(id,data))
        .then(()=>setStudyPlanners(data))   
    }, [token,GetStudyPlannersComponentFirst,setStudyPlanners]);

    useEffect(()=>{
        
        var id
        StudyAPI.getStudyMemberID(token['id'],token['mytoken'])
        .then(resp=>id = resp.data[0].Study_key)
        .catch(error=>console.log(error))
        .then(()=>{
            StudyAPI.getStudyID(id,token['mytoken'])
            .then(resp=>SetStudyInfo(resp.data))
            .catch(error=>console.log(error))
            .then(()=>{GetStudyPlannersFirst(id)})
        })
        
    },[token,GetStudyPlannersFirst])

    const logoutBtn = () => {
        removeToken('id')
        removeToken('userId')
        removeToken('mytoken')
        alert("Logout")
        history.push('/') 
    }

    const modifyStudyID =()=> {
        setTitle(StudyInfo.title)
        setModifyTitleCond(true)
    }

    const finishModifyStudyID =()=>{
        StudyInfo.title = title
        StudyAPI.modifyStudyID(StudyInfo.id,token['mytoken'],StudyInfo)    
        setModifyTitleCond(false)
    } 

    const CreateStudyPlannerBtn = () => {
        const PlannerInfo = {'Study_key':StudyInfo.id,'User_key':Number(token['id']),'title':studyPlannerTitle,'userId':token['userId']} 
        StudyPlannerAPI.postStudyPlanner(StudyInfo.id,PlannerInfo,token['mytoken'])
        .then(()=>setcreateStudyPlannerCond(false))
        .catch(error=>console.log(error))
        .then(()=>GetStudyPlanners(StudyInfo.id))
    }

    const GetStudyPlanners =(id)=>{
        var data
        StudyPlannerAPI.getStudyPlanner(id,token['mytoken'])
        .then(resp=>data = resp.data)
        .catch(error=>console.log(error))
        .then(()=>GetStudyPlannersComponent(id,data))
        .then(()=>setStudyPlanners(data))   
    }

    const GetStudyPlannersComponent =(id,data)=>{
        
        var allData = []

        data.map(onedata=>{
            var oneData = onedata
            var oneComponent
            StudyPlannerAPI.getStudyPlannerComponent(id,onedata.id,token['mytoken'])
            .then(resp=>oneComponent=resp.data)
            .catch(error=>console.log(error))
            .then(()=>{
                oneData['component'] = oneComponent
                allData=[...allData,oneData]
                setStudyPlanners(allData)
                GetStudyComments(id)
            })
            return null;
        })
    }

    const GetStudyComments =(id)=>{
        var reverseComment=[]
        StudyCommentAPI.getStudyComment(id,token['mytoken'])
        .then(resp=>{
            resp.data.map(comment=>{
                reverseComment=[comment,...reverseComment]
                return null;
            })
            return null;
        })
        .catch(error=>console.log(error))
        .then(()=>setComments(reverseComment))
    }


    const OneStudyPlannerBtn=(OneStudyPlanner)=>{
        setStudyPlanner(OneStudyPlanner)
        setOneStudyPlannerCond(true)
    }

    const DeleteStudyPlannerBtn=(OneStudyPlanner)=>{
        StudyPlannerAPI.deleteStudyPlanner(StudyInfo.id,OneStudyPlanner.id,token['mytoken'])
        .then(()=>GetStudyPlanners(StudyInfo.id))
        .catch(error=>console.log(error))
    }

    const ModifyStudyPlannerBtn=()=>{
        setModifyStudyPlannerTitle(StudyPlanner.title)
        setModifyStudyPlannerCond(true)
    }

    const ModifyStudyPlanner=()=>{
        StudyPlanner['title'] = ModifyStudyPlannerTitle
        StudyPlannerAPI.putStudyPlanner(StudyInfo.id,StudyPlanner.id,StudyPlanner,token['mytoken'])
        .then(()=>{
            GetStudyPlanners(StudyInfo.id)
            setModifyStudyPlannerCond(false)
        })
        .catch(error=>console.log(error))
    }

    const CreateComponentBtn =()=> {
        setCreateComponentCond(true)
    }

    const CreateComponent = ()=>{

        const component_info = {'Study_key':StudyInfo.id,'User_key':token['id'],'userId':token['userId'],
            'StudyPlanner_key':StudyPlanner.id,'title':CreateComponentTitle,'duration':CreateComponentDuration, 'condition':0}

        StudyPlannerAPI.postComponent(StudyInfo.id,StudyPlanner.id,component_info,token)
        .then(resp=>GetStudyPlanners(StudyInfo.id))
        .catch(error=>console.log(error))
        
        setOneStudyPlannerCond(false)
        setCreateComponentCond(false)
    }

    const ModifyComponentBtn = (one)=>{
        setModifyComponentCond(true)
        setModifyComponentInfo(one)
        setModifyComponentTitle(one.title)
        setModifyComponentDuration(one.duration)
    }

    const ModifyComponent = ()=>{
        ModifyComponentInfo['title'] = ModifyComponentTitle
        ModifyComponentInfo['duration'] = ModifyComponentDuration
        ModifyComponentInfo['condition'] = 0
        StudyPlannerAPI.putComponent(StudyInfo.id,StudyPlanner.id,ModifyComponentInfo.id,ModifyComponentInfo,token['mytoken'])
        .then(()=>{
            GetStudyPlanners(StudyInfo.id)
            setModifyComponentCond(false)
        })
        .catch(error=>console.log(error))
    }

    const DeleteComponentBtn =(one)=>{
        StudyPlannerAPI.deleteComponent(StudyInfo.id,StudyPlanner.id,one.id,token['mytoken'])
        .then(resp=>GetStudyPlanners(StudyInfo.id))
        .catch(error=>console.log(error))
        setOneStudyPlannerCond(false)
    }

    const SuccessBtn = (one) => {
        one['condition'] = 1
        StudyPlannerAPI.putComponent(StudyInfo.id,one.StudyPlanner_key,one.id,one,token['mytoken'])
        .then(resp=>GetStudyPlanners(StudyInfo.id))
        .catch(error=>console.log(error))
    }

    const FailBtn = (one) => {
        one['condition'] = 2
        StudyPlannerAPI.putComponent(StudyInfo.id,one.StudyPlanner_key,one.id,one,token['mytoken'])
        .then(resp=>GetStudyPlanners(StudyInfo.id))
        .catch(error=>console.log(error))
    }

    const CreateCommentBtn = () =>{
        var info={'Study_key':StudyInfo.id,'comment_user':token['userId'],
            'comment_textfield':CreateCommentDescription,'User_key':token['id']}
        StudyCommentAPI.postStudyComment(StudyInfo.id,info,token['mytoken'])
        .then(rep=>GetStudyPlanners(StudyInfo.id))
        .catch(error=>console.log(error))
        .then(()=>setCreateCommentDescription(''))
    }

    const ModifyCommentBtn = (Comment) =>{
        setComment(Comment)
        setModifyCommentDescription(Comment.comment_textfield)
        setModifyCommentCond(true)   
    }

    const ModifyComment =()=> {
        Comment['comment_textfield'] = ModifyCommentDescription
        StudyCommentAPI.putStudyComment(StudyInfo.id,Comment.id,Comment,token['mytoken'])
        .then(resp=>GetStudyPlanners(StudyInfo.id))
        .catch(error=>console.log(error))
        .then(()=>setModifyCommentCond(false))
    }

    const DeleteCommentBtn = (Comment) =>{
        StudyCommentAPI.deleteStudyComment(StudyInfo.id,Comment.id,token['mytoken'])
        .then(resp=>GetStudyPlanners(StudyInfo.id))
        .catch(error=>console.log(error))
    }

    var ModifyTitleAuth = (StudyInfo.User_key === Number(token['id']))
    var ModifyTitleBtn = null;

    if(ModifyTitleAuth){
        ModifyTitleBtn = (modifyTitleCond
        ?<div><button id="modify_title_Btn" className="btn btn-success btn-sm" onClick={()=>finishModifyStudyID()}>finish modify</button></div>
        :<div><button id="modify_title_Btn" className="btn btn-success btn-sm" onClick={()=>modifyStudyID()}>modify title</button></div>)
    }

    var content_head = null;
    if(state.mode === 'StudyPlanners'){
        content_head =  
            <section className="StudyPlannersHead">
                <section className="StudyPlannersCreateMode">
                {createStudyPlannerCond
                    ?<section id="CreateStudyPlanner">
                        <div className="mb-3">
                            <h2 className="form-label">Planner title :</h2>
                            <input type="text" className="form-control" placeholder="write title" onChange={e=>setstudyPlannerTitle(e.target.value)}></input><br/>
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={CreateStudyPlannerBtn}>Create</button>
                        <button className="btn btn-light btn-sm" onClick={()=>setcreateStudyPlannerCond(false)}>back</button>
                    </section>
                    :
                    <section id="StudyPlannerBtn" className="d-flex justify-content-start">
                        <section id="CreateStudyPlannerBtn" style={{paddingRight:"10px"}}>
                            <button className="btn btn-light btn-sm" onClick={()=>setcreateStudyPlannerCond(true)}>Create Planner Component</button>
                        </section>
                        <section id="MyStudyPlannerBtn">
                            {myStudyPlannerCond
                                ?<button className="btn btn-info btn-sm" onClick={()=>setMyStudyPlannerCond(false)}>Show All Component</button>
                                :<button className="btn btn-info btn-sm" onClick={()=>setMyStudyPlannerCond(true)}>Show My Component</button>
                            }
                        </section>
                    </section>
                }
                </section>
                <br/>
                <section id="StudyPlannersHead">
                    <section id="StudyPlannersTitle">
                        {myStudyPlannerCond
                            ?<h2>My StudyPlanners</h2>
                            :<h2>All StudyPlanners</h2>
                        }
                    </section>
                    <div className="d-flex justify-content-end" >
                        <button className="btn btn-primary" style={{marginRight:"10px"}}
                            onClick={()=>dispatch({type:'Calendar'})}>Calendar</button>
                        <button className="btn btn-success"
                            onClick={()=>dispatch({type:'Comments'})}>Comments</button>
                    </div>
                </section>
            </section>
    }
    else if(state.mode === 'Calendar'){
        content_head =  
            <section id="StudyCalenderHead">
                <section  id="StudyCalendar head" className="d-flex justify-content-start">
                    <h2 style={{paddingRight:"10px"}}>Calendar</h2>
                    {CalendarShowCond
                        ? <button className="btn btn-info btn-sm" onClick={()=>setCalendarShowCond(false)}>Small Calendar</button>
                        : <button className="btn btn-info btn-sm" onClick={()=>setCalendarShowCond(true)}>Full Calendar</button>
                    }  
                </section>
                <div className="d-flex justify-content-end" >
                    <button className="btn btn-warning" style={{marginRight:"10px"}}
                        onClick={()=>dispatch({type:'StudyPlanners'})}>StudyPlanners</button>
                    <button className="btn btn-success"
                        onClick={()=>dispatch({type:'Comments'})}>Comments</button>
                </div>
            </section>
    }
    else if(state.mode === 'Comments'){
        content_head = 
            <section id="StudyCommentHead">
                <section className="d-flex justify-content-start">
                    <h2 style={{paddingRight:"10px"}}>Comments</h2>
                    {CommentShowCond
                        ? <button className="btn btn-info btn-sm" onClick={()=>setCommentShowCond(false)}>Some Comments</button>
                        : <button className="btn btn-info btn-sm" onClick={()=>setCommentShowCond(true)}>All Comments</button>
                    }
                    
                </section>
                <div className="d-flex justify-content-end" >
                    <button className="btn btn-warning" style={{marginRight:"10px"}}
                        onClick={()=>dispatch({type:'StudyPlanners'})}>StudyPlanners</button>
                    <button className="btn btn-primary" style={{marginRight:"10px"}}
                        onClick={()=>dispatch({type:'Calendar'})}>Calendar</button>
                </div>
            </section>
    }


    var content_body = null;
    if(state.mode === 'StudyPlanners'){
        content_body =
            <section id="StudyPlannersBody">
                {OneStudyPlannerCond
                    ?<section id="OneStudyPlanner">
                        
                        <OneStudyPlannerComp  
                            StudyPlanner={StudyPlanner} 
                                            
                            ModifyStudyPlannerBtn={ModifyStudyPlannerBtn} ModifyStudyPlanner={ModifyStudyPlanner} 
                            ModifyStudyPlannerCond={ModifyStudyPlannerCond} setModifyStudyPlannerCond={setModifyStudyPlannerCond} 
                            ModifyStudyPlannerTitle={ModifyStudyPlannerTitle} setModifyStudyPlannerTitle={setModifyStudyPlannerTitle} 

                            CreateComponentBtn={CreateComponentBtn} CreateComponent={CreateComponent} CreateComponentCond={CreateComponentCond} 
                            setCreateComponentCond={setCreateComponentCond} 
                            setCreateComponentTitle={setCreateComponentTitle} setCreateComponentDuration={setCreateComponentDuration} 
                            
                            ModifyComponentBtn={ModifyComponentBtn} ModifyComponent={ModifyComponent} 
                            ModifyComponentTitle={ModifyComponentTitle} setModifyComponentTitle={setModifyComponentTitle}
                            ModifyComponentDuration={ModifyComponentDuration} setModifyComponentDuration={setModifyComponentDuration} 
                            ModifyComponentCond={ModifyComponentCond} setModifyComponentCond={setModifyComponentCond} 
                            
                            DeleteComponentBtn={DeleteComponentBtn} 

                            setOneStudyPlannerCond={setOneStudyPlannerCond} SuccessBtn={SuccessBtn} FailBtn={FailBtn}>
                        </OneStudyPlannerComp>
                    
                    </section>
                    :
                        <section id="StudyPlannersMode">
                        {myStudyPlannerCond
                            ?<section id="MyStudyPlanners">
                                <MyStudyPlannersComp
                                    StudyPlanners={StudyPlanners} SuccessBtn={SuccessBtn} FailBtn={FailBtn} 
                                    DeleteStudyPlannerBtn={DeleteStudyPlannerBtn} OneStudyPlannerBtn={OneStudyPlannerBtn}>
                                </MyStudyPlannersComp>
                            </section>
                            :<section id="StudyPlanners">
                                <StudyPlannersComp 
                                    StudyPlanners={StudyPlanners} SuccessBtn={SuccessBtn} FailBtn={FailBtn} 
                                    DeleteStudyPlannerBtn={DeleteStudyPlannerBtn} OneStudyPlannerBtn={OneStudyPlannerBtn}>
                                </StudyPlannersComp>            
                            </section>
                        }
                        </section>
                }
            </section>
    }
    else if(state.mode === 'Calendar'){
        content_body = 
            <section id="StudyCalendarBody">
                <StudyCalendar StudyPlanners={StudyPlanners} token={token} OneStudyPlannerBtn={OneStudyPlannerBtn}
                    CalendarShowCond={CalendarShowCond} setCalendarShowCond={setCalendarShowCond} dispatch={dispatch}/>
            </section>
    }
    else if(state.mode === 'Comments'){
        content_body = 
            <section id="StudyComments">
                <StudyCommentComp 
                    Comments={Comments} CommentShowCond={CommentShowCond} setCommentShowCond={setCommentShowCond}
                    
                    CreateCommentDescription={CreateCommentDescription} setCreateCommentDescription={setCreateCommentDescription}
                    CreateCommentBtn={CreateCommentBtn} 
                    
                    ModifyCommentDescription={ModifyCommentDescription} setModifyCommentDescription={setModifyCommentDescription}
                    ModifyCommentCond={ModifyCommentCond} ModifyCommentBtn={ModifyCommentBtn} ModifyComment={ModifyComment} 
                    
                    DeleteCommentBtn={DeleteCommentBtn}>
                </StudyCommentComp>
            </section>
    }

    return (
        <div className="App">
            
            <article id="StudyHead">
                <StudyHead modifyTitleCond={modifyTitleCond} title={title} setTitle={setTitle} StudyInfo={StudyInfo}
                    logoutBtn={logoutBtn} ModifyTitleBtn={ModifyTitleBtn}/>
            </article>

            <br/><br/><br/>
            <article id="StudyBody">
            
                {content_head}<br/>
                {content_body}

            </article>
        </div>
    )
}


export default Study