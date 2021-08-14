import axios from 'axios'

export default class StudyBoardAPI{

    // static getStudyID(id,mytoken){

    //     return axios.get(`http://localhost:8000/api/Studys/${id}/`,{
    //         headers:{'Authorization':`Token ${mytoken}`}
    //     })
    // }

    // static getStudyMemberID(id,token){
    //     return axios.get(`http://localhost:8000/api/StudyMemberForKey/${id}/`,{
    //         headers:{'Authorization':`Token ${token}`}
    //     })
    // }

    static getStudyBoardList(token){
        return axios.get(`http://localhost:8000/api/StudyBoard/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static getOneStudyBoard(token,id){
        return axios.get(`http://localhost:8000/api/StudyBoard/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static ModifyBtn(ModifiedArticle,id,token){
        return axios.put(`http://localhost:8000/api/StudyBoard/${id}/`,ModifiedArticle,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static DeleteBtn(id,token){
        return axios.delete(`http://localhost:8000/api/StudyBoard/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }
        
}


