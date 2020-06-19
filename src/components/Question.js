import React, {Component} from 'react'
import {connect} from 'react-redux'
import {formatQuestion} from '../utils/api'
import {Card, Container, Col, Row, } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'



class Question extends Component{
    state = {
        toQuestionPage: false,
    }
    
    handleViewQuestion = (e) =>{
        this.setState(() => ({
            toQuestionPage : true
        })); 
        
    } 

   
    render(){    
        //console.log('Question users', this.props.users)
        const question = this.props.question
        
        //console.log('Question question', question)

        if(this.state.toQuestionPage === true){
            return <Redirect to={`/question/${this.props.id}`} />
        }


        if(question ===null){
            return <p>This question doesn's existed</p>
        } 

        return(
           <div className ='question'>
            
                <Card border="secondary" style = {{width:'25rem', margintop: 20}}>
                  <Card.Title > {question.author.name} asks</Card.Title>
                  <Container>
                      <Row>
                      <Col md="auto">
                    <img
                        src = {question.avatarURL}
                        height="60px" width="60px"                                   
                        alt={'Avatar of ${question.name}'}
                        className = 'avatar'
                       /> 
                        </Col>
                    <Col>
                    <h3>Would you rather</h3>
                    <p>{question.optionOne.text} </p>
                    <h5>or</h5>                    
                    <p> {question.optionTwo.text}?</p>
                    </Col>
                    </Row>
                    <Row onClick ={this.handleViewQuestion }>
                        <button>View Poll</button>
                    </Row>
                    
                </Container>  
                  </Card>
                    
            </div>
        )
    }
}
function mapStateToProps({authedUser, users, questions}, {id}){
    const question = questions [id]

    //console.log('mapStateToProps', question, users, authedUser);
    return{
        authedUser,
        users,
        question: question
           ? formatQuestion(question, users[question.author])
            : null
    }
}

export default connect(mapStateToProps)(Question)
