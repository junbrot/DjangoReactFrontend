import React,{useEffect,useState,useCallback} from 'react'
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom'
import moment from 'moment';
import StudyPlannerAPI from '../API/StudyPlannerAPI';
import StudyAPI from '../API/StudyAPI';
import StudyPlannersComp from './StudyPlannersComp';
import OneStudyPlannerComp from './OneStudyPlannerComp';

function Study() {
    let history = useHistory()
    
    const [token,setToken, removeToken] = useCookies(['mytoken','userId','id'])
    const [StudyInfo,SetStudyInfo] = useState('')
    
    const [modifyTitleCond,setModifyTitleCond] = useState(false)
    const[title,setTitle] = useState('')

    const[createStudyPlannerCond,setcreateStudyPlannerCond] = useState(false)
    const[studyPlannerTitle,setstudyPlannerTitle] = useState('')

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
            })
            return null;
        })
    },[token]);

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
            })
            return null;
        })
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

    var ModifyTitleAuth = (StudyInfo.User_key === Number(token['id']))
    var ModifyTitleBtn = null;

    if(ModifyTitleAuth){
        ModifyTitleBtn = (modifyTitleCond
        ?<div><button id="modify_title_Btn" className="btn btn-success btn-sm" onClick={()=>finishModifyStudyID()}>finish modify</button></div>
        :<div><button id="modify_title_Btn" className="btn btn-success btn-sm" onClick={()=>modifyStudyID()}>modify title</button></div>)
    }

    return (
        <div className="App">
            
            <article id="StudyHead">
                {modifyTitleCond
                ?<section id="modifyStudyTitle" className="mb-3">
                    <h2 className="form-label">Title :</h2>
                    <input type="text" className="form-control" id="title" placeholder="Please Enter The Title"
                        value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </section>
                :<h2 style={{textAlign:"center"}}>{StudyInfo.title}</h2>
                }
                
                <br/>
                <section id="Logout_Refresh_Btn" className="d-flex justify-content-start"> 
                    <div style={{paddingRight:"10px"}}>
                        <button className="btn btn-danger btn-sm" onClick={()=>logoutBtn()}>Logout/Refresh</button></div>
                    {ModifyTitleBtn}
                </section>
                
                <br/>
                <section id="toStudyBoardBtn">
                    <button className="btn btn-primary btn-sm" onClick={()=>history.push('/StudyBoard')}>StudyBoard</button>
                    <br/><br/>
                    <h4 id="Duration">Duration : {moment(StudyInfo.StudyStartTime).format('YYYY-MM-DD')} to   
                        {' '}{moment(StudyInfo.StudyStartTime).add(StudyInfo.duration,'days').format('YYYY-MM-DD')}</h4>
                </section>
            </article>


            <br/><br/><br/>
            <article id="StudyBody">
                {createStudyPlannerCond
                ?<section id="CreateStudyPlanner">
                    <div className="mb-3">
                        <h2 className="form-label">Planner title :</h2>
                        <input type="text" className="form-control" placeholder="write title" onChange={e=>setstudyPlannerTitle(e.target.value)}></input><br/>
                    </div>

                    <br/>
                    <button className="btn btn-primary btn-sm" onClick={CreateStudyPlannerBtn}>Create</button>
                    <button className="btn btn-light btn-sm" onClick={()=>setcreateStudyPlannerCond(false)}>back</button>
                </section>
                :<section id="CreateStudyPlannerBtn">
                    <button className="btn btn-light btn-sm" onClick={()=>setcreateStudyPlannerCond(true)}>Create Planner Component</button>
                </section>
                }
            
                <br/><br/><br/>
                
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
                :<section id="StudyPlanners">
                    <StudyPlannersComp 
                        StudyPlanners={StudyPlanners} SuccessBtn={SuccessBtn} FailBtn={FailBtn} 
                        DeleteStudyPlannerBtn={DeleteStudyPlannerBtn} OneStudyPlannerBtn={OneStudyPlannerBtn}>
                    </StudyPlannersComp>            
                </section>
                }

            </article>
        </div>
    )
}


export default Study