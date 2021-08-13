import axios from 'axios'

export default class LoginAPI{
    
    static loginForGettingToken(body){
        return axios.post(`http://localhost:8000/auth/`,body)
    }

    static GetUserID(username){
        return axios.get(`http://localhost:8000/api/users/${username}/`)
    }

    static CreateIDForGettingToken(body){
        return axios.post(`http://localhost:8000/api/users/`,body)
    }
}