import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'

function Login() {

    const [haveID,setHaveID] = useState(true)
    const [username,setUsername] = useState('')
    const [usernameCookie,setUsernameCookie] = useCookies(['userId'])
    const [password,setPassword] = useState('')
    const [token,setToken] = useCookies(['mytoken'])
    const [idCookie,setidCookie]=useCookies(['id'])

    let history = useHistory()

    const loginForGettingToken =()=>{
        
        const body = {username,password}

        axios.post(`http://localhost:8000/auth/`,body)
        .then(resp=>setToken('mytoken',resp.data.token))
        .then(()=>setUsernameCookie('userId',username))
        .then(()=>GetUserID())
        .catch(error=>console.log(error))
    }

    const CreateIDForGettingToken =()=>{

        const body = {username,password}

        axios.post(`http://localhost:8000/api/users/`,body)
        .then(()=>loginForGettingToken())
        .catch(error=>console.log(error))
    }

    const GetUserID = ()=>{
        axios.get(`http://localhost:8000/api/users/`)
        .then((resp)=>{
            resp.data.map(user=>{
                if(user.username === username)
                    setidCookie('id',user.id)
            })
        })
        .catch(error=>console.log(error))
    }

    useEffect(()=>{
        if(token['mytoken']){
            history.push('/StudyBoard')
        }
    },[token])

    return (
        <div className="Login">
            <br/>
            <br/>
            {haveID?<h1>Please Login</h1>:<h1>Please Create Account</h1>}
            <br/>
            <br/>

            <div className="mb-3">
            <label htmlFor="username" className="form-label">ID</label>
            <input type="text" className="form-control" id="ID" palceholder="ID"
                onChange={(e)=>setUsername(e.target.value)}/>
            </div>

            <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" palceholder="Please Enter Password"
                onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            {haveID?<button className="btn btn-success" onClick={loginForGettingToken}>Login</button>
                :<button className="btn btn-primary" onClick={CreateIDForGettingToken}>Create Account</button>}
            
            {haveID?<h5>If you Don't have Account, Please <button className="btn btn-primary" onClick={()=>setHaveID(false)}> 
                Create Account</button> here</h5>
                :<h5>If you have Account, Please <button className="btn btn-success" onClick={()=>setHaveID(true)}> 
                Login</button> here</h5>}
                
        </div>
    )
}

export default Login
