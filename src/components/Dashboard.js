import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import {Tab, Tabs, Badge} from 'react-bootstrap'

class Dashboard extends Component{
    render(){
        console.log('Dashboard', this.props.authedUser);
        const questions = Object.values(this.props.questions);
        console.log('Dashboard', questions);
        

        const currentUser = this.props.authedUser; 
        console.log('Dashboard CurrentUser', currentUser);
        const unAnsweredQuestion = questions.filter(questions => (!questions.optionOne.votes.includes(currentUser) && !questions.optionTwo.votes.includes(currentUser)));
        const answeredQuestion = questions.filter(questions => (questions.optionOne.votes.includes(currentUser) ||questions.optionTwo.votes.includes(currentUser)));

        console.log('Dashboard unswered question', unAnsweredQuestion);
        

        return (
            <div>
                <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example">
                    <Tab eventKey="unanswered" title={
                        <span>Unanswered Questions 
                            <span> </span> 
                            <Badge pill variant="warning">{unAnsweredQuestion.length}</Badge>
                        </span>
                        }
                        >  
                   
                        {unAnsweredQuestion.map((question) => (
                                <ul key = {question.id}>
                                    <Question id = {question.id}/>
                                </ul>
                            ))}
                    </Tab>
                    <Tab eventKey="Answered" title={
                        <span>Answered Questions  
                            <span> </span> 
                            <Badge pill variant="warning">{answeredQuestion.length}</Badge>
                        </span>
                        }
                        >  
                        {answeredQuestion.map((question) => (
                                <ul key ={question.id}>
                                    <Question id = {question.id}/>
                                </ul>
                            ))}
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
function mapStateToProps({questions, authedUser}) {
    
    return {
        questions,
        questionIds: Object.keys(questions).sort((a,b)=> questions[b].timestamp-questions[a].timestamp), 
        
        authedUser
    }
}
export default connect (mapStateToProps)(Dashboard)