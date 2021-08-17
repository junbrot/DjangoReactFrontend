import React from 'react'
import moment from 'moment';
import {useCookies} from 'react-cookie';

function StudyPlannersComponentsComp(props) {
    
    const [token,setToken, removeToken] = useCookies(['mytoken','userId','id'])

    return (
        <div className="card" >
            <div className="card-body">
                {props.ModifyStudyPlannerCond
                    ?<input type="text" className="form-control" value={props.ModifyStudyPlannerTitle} placeholder="write title" 
                        style={{color:"black"}} onChange={e=>props.setModifyStudyPlannerTitle(e.target.value)}></input>
                    :<h5 className="card-title" style={{color:"black"}}>title : {props.StudyPlanner.title}</h5>
                }
                <h6 className="card-subtitle mb-2 text-muted">{props.StudyPlanner.userId}</h6>
                <br/>
                
                {props.StudyPlanner.comment
                    ?props.StudyPlanner.comment.map(one=>{
                        
                        var body
                        if(one.condition == 0){
                            body = <div>
                            <div className="d-flex justify-content-start" >
                                <div style={{paddingRight:"10px"}}>
                                <button className="btn btn-success btn-sm" onClick={()=>props.SuccessBtn(one)}>Success</button>
                                </div>
                                <button className="btn btn-primary btn-sm" onClick={()=>props.FailBtn(one)}>Fail</button>
                            </div>
                        </div>
                        }
                        else if(one.condition == 1){
                            body = <h6 style={{'color':'green'}}>success</h6>
                        }
                        else{
                            body = <h6 style={{'color':'red'}}>fail</h6>
                        }

                        return(
                            <div className="card-body" key={one.id.toString()}style={{color:"black",border:"1px solid black"}}>
                                <h6>{one.title}</h6>
                                <h6>작성자 : {one.userId}</h6>
                                <h6>{moment(one.StudyPlannerComponentStartTime).format('MM-DD')} to   
                                    {' '}{moment(one.StudyPlannerComponentStartTime).add(one.duration,'days').format('MM-DD')}</h6>
                                <br/>
                                {one.User_key === Number(token['id'])
                                    ?
                                    <div>
                                        {body}
                                        <br/>
                                        <div className="d-flex justify-content-start">
                                            <div style={{paddingRight:"10px"}}>
                                                <button className="btn btn-warning btn-sm" onClick={()=>props.ModifyComponentBtn(one)}>Modify</button>
                                            </div>
                                            <button className="btn btn-danger btn-sm" onClick={()=>props.DeleteComponentBtn(one)}>Delete</button>
                                        </div>
                                    </div>
                                    :null
                                }
                            </div>
                        )
                    })
                    :null
                }
                
                {props.CreateComponentCond
                ? <div className="card-body"style={{color:"black",border:"1px solid black"}}>
                    <p>Component title :</p>
                    <input type="text" className="form-control" placeholder="write title" onChange={e=>props.setCreateComponentTitle(e.target.value)}></input><br/>
                    <p>Component duration :</p>
                    <input type="text" className="form-control" placeholder="...days" onChange={e=>props.setCreateComponentDuration(e.target.value)}></input><br/>
                    <button className="btn btn-outline-primary btn-sm" onClick={()=>props.CreateComponent()}>Create</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={()=>props.setCreateComponentCond(false)}>Cancel</button>
                </div>
                :null
                }

                {props.ModifyComponentCond
                ? <div className="card-body"style={{color:"black",border:"1px solid black"}}>
                    <p>Component title :</p>
                    <input type="text" className="form-control" value={props.ModifyComponentTitle} 
                        placeholder="write title" onChange={e=>props.setModifyComponentTitle(e.target.value)}></input><br/>
                    <p>Component duration :</p>
                    <input type="text" className="form-control" value={props.ModifyComponentDuration} 
                        placeholder="...days" onChange={e=>props.setModifyComponentDuration(e.target.value)}></input><br/>
                    <button className="btn btn-outline-primary btn-sm" onClick={()=>props.ModifyComponent()}>Modify</button>
                    {/* <button className="btn btn-outline-primary btn-sm" onClick={()=>console.log("modify click")}>Modify</button> */}
                    <button className="btn btn-outline-danger btn-sm" onClick={()=>props.setModifyComponentCond(false)}>Cancel</button>
                </div>
                :null
                }

                <br/>
                <div className="d-flex justify-content-end">
                    {props.ModifyStudyPlannerCond
                        ?<div style={{paddingRight:"10px"}}>
                            <button className="btn btn-warning btn-sm" onClick={()=>props.ModifyStudyPlanner()}>Submit</button>
                            <button className="btn btn-dark btn-sm" onClick={()=>props.setModifyStudyPlannerCond(false)}>Cancel</button>
                        </div>
                        :<div style={{paddingRight:"10px"}}>
                            <button className="btn btn-warning btn-sm" onClick={()=>props.ModifyStudyPlannerBtn()}>Modify Title</button>
                        </div>
                    }
                    <button className="btn btn-info btn-sm" onClick={()=>props.CreateComponentBtn()}>Add Plan</button>
                    <button className="btn btn-outline-dark btn-sm" onClick={()=>props.setOneStudyPlannerCond(false)}>See Planners</button>
                </div>
            </div>
            </div>
    )
}

export default StudyPlannersComponentsComp
