import React from 'react'
import {useCookies} from 'react-cookie';
import moment from 'moment';

function StudyPlannersComp(props) {

    const [token] = useCookies(['mytoken','userId','id'])
    
    return (
        <section id="StudyPlanners" className="row row-cols-5" >
            {props.StudyPlanners.map(StudyPlanner=>{ 
                
                return (
                    <section id="StudyPlanner" className="col-sm-4" key={StudyPlanner.id} style={{paddingTop:"10px",paddingBottom:"10px"}}>
                    <section id="StudyPlanner" className="card" style={{height:"50vh",overflowY:"auto"}}>
                        <section id="StudyPlanner" className="card-body" >    
                            
                            <section id="StudyPlannerHead" className="card-body" >    
                            <h5 id="StudyPlannerTitle" className="card-title" style={{color:"black"}}>title : {StudyPlanner.title}</h5>
                            <h6 id="StudyPlannerUserID" className="card-subtitle mb-2 text-muted">{StudyPlanner.userId}</h6>
                            </section>

                            <section id="DeleteSeeDetailBtnForComponent" className="d-flex justify-content-end">
                                {StudyPlanner.User_key === Number(token['id'])
                                ?
                                    <div style={{paddingRight:"10px"}}>
                                        <button className="btn btn-outline-danger btn-sm" onClick={()=>props.DeleteStudyPlannerBtn(StudyPlanner)}>Delete</button>   
                                    </div>
                                :null
                                }
                                <button className="btn btn-outline-dark btn-sm" onClick={()=>props.OneStudyPlannerBtn(StudyPlanner)}>See detail</button>
                            </section>

                            <br/>

                            <section id="StudyPlannerBody">
                                {StudyPlanner.component
                                ?StudyPlanner.component.map(one=>{
                                    var body
                                    if(one.condition === 0){
                                        body = <div>
                                            {one.User_key === Number(token['id'])
                                                ?
                                                <div id="SuccessFailButtonForComponent" className="d-flex justify-content-start" >
                                                    <div style={{paddingRight:"10px"}}>
                                                    <button className="btn btn-success btn-sm" onClick={()=>props.SuccessBtn(one)}>Success</button>
                                                    </div>
                                                    <button className="btn btn-primary btn-sm" onClick={()=>props.FailBtn(one)}>Fail</button>
                                                </div>
                                                :null
                                            }
                                        </div>
                                    }
                                    else if(one.condition === 1){
                                        body = <div id="SuccessComponent"><h6 style={{'color':'green'}}>success</h6></div>
                                    }
                                    else{
                                        body = <div id="FailComponent"><h6 style={{'color':'red'}}>fail</h6></div>
                                    }

                                    return(
                                        <section id="StudyPlannerComponent" className="card-body" key={one.id.toString()}style={{color:"black",border:"1px solid black",marginTop:"10px"}}>
                                            <h5>{one.title}</h5>
                                            <h6>{one.userId} / {moment(one.StudyPlannerComponentStartTime).format('MM-DD')}
                                            {' '} to {' '}{moment(one.StudyPlannerComponentStartTime).add(one.duration,'days').format('MM-DD')}</h6>
                                            <br/>
                                            {body}
                                        </section>
                                    )
                                })
                                :null
                                }
                            </section>
                        </section>
                    </section>
                    </section>
                )})
            }
        </section>
    )
}

export default StudyPlannersComp
