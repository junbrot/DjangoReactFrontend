import React,{useEffect,useState} from 'react'
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom'
import moment from 'moment';
import StudyPlannerAPI from '../API/StudyPlannerAPI';
import StudyAPI from '../API/StudyAPI';
import StudyPlannersComp from './StudyPlannersComp';
import StudyPlannersComponentsComp from './StudyPlannersComponentsComp';

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


    useEffect(()=>{
        
        var id
        StudyAPI.getStudyMemberID(token['id'],token['mytoken'])
        .then(resp=>id = resp.data[0].Study_key)
        .catch(error=>console.log(error))
        .then(()=>{
            StudyAPI.getStudyID(id,token['mytoken'])
            .then(resp=>SetStudyInfo(resp.data))
            .catch(error=>console.log(error))
            .then(()=>GetStudyPlanners(id))
        })
        
    },[])

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
            var oneComment
            StudyPlannerAPI.getStudyPlannerComponent(id,onedata.id,token['mytoken'])
            .then(resp=>oneComment=resp.data)
            .catch(error=>console.log(error))
            .then(()=>{
                oneData['comment'] = oneComment
                allData=[...allData,oneData]
                setStudyPlanners(allData)
                return oneData;
            })
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
        ?<div><button className="btn btn-success btn-sm" onClick={()=>finishModifyStudyID()}>finish modify</button></div>
        :<div><button className="btn btn-success btn-sm" onClick={()=>modifyStudyID()}>modify title</button></div>)
    }

    return (
        <div className="App">
            
            <div className="head">
                {modifyTitleCond
                ?<div className="mb-3">
                    <h2 className="form-label">Title :</h2>
                    <input type="text" className="form-control" id="title" placeholder="Please Enter The Title"
                        value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                :<h2 style={{textAlign:"center"}}>{StudyInfo.title}</h2>
                }
                
                <br/>
                <div className="d-flex justify-content-start"> 
                    <div style={{paddingRight:"10px"}}><button className="btn btn-danger btn-sm" onClick={()=>logoutBtn()}>Logout/Refresh</button></div>
                    {ModifyTitleBtn}
                </div>
                
                <br/>
                <div>
                    <button className="btn btn-primary btn-sm" onClick={()=>history.push('/StudyBoard')}>StudyBoard</button>
                    <br/><br/>
                    <h4>Duration : {moment(StudyInfo.StudyStartTime).format('YYYY-MM-DD')} to   
                        {' '}{moment(StudyInfo.StudyStartTime).add(StudyInfo.duration,'days').format('YYYY-MM-DD')}</h4>
                </div>
            </div>


            <br/><br/><br/>
            {createStudyPlannerCond
            ?<div className="CreatePlannerComponent">
                <div className="mb-3">
                    <h2 className="form-label">Planner title :</h2>
                    <input type="text" className="form-control" placeholder="write title" onChange={e=>setstudyPlannerTitle(e.target.value)}></input><br/>
                </div>

                <br/>
                <button className="btn btn-primary btn-sm" onClick={CreateStudyPlannerBtn}>Create</button>
                <button className="btn btn-light btn-sm" onClick={()=>setcreateStudyPlannerCond(false)}>back</button>
            </div>
            :<button className="btn btn-light btn-sm" onClick={()=>setcreateStudyPlannerCond(true)}>Create Planner Component</button>
            }
            
            <br/><br/><br/>
            {OneStudyPlannerCond
            
            ?<StudyPlannersComponentsComp ModifyStudyPlannerCond={ModifyStudyPlannerCond} ModifyStudyPlannerTitle={ModifyStudyPlannerTitle}
                setModifyStudyPlannerTitle={setModifyStudyPlannerTitle} StudyPlanner={StudyPlanner} StudyPlanner={StudyPlanner}
                SuccessBtn={SuccessBtn} FailBtn={FailBtn} ModifyComponentTitle={ModifyComponentTitle} ModifyComponentCond={ModifyComponentCond}
                ModifyComponentDuration={ModifyComponentDuration} setCreateComponentTitle={setCreateComponentTitle} CreateComponent={CreateComponent}
                setCreateComponentCond={setCreateComponentCond} setModifyComponentTitle={setModifyComponentTitle} 
                setModifyComponentDuration={setModifyComponentDuration} ModifyComponent={ModifyComponent} setModifyComponentCond={setModifyComponentCond}
                ModifyStudyPlanner={ModifyStudyPlanner} setModifyStudyPlannerCond={setModifyStudyPlannerCond} ModifyStudyPlannerBtn={ModifyStudyPlannerBtn}
                CreateComponentBtn={CreateComponentBtn} setOneStudyPlannerCond={setOneStudyPlannerCond} CreateComponentCond={CreateComponentCond}
                setCreateComponentDuration={setCreateComponentDuration} DeleteComponentBtn={DeleteComponentBtn} ModifyComponentBtn={ModifyComponentBtn}/>
            
            :<StudyPlannersComp StudyPlanners={StudyPlanners} SuccessBtn={SuccessBtn} FailBtn={FailBtn} 
                DeleteStudyPlannerBtn={DeleteStudyPlannerBtn} OneStudyPlannerBtn={OneStudyPlannerBtn}/>            
            }

        </div>
    )
}

/*
<div className="row row-cols-5" >
            {StudyPlanners.map(StudyPlanner=>{ 
                 
                return (
                    <div className="col-sm-4" key={StudyPlanner.id} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                    <div className="card">
                        <div className="card-body">
                            
                            <h5 className="card-title" style={{color:"black"}}>title : {StudyPlanner.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{StudyPlanner.userId}</h6>
                           
                            <br/>
                            <br/>
                           {StudyPlanner.comment
                            ?StudyPlanner.comment.map(one=>{
                                
                                var body
                                if(one.condition === 0){
                                    body = <div>
                                        {one.User_key === Number(token['id'])
                                            ?
                                            <div>
                                                <div className="d-flex justify-content-start" >
                                                    <div style={{paddingRight:"10px"}}>
                                                    <button className="btn btn-success btn-sm" onClick={()=>SuccessBtn(one)}>Success</button>
                                                    </div>
                                                    <button className="btn btn-primary btn-sm" onClick={()=>FailBtn(one)}>Fail</button>
                                                </div>
                                            </div>
                                            :null
                                        }
                                    </div>
                                }
                                else if(one.condition === 1){
                                    body = <h6 style={{'color':'green'}}>success</h6>
                                }
                                else{
                                    body = <h6 style={{'color':'red'}}>fail</h6>
                                }

                                return(
                                    <div className="card-body" key={one.id.toString()}style={{color:"black",border:"1px solid black"}}>
                                        <h5>{one.title}</h5>
                                        <h6>{one.userId} / {moment(one.StudyPlannerComponentStartTime).format('MM-DD')}
                                        {' '} to {' '}{moment(one.StudyPlannerComponentStartTime).add(one.duration,'days').format('MM-DD')}</h6>
                                        <br/>
                                        {body}
                                    </div>
                                )
                            })
                            :null
                            }
                            <br/>
                            <br/>

                            <div className="d-flex justify-content-end">
                                {StudyPlanner.User_key === Number(token['id'])
                                ?
                                    <div style={{paddingRight:"10px"}}>
                                        <button className="btn btn-outline-danger btn-sm" onClick={()=>DeleteStudyPlannerBtn(StudyPlanner)}>Delete</button>   
                                    </div>
                                :null
                                }
                                <button className="btn btn-outline-dark btn-sm" onClick={()=>OneStudyPlannerBtn(StudyPlanner)}>See detail</button>
                            </div>
                        </div>
                    </div>
                    </div>
                )})
            }
            </div>

*/

export default Study