import axios from 'axios'

export default class StudyPlannerAPI{


    static getStudyPlanner(id,token){
        return axios.get(`http://localhost:8000/api/StudyPlanners/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static postStudyPlanner(id,PlannerInfo,token){
        return axios.post(`http://localhost:8000/api/StudyPlanners/${id}/`,PlannerInfo,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static putStudyPlanner(id,id2,info,token){
        return axios.put(`http://localhost:8000/api/StudyPlanners/${id}/${id2}/`,info,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static deleteStudyPlanner(id,id2,token){
        return axios.delete(`http://localhost:8000/api/StudyPlanners/${id}/${id2}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static postComponent(id,id2,component_info,token){
        return axios.post(`http://localhost:8000/api/StudyPlannerComponents/${id}/${id2}/`,component_info,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static getStudyPlannerComponent(id,id2,token){
        return axios.get(`http://localhost:8000/api/StudyPlannerComponents/${id}/${id2}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static putComponent(id,id2,id3,component_info,token){
        return axios.put(`http://localhost:8000/api/StudyPlannerComponents/${id}/${id2}/${id3}/`,component_info,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static deleteComponent(id,id2,id3,token){
        return axios.delete(`http://localhost:8000/api/StudyPlannerComponents/${id}/${id2}/${id3}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }
}


