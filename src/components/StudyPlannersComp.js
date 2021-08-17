import React from 'react'
import {useCookies} from 'react-cookie';
import moment from 'moment';

function StudyPlannersComp(props) {

    const [token,setToken, removeToken] = useCookies(['mytoken','userId','id'])

    return (
        <div className="row row-cols-5" >
            {props.StudyPlanners.map(StudyPlanner=>{ 
                 
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
                                                    <button className="btn btn-success btn-sm" onClick={()=>props.SuccessBtn(one)}>Success</button>
                                                    </div>
                                                    <button className="btn btn-primary btn-sm" onClick={()=>props.FailBtn(one)}>Fail</button>
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
                                        <button className="btn btn-outline-danger btn-sm" onClick={()=>props.DeleteStudyPlannerBtn(StudyPlanner)}>Delete</button>   
                                    </div>
                                :null
                                }
                                <button className="btn btn-outline-dark btn-sm" onClick={()=>props.OneStudyPlannerBtn(StudyPlanner)}>See detail</button>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                )})
            }
        </div>
    )
}

export default StudyPlannersComp
