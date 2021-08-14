import React,{useState,useEffect} from 'react';
import {useCookies} from 'react-cookie';
import axios from 'axios';

function CreateArticle(props) {
    
    const[token] = useCookies(['mytoken','userId','id'])
    const[title,setTitle] = useState('')
    const[description,setDescription] = useState('')
    const[gatherMember,setGatherMember] = useState('')
    const[duration,setDuration] = useState('')

    const CreateBtn = () =>{
        
        const userId = token['userId']
        const mytoken = token['mytoken']
        const User_key = token['id']
        const newArticle = {
            'User_key': User_key,
            userId,title,description,gatherMember,duration
        }

        axios.post(`http://localhost:8000/api/StudyBoard/`,
            newArticle,
            {headers:{'Authorization':`Token ${mytoken}`}}
        ).then(()=>props.RefreshBtn())
    }

    const ModifyBtn = () =>{
        
        const userId = token['userId']
        const User_key = token['id']
        const ModifiedArticle = {
            'User_key': User_key,
            userId,title,description,gatherMember,duration
        }
        props.ModifyBtn(ModifiedArticle)
    }
    
    useEffect(()=>{
        if(props.ArticleInfo)
        {
            setTitle(props.ArticleInfo.title)
            setDescription(props.ArticleInfo.description)
            setGatherMember(props.ArticleInfo.gatherMember)
            setDuration(props.ArticleInfo.duration)
        }
    },[])

    const DeleteBtn = () => {

        props.DeleteBtn()
    }
    
    return (
        
        <div className="CreateArticle">

            <div className="mb-3">
            <label htmlFor="Title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Please Enter The Title"
                 value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            
            <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="5" placeholder="Please Enter Description"
                value={description} onChange = {e=>setDescription(e.target.value)}/>
            </div>
          
            <br/>
            <div className="row">     
                <div className="col-sm-6">
                <label htmlFor="gatherMember" className="form-label">Gather Member(including you) :</label>
                <input type="number" className="form-control" id="Gather" placeholder="Number only..." 
                    value={gatherMember} onChange={e=>setGatherMember(e.target.value)}>
                </input>
                </div>
            </div>
            
            <br/>
            <div className="row">     
                <div className="col-sm-6">
                <label htmlFor="gatherMember" className="form-label">Duration :</label>
                <input type="number" className="form-control" id="Duration" placeholder="30 ~ 90 days" 
                    value={duration} onChange={e=>setDuration(e.target.value)}>
                </input>
                </div>
            </div>
                
            <br/>
            
            {props.ArticleInfo
                ?<div className="d-flex justify-content-start">
                <button className="btn-lg btn-success" onClick={ModifyBtn}>Modify</button>
                <button className="btn-lg btn-danger" onClick={DeleteBtn}>Delete</button>
                </div>
            
                :<div className="d-flex justify-content-start">
                <button className="btn-lg btn-success" onClick={CreateBtn}>Submit</button>
                </div>
            }   
        </div>
    )
}

export default CreateArticle
