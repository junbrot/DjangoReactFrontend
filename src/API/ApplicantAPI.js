import axios from 'axios'

export default class ApplicantAPI{
    
    static ReadApplicants(id,token){
        return axios.get(`http://localhost:8000/api/Applicants/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static ApplicantBtn = (id,newApply,token) => {
        return axios.post(`http://localhost:8000/api/Applicants/${id}/`,newApply,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    // static ApplicantUserCommit(id,User_key,Applicant,token){
    //     return axios.put(`http://localhost:8000/api/Applicants/${id}/${User_key}/`,Applicant,{
    //         headers:{'Authorization':`Token ${token}`}
    //     })
    // }
    
    // static ApplicantUserDelete(id,User_key,Applicant,token){
    //     return axios.put(`http://localhost:8000/api/Applicants/${id}/${User_key}/`,Applicant,{
    //         headers:{'Authorization':`Token ${token}`}
    //     })
    // }

    static PostStudyMaster(userKey,token){
        return axios.post(`http://localhost:8000/api/Studys/`,{'User_key':userKey},{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static PostStudyMember(Study_id,userKey,token){
        return axios.post(`http://localhost:8000/api/StudyMembers/${Study_id}/`,{'User_key':userKey,'Study_key':Study_id},{
            headers:{'Authorization':`Token ${token}`}
        })
    }
}