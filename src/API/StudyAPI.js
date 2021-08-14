import axios from 'axios'

export default class StudyAPI{
    
    static getStudyID(id,token){
        return axios.get(`http://localhost:8000/api/Studys/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static modifyStudyID(id,token,StudyInfo){
        console.log(StudyInfo)
        return axios.put(`http://localhost:8000/api/Studys/${id}/`,StudyInfo,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static getStudyMemberID(id,token){
        return axios.get(`http://localhost:8000/api/StudyMemberForKey/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }


}