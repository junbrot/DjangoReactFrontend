import axios from 'axios'

export default class StudyCommentAPI{

    static getStudyComment(id,token){
        return axios.get(`http://localhost:8000/api/StudyComments/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static postStudyComment(id,info,token){
        return axios.post(`http://localhost:8000/api/StudyComments/${id}/`,info,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static putStudyComment(id,id2,info,token){
        return axios.put(`http://localhost:8000/api/StudyComments/${id}/${id2}/`,info,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static deleteStudyComment(id,id2,token){
        return axios.delete(`http://localhost:8000/api/StudyComments/${id}/${id2}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }  
}


