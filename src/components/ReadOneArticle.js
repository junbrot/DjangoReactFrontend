import React,{useState} from 'react'

function ReadOneArticle(props) {
    
    const [writeComment,setwriteComment] = useState('')

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
                        return( 
                            <div className="card-body" key={Comment.id} style={{backgroundColor:"#282c34"}}>
                                <p>{Comment.comment_user} : {Comment.comment_date}</p>
                                <div className="card bg-light">
                                    <p style={{color:"#282c34"}}>{Comment.comment_textfield}</p>
                                </div>
                            </div>
                        )
                    })}

                    <div style={{backgroundColor:"#282c34"}}>
                        <br/>
                        <br/>
                    </div>

                    <div className="card-body" style={{backgroundColor:"#282c34"}}>
                        <form className="mb-4" >
                            <textarea className="form-control" rows="3" onChange={e=>setwriteComment(e.target.value)} 
                                placeholder="Join the discussion and leave a comment!">
                        </textarea></form>
                        <div className="d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={()=>props.CommentBtn(writeComment)}>Write</button>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default ReadOneArticle
