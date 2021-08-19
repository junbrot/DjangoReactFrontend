import React from 'react'
import {useCookies} from 'react-cookie';
import moment from 'moment';

function StudyCommentComp(props) {

    const [token] = useCookies(['mytoken','userId','id'])

    return (
        <div>
            <section id="StudyCommentsList">
                {/* <div className="d-flex justify-content-start">
                    <h2 style={{paddingRight:"10px"}}>Comments</h2>
                    {props.CommentShowCond
                        ? <button className="btn btn-info btn-sm" onClick={()=>props.setCommentShowCond(false)}>Some Comments</button>
                        : <button className="btn btn-info btn-sm" onClick={()=>props.setCommentShowCond(true)}>All Comments</button>
                    }
                    
                </div> */}
                {/* <br/> */}
                
                {props.CommentShowCond
                    ?<div className="card bg-light">

                        {props.Comments && props.Comments.map(Comment=>{
                            
                            if(Comment.User_key===Number(token['id'])){
                                        
                                return(
                                    <div id="StudyComment" className="card-body" key={Comment.id} style={{backgroundColor:"#282c34"}}>
                                
                                        <div className="d-flex justify-content-start">
                                        <h6 style={{paddingRight:"20px"}}>{Comment.comment_user} : {moment(Comment.comment_date).format('YYYY-MM-DD')}</h6>
                                            <div style={{paddingRight:"10px"}}>
                                                <button className="btn btn-outline-primary btn-sm" 
                                                onClick={()=>props.ModifyCommentBtn(Comment)}>modify</button>
                                            </div>
                                            <button className="btn btn-outline-warning btn-sm" 
                                            onClick={()=>props.DeleteCommentBtn(Comment)}>delete</button>
                                        </div>
                                        <br/>
                                        <div className="card bg-light">
                                        <p style={{color:"#282c34"}}>{Comment.comment_textfield}</p>
                                        </div>
                                        {/* <hr/> */}
                                    </div>)
                            }
                            else{
                                return(
                                    <div id="StudyComment" className="card-body" key={Comment.id} style={{backgroundColor:"#282c34"}}>
                                    <p>{Comment.comment_user} : {moment(Comment.comment_date).format('YYYY-MM-DD')}</p>
                                    <div className="card bg-light">
                                        <p style={{color:"#282c34"}}>{Comment.comment_textfield}</p>
                                    </div>
                                    <hr/>
                                    </div>)
                            } 
                        })}
                    </div>
                    
                    :<div className="card bg-light" style={{height:"50vh",overflowY:"auto"}}>

                        {props.Comments && props.Comments.map(Comment=>{
                            
                            if(Comment.User_key===Number(token['id'])){
                                        
                                return(
                                    <div id="StudyComment" className="card-body" key={Comment.id} style={{backgroundColor:"#282c34"}}>
                                
                                        <div className="d-flex justify-content-start">
                                        <h6 style={{paddingRight:"20px"}}>{Comment.comment_user} : {moment(Comment.comment_date).format('YYYY-MM-DD')}</h6>
                                            <div style={{paddingRight:"10px"}}>
                                                <button className="btn btn-outline-primary btn-sm" 
                                                onClick={()=>props.ModifyCommentBtn(Comment)}>modify</button>
                                            </div>
                                            <button className="btn btn-outline-warning btn-sm" 
                                            onClick={()=>props.DeleteCommentBtn(Comment)}>delete</button>
                                        </div>
                                        <br/>
                                        <div className="card bg-light">
                                        <p style={{color:"#282c34"}}>{Comment.comment_textfield}</p>
                                        </div>
                                        <hr/>
                                    </div>)
                            }
                            else{
                                return(
                                    <div id="StudyComment" className="card-body" key={Comment.id} style={{backgroundColor:"#282c34"}}>
                                    <p>{Comment.comment_user} : {moment(Comment.comment_date).format('YYYY-MM-DD')}</p>
                                    <div className="card bg-light">
                                        <p style={{color:"#282c34"}}>{Comment.comment_textfield}</p>
                                    </div>
                                    <hr/>
                                    </div>)
                            } 
                        })}
                    </div>
                }
                
            </section>
            
            <br/>
            <section id="CreateOrModifyComment">
                <div className="card bg-light">
                    <div className="card-body" style={{backgroundColor:"#282c34"}}>
                        
                        {props.ModifyCommentCond ?
                            <form id="ModifyComment" className="mb-4" >
                                <textarea className="form-control" rows="3" 
                                onChange={e=>props.setModifyCommentDescription(e.target.value)} value={props.ModifyCommentDescription}>
                                </textarea>
                            </form>
                            
                            :<form className="mb-4">
                                <textarea className="form-control" rows="3" onChange={e=>props.setCreateCommentDescription(e.target.value)} 
                                placeholder="Join the discussion and leave a comment!" value={props.CreateCommentDescription}>
                                </textarea>
                            </form>
                        }

                        {props.ModifyCommentCond ?
                            <div id="ModifyCommentBtns" className="d-flex justify-content-end">
                                <button className="btn btn-primary" onClick={()=>props.ModifyComment()}>Modify</button>
                            </div> 
                            :<div className="d-flex justify-content-end">
                                <button className="btn btn-success" onClick={()=>props.CreateCommentBtn()}>Write</button>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StudyCommentComp
