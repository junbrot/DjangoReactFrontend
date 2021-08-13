import React from 'react'
import Table from 'react-bootstrap/Table';

function StudyBoard(props) {

    return (
        <div>
            <Table striped bordered hover variant="dark" size="sm">
                
                <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>Title</th>
                    {/* <th>Location</th> */}
                    <th>gatherMember</th>
                    <th>Apply</th>
                    <th>upload</th>
                </tr>
                </thead>
                
                <tbody>
                
                {props.articles && props.articles.map(article=>{
                    return(
                        <tr className="text-center" key={article.StudyBoard_key} 
                            onClick={()=>props.oneArticleReadBtn(article)}>
                        <td>{article.userId}</td>
                        <td>{article.title}</td>
                        {/* <td>{article.userBigCity} {article.userSmallCity} {article.userDetailCity}</td> */}
                        <td>{article.gatherMember}</td>
                        <td>{article.ApplyMember}</td>
                        <td>{article.uploadDate}</td>
                        </tr>
                    )})
                }
                </tbody>

            </Table>
        </div>
    )
}

export default StudyBoard
