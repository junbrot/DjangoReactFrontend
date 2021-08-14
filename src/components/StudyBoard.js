import React from 'react'
import Table from 'react-bootstrap/Table';
import moment from 'moment';

function StudyBoard(props) {

    return (
        <div>
            <Table striped bordered hover variant="dark" size="sm">
                
                <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>Title</th>
                    <th>gatherMember</th>
                    <th>Apply</th>
                    <th>upload</th>
                    <th>duration</th>
                </tr>
                </thead>
                
                <tbody>
                
                {props.articles && props.articles.map(article=>{
                    return(
                        <tr className="text-center" key={article.StudyBoard_key} 
                            onClick={()=>props.oneArticleReadBtn(article)}>
                        <td>{article.userId}</td>
                        <td>{article.title}</td>
                        <td>{article.gatherMember}</td>
                        <td>{article.ApplyMember}</td>
                        <td>{moment(article.uploadDate).format('YYYY-MM-DD')}</td>
                        <td>{article.duration} days</td>
                        </tr>
                    )})
                }
                </tbody>

            </Table>
        </div>
    )
}

export default StudyBoard
