import React, {Component} from 'react'
import {Card, Col,Row, Table, Badge} from 'react-bootstrap'
import {connect} from 'react-redux'

export class Leaderboard extends Component{

    render(){
        
      
        console.log('Leaderboard', this.props)  
        const userList = this.props.userScores
        return(
            <div className = "leaderboard-container">

                <ol>
                {userList.map((user) => (
                    
                        <li key={user.id}>
                        <Card border="info" style={{ width: '32rem' , marginBottom: 20}}>
                        <Card.Body>
                            <Card.Title className="text-center" >{user.name}</Card.Title>
                            <Row md = "auto">
                                <Col md="auto">
                                    <img
                                        src = {user.avatarURL}
                                        height="60px" width="60px"                                   
                                        alt={'Avatar of ${question.name}'}
                                        className = 'avatar'
                                    /> 
                                </Col>
                                <Col md = "auto">
                                    <Table responsive="sm">
                                    <tbody>
                                        <tr>
                                            <td>Asked questions</td>
                                            <td>{user.questionCount}</td>
                                        </tr>
                                        <tr>
                                            <td>Anaswered questions</td>
                                            <td>{user.answerCount}</td>
                                        </tr>
                                    </tbody>
                                    </Table>
                                </Col>
                                <Col md = "auto">
                                    <Card border="secondary" style = {{width:'6rem'}}>                               
                                        <Card.Header className="text-center" > Score </Card.Header>           
                                              <Badge  >{user.score}</Badge>
                                  
                                    </Card>
                                </Col>
                            </Row>
                            </Card.Body>
                        </Card>
                        </li>
                                      
                    ))} </ol> 
                </div>               
        )       
    }
}

function mapStateToProps(users) {
    
    const userList = users
    console.log('Leaderboard mapStateToProps', userList.users)
    const usersWithScores = Object.values(userList.users).map(user =>({
        id: user.id,
        name: user.name,
        avatarURL: user.avatarURL,
        questionCount: Object.keys(user.questions).length,
        answerCount: Object.keys(user.answers).length,
        score: Object.keys(user.questions).length+Object.keys(user.answers).length
    }))


    //console.log('Leaderboard userlist with score',usersWithScores)
    return {
        userScores: Object.values(usersWithScores).sort((a, b)=> b.score- a.score)
   
        //questionIds: Object.keys(questions).sort((a,b)=> questions[b].timestamp-questions[a].timestamp), 
    }
};
export default connect (mapStateToProps) (Leaderboard);
