import axios from 'axios'

export default class StudyPlannerAPI{

    // static getStudyBoardList(token){
    //     return axios.get(`http://localhost:8000/api/StudyBoard/`,{
    //         headers:{'Authorization':`Token ${token}`}
    //     })
    // }
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

    static getStudyPlanner(id,token){
        return axios.get(`http://localhost:8000/api/StudyPlanners/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static getStudyPlannerComponent(id,id2,token){
        return axios.get(`http://localhost:8000/api/StudyPlannerComponents/${id}/${id2}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    // static getStudyPlannerComponent(Study_key,Study_Planner_key,token){
        // return axios.get(`http://localhost:8000/api/StudyPlannerComponents/${Study_key}/${Study_Planner_key}/`,{
            // headers:{'Authorization':`Token ${token}`}
        // })
    // }

}


