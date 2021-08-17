import React,{useState,useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {useHistory} from 'react-router-dom'
import LoginAPI from '../API/LoginAPI'

function Login() {

    const [haveID,setHaveID] = useState(true)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    
    const [usernameCookie,setUsernameCookie] = useCookies(['userId'])
    const [token,setToken] = useCookies(['mytoken'])
    const [idCookie,setIdCookie]=useCookies(['id'])


    let history = useHistory()
    
    useEffect(()=>{
        if(token['mytoken']){
            history.push('/StudyBoard')
        }
    },[token,history])

    const loginForGettingToken =()=>{
        
        const body = {username,password}

        LoginAPI.loginForGettingToken(body)
        .then(resp=>setToken('mytoken',resp.data.token))
        .catch(error=>alert("wrong password"))
        
        setUsernameCookie('userId',username)
        GetUserID()
    }

    const CreateIDForGettingToken =()=>{

        const body = {username,password}
        LoginAPI.CreateIDForGettingToken(body)
        .then(()=>loginForGettingToken())
        .catch(error=>console.log(error))
    }

    const GetUserID = ()=>{
        LoginAPI.GetUserID(username)
        .then(resp=>setIdCookie('id',resp.data['id']))
        .catch(error=>console.log(error))
    }

    return (
        <div className="App">    
        <article id="Login">
            
            <section id="LoginHead">
                <br/>
                <br/>
                {haveID?<h1>Please Login</h1>:<h1>Please Create Account</h1>}
                <br/>
                <br/>
            </section>

            <section id="LoginBody">
                <div id="LoginBodyID"className="mb-3">
                <label htmlFor="username" className="form-label">ID</label>
                <input type="text" className="form-control" id="ID" palceholder="ID"
                    onChange={(e)=>setUsername(e.target.value)}/>
                </div>

                <div id="LoginBodyPassword" className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" palceholder="Please Enter Password"
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                {haveID
                    ?<div id="LoginMode"><button className="btn btn-success" onClick={loginForGettingToken}>Login</button></div>
                    :<div id="CreateAccountMode"><button className="btn btn-primary" onClick={CreateIDForGettingToken}>Create Account</button></div>
                }
                
                {haveID
                    ?<h5>If you Don't have Account, Please <button className="btn btn-primary" onClick={()=>setHaveID(false)}> 
                        Create Account</button> here</h5>
                    :<h5>If you have Account, Please <button className="btn btn-success" onClick={()=>setHaveID(true)}> 
                        Login</button> here</h5>
                }
            </section>
        </article>   
        </div>
    )
}

export default Login
