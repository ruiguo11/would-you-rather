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
        const unAnsweredSorted = unAnsweredQuestion.sort((a, b) => b.timestamp - a.timestamp);
        console.log('Dashboard unswered question', unAnsweredSorted); 
       
       
       
        const answeredQuestion = questions.filter(questions => (questions.optionOne.votes.includes(currentUser) ||questions.optionTwo.votes.includes(currentUser)));
        const answeredSorted = answeredQuestion.sort((a, b) => b.timestamp - a.timestamp);
       
       
        

        return (
            <div>
                <Tabs defaultActiveKey="unanswered" id="uncontrolled-tab-example">
                    <Tab eventKey="unanswered" title={
                        <span>Unanswered Questions 
                            <span> </span> 
                            <Badge pill variant="warning">{unAnsweredSorted.length}</Badge>
                        </span>
                        }
                        >  
                   
                        {unAnsweredSorted.map((question) => (
                                <ul key = {question.id}>
                                    <Question id = {question.id}/>
                                </ul>
                            ))}
                    </Tab>
                    <Tab eventKey="Answered" title={
                        <span>Answered Questions  
                            <span> </span> 
                            <Badge pill variant="warning">{answeredSorted.length}</Badge>
                        </span>
                        }
                        >  
                        {answeredSorted.map((question) => (
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