import React,{useState,useEffect} from 'react'
import {useCookies} from 'react-cookie';

function ReadOneArticle(props) {
    
    const [writeComment,setwriteComment] = useState('')
    const [token] = useCookies(['mytoken','userId','id'])

    const[modifyMode,setmodifyMode] = useState(false)
    const[id,setCommentId] = useState('')
    const[StudyBoard_key,setStudyBoard_key] = useState('')
    const[comment_user,setComment_user] = useState('')
    const[User_key,setUser_key] = useState('')
    const[comment_textfield,setcomment_textfield] = useState('')

    const CommentBtn = () => {
        props.CommentBtn(writeComment)
        setwriteComment('')
    }

    const ModifyCommentBtn = (Comment) => {
        // console.log(Comment)
        setCommentId(Comment.id)
        setStudyBoard_key(Comment.StudyBoard_key)
        setComment_user(Comment.comment_user)
        setUser_key(Comment.User_key)
        setcomment_textfield(Comment.comment_textfield)
        setmodifyMode(true)
        // props.ModifyBtn(Comment_id)
    }

    const RegisterModifyBtn = () => {
        var Comment = {id,StudyBoard_key,comment_user,User_key,comment_textfield}
        props.ModifyBtn(Comment)
        setmodifyMode(false)
    }

    const DeleteCommentBtn = (Comment_id) => {
        console.log("delete")
        props.DeleteBtn(Comment_id)
    }

    return (

        <div className="App">
            <section className="mb-5">
                <h2>description : </h2>
                <div className="card bg-light">
                <h3 style={{color:"#282c34"}}>{props.description}</h3>
                </div>

                <br/>
                <h4>location : </h4>
                <div className="card bg-light">
                <h4 style={{color:"#282c34"}}>{props.location}</h4>
                </div>

                <br/>
                <h4>gatherMember : </h4>
                <div className="card bg-light">
                <h4 style={{color:"#282c34"}}>{props.gatherMember}</h4>
                </div>

            </section>

            <div className="d-flex justify-content-end">
            <button className="btn-lg btn-success">Register</button>
            </div>

            <br/>
            <br/>
            <section className="mb-5">
                <div className="card bg-light">

                    {props.Comments && props.Comments.map(Comment=>{
                        var CommentKey = Comment.User_key
                        
                        if(''+CommentKey===token['id']){                        
                            return(
                                <div className="card-body" key={Comment.id} style={{backgroundColor:"#282c34"}}>
                                    <p>{Comment.comment_user} : {Comment.comment_date}</p>
                                    <div className="card bg-light">
                                        <p style={{color:"#282c34"}}>{Comment.comment_textfield}</p>
                                    </div>
                                    <br/>
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-outline-primary" 
                                            onClick={()=>ModifyCommentBtn(Comment)}>modify</button>
                                        <button className="btn btn-outline-warning" onClick={()=>DeleteCommentBtn(Comment.id)}>delete</button>
                                    </div>
                                </div>)
                        }
                        else{
                            return(
                                <div className="card-body" key={Comment.id} style={{backgroundColor:"#282c34"}}>
                                <p>{Comment.comment_user} : {Comment.comment_date}</p>
                                <div className="card bg-light">
                                    <p style={{color:"#282c34"}}>{Comment.comment_textfield}</p>
                                </div>
                                </div>)
                        }
                    })}


                    <div style={{backgroundColor:"#282c34"}}>
                        <br/>
                        <br/>
                    </div>
                    
                    <div className="card-body" style={{backgroundColor:"#282c34"}}>
                        
                        {modifyMode ?
                            <form className="mb-4" >
                                <textarea className="form-control" rows="3" 
                                onChange={e=>setcomment_textfield(e.target.value)} value={comment_textfield}>
                                </textarea>
                            </form>
                            
                            :<form className="mb-4" >
                                <textarea className="form-control" rows="3" onChange={e=>setwriteComment(e.target.value)} 
                                placeholder="Join the discussion and leave a comment!" value={writeComment}>
                                </textarea>
                            </form>
                        }
                        
                        {/* <form className="mb-4" > */}
                            {/* <textarea className="form-control" rows="3" onChange={e=>setwriteComment(e.target.value)}  */}
                                {/* placeholder="Join the discussion and leave a comment!" value={writeComment}> */}
                            {/* </textarea> */}
                        {/* </form> */}
                        
                        {modifyMode ?
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary" onClick={()=>RegisterModifyBtn()}>Modify</button>
                            </div> 
                            :<div className="d-flex justify-content-end">
                                <button className="btn btn-success" onClick={()=>CommentBtn()}>Write</button>
                            </div>
                        }
                    
                        
                    </div>
                </div>
            </section>


        </div>
    )
}

export default ReadOneArticle
