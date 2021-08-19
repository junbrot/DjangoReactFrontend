import React from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'

function StudyHead(props) {
    let history = useHistory()

    return (
        <div>
            <section id="StudyHead">
                {props.modifyTitleCond
                    ?<section id="modifyStudyTitle" className="mb-3">
                        <h2 className="form-label">Title :</h2>
                        <input type="text" className="form-control" id="title" placeholder="Please Enter The Title"
                            value={props.title} onChange={(e)=>props.setTitle(e.target.value)}/>
                    </section>
                    :<h2 style={{textAlign:"center"}}>{props.StudyInfo.title}</h2>
                }
                
                <br/>
                <section id="Logout_Refresh_Btn" className="d-flex justify-content-start"> 
                    <div style={{paddingRight:"10px"}}>
                        <button className="btn btn-danger btn-sm" onClick={()=>props.logoutBtn()}>Logout/Refresh</button></div>
                    {props.ModifyTitleBtn}
                </section>
                
                <br/>
                <section id="toStudyBoardBtn">
                    <button className="btn btn-primary btn-sm" onClick={()=>history.push('/StudyBoard')}>StudyBoard</button>
                    <br/><br/>
                    <h4 id="Duration">Duration : {moment(props.StudyInfo.StudyStartTime).format('YYYY-MM-DD')} to   
                        {' '}{moment(props.StudyInfo.StudyStartTime).add(props.StudyInfo.duration,'days').format('YYYY-MM-DD')}</h4>
                </section>
            </section>
        </div>
    )
}

export default StudyHead
