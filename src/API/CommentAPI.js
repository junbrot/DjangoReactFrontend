import axios from 'axios'

export default class CommentAPI{
    
    static ReadComments(id,token){
        return axios.get(`http://localhost:8000/api/Comments/${id}/`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static PostCommentBtn(newComment,token){
        return axios.post(`http://localhost:8000/api/Comments/`,newComment,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static ModifyCommentBtn(Comment,id,comment_id,token){
        return axios.put(`http://localhost:8000/api/Comments/${id}/${comment_id}/`,Comment,{
            headers:{'Authorization':`Token ${token}`}
        })
    }

    static DeleteCommentBtn(Comment_id,id,token){
        return axios.delete(`http://localhost:8000/api/Comments/${id}/${Comment_id}`,{
            headers:{'Authorization':`Token ${token}`}
        })
    }
}