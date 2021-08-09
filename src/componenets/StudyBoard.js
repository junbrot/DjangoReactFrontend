import React from 'react'
import Table from 'react-bootstrap/Table';

function StudyBoard(props) {

    return (
        <div>
            <Table striped bordered hover variant="dark" size="sm">
                
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>gatherMember</th>
                </tr>
                </thead>
                
                <tbody>
                
                {props.articles && props.articles.map(article=>{
                    return(
                        <tr key={article.id} 
                            onClick={()=>{props.oneArticleReadBtn(article.userId,article.title,article.description,article.userBigCity
                                    ,article.userSmallCity,article.userDetailCity,article.gatherMember)}}>
                        <td>{article.userId}</td>
                        <td>{article.title}</td>
                        <td>{article.userBigCity} {article.userSmallCity} {article.userDetailCity}</td>
                        <td>{article.gatherMember}</td>
                        </tr>
                    )})
                }
                </tbody>

            </Table>
        </div>
    )
}

export default StudyBoard
