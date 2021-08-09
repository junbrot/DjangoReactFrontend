import React,{useState} from 'react';
import {useCookies} from 'react-cookie';
import axios from 'axios';

function CreateArticle(props) {
    
    const[token] = useCookies(['mytoken','userId'])
    const[title,setTitle] = useState('')
    const[description,setDescription] = useState('')
    const[userBigCity,setUserBigCity] = useState('서울')
    const[userSmallCity,setUserSmallCity] = useState('강서구')
    const[userDetailCity,setUserDetailCity] = useState('')
    const[gatherMember,setGatherMember] = useState('')

    const BigCity = [
        {id:1,name:'서울'},
        {id:2,name:'     '},
    ]

    const SmallCity = [
        {id:1,name:'강서구'},
        {id:2,name:'양천구'},
        {id:3,name:'구로구'},
        {id:4,name:'영등포구'},
        {id:5,name:'금천구'},
        {id:6,name:'동작구'},
        {id:7,name:'관악구'},
        {id:8,name:'서초구'},
        {id:9,name:'강남구'},
        {id:10,name:'송파구'},
        {id:11,name:'강동구'},
        {id:12,name:'광진구'},
        {id:13,name:'성동구'},
        {id:14,name:'용산구'},
        {id:15,name:'마포구'},
        {id:16,name:'은평구'},
        {id:17,name:'서대문구'},
        {id:18,name:'중구'},
        {id:19,name:'종로구'},
        {id:22,name:'노원구'},
        {id:23,name:'강북구'},
        {id:24,name:'성북구'},
        {id:25,name:'도봉구'},
        {id:26,name:'     '},
    ]
    
    const CreateBtn = () =>{
        
        const userId = token['userId']
        const mytoken = token['mytoken']
        const newArticle = {userId,title,description,userBigCity,userSmallCity,userDetailCity,gatherMember}
        axios.post(`http://localhost:8000/api/StudyBoard/`,
            newArticle,
            {headers:{'Authorization':`Token ${mytoken}`}}
        ).then(()=>props.CreateBtn())
    }

    return (
        
        <div className="CreateArticle">

            <div className="mb-3">
            <label htmlFor="Title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" placeholder="Please Enter The Title"
                onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            
            <div className="mb-3">
            <label htmlFor="Description" className="form-label">Description</label>
            <textarea className="form-control" id="description" rows="5"
                onChange = {e=>setDescription(e.target.value)}/>
            </div>

            <br/>
            <div className="row">
                <div className="col-sm-2">
                <label htmlFor="BigCity" className="form-label" >BigCity :</label>
                <select style={{marginLeft:"10px"}} onChange={e=>setUserBigCity(e.target.value)}>
                    {BigCity.map(city=>{
                        return <option key={city.id}>{city.name}</option>
                    })}
                </select>
                </div>

                <div className="col-sm-2">
                <label htmlFor="smallCity" className="form-label">smallCity :</label>
                <select style={{marginLeft:"10px"}} onChange={e=>setUserSmallCity(e.target.value)}>
                    {SmallCity.map(city=>{
                        return <option key={city.id}>{city.name}</option>
                    })}
                </select>
                </div>
            </div>
        
            <br/>
            <div className="row">
                <div className="col-sm-6">
                <label htmlFor="detailCity" className="form-label">detailCity :</label>
                <input type="text" className="form-control" id="Detail" placeholder="Write Detail..." 
                    onChange={e=>setUserDetailCity(e.target.value)}>
                </input>
                </div>
            </div>
            
            <br/>
            <div className="row">     
                <div className="col-sm-6">
                <label htmlFor="gatherMember" className="form-label">Gather Member(including you) :</label>
                <input type="number" className="form-control" id="Gather" placeholder="Number only..." 
                    onChange={e=>setGatherMember(e.target.value)}>
                </input>
                </div>
            </div>
            
            <br/>
            <div className="d-flex justify-content-start">
            <button className="btn-lg btn-success" onClick={CreateBtn}>Submit</button>
            </div>

        </div>
    )
}

export default CreateArticle
