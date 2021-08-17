import axios from 'axios'

export default class StudyBoardAPI{

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


