import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handlSaveAnswer} from '../actions/questions'
import {Card, Button, Row, Col, ProgressBar, Container, Badge, Form } from 'react-bootstrap'


import {Redirect} from 'react-router-dom'

class QuestionPage extends Component{
    constructor(props) {
        super(props);
    }
    
    state={
        toHome: false,
        answer: null,
        
    }
     toParent = (e) =>{
         e.preventDefault()
         
        console.log('question details', e)
     }
   
     handleGoBack = (e) =>{
        this.setState(() => ({
            toHome : true
        })); 
        
    } 
    handleSaveAnswer = (e) =>{ 
        console.log('handleSaveAnswer', this.props.authedUser, this.state.answer, this.props.id)
        
        this.props.dispatch(handlSaveAnswer(this.props.authedUser,this.props.id, this.state.answer) )
      
        e.preventDefault()
        return <Redirect to='/question/${this.props.id}' />

    }


    onOptionChange = (e) => {
        
        console.log('onOptionChange', e.target.value)
        const value = e.target.value
        this.setState(() => ({
            answer: value })); 
            

    }

    render (){ 
       
        console.log('QuestionPage', this.props);
        if (this.state.toHome === true) {
            return <Redirect to='/' />
          }
        
        const loggedUser = this.props.authedUser
        const question = this.props.questions[this.props.id]
       
        
       
        const voteOne = question.optionOne.votes.length
        const voteTwo = question.optionTwo.votes.length
        const voteTotal = voteOne+ voteTwo
        const myVoteOne = question.optionOne.votes.includes(loggedUser)

        //console.log('Votetotoal', voteTotal, voteOne, voteTwo)

        if (question.optionOne.votes.includes(loggedUser)||question.optionTwo.votes.includes(loggedUser) ){
            return(
                <div>
                    <Card border="secondary" style = {{width:'25rem'}}>
                        <Card.Title>{this.props.users[question.author].name} Asks</Card.Title>
                        <Container>
                            <Row>
                                <Col md="auto">
                                    <img
                                    src = {this.props.users[question.author].avatarURL}
                                    height="60px" width="60px"                                   
                                    alt={'Avatar of ${question.name}'}
                                    className = 'avatar'
                                    /> 
                                </Col>
                                <Col>
                                    <h3>Would you rather</h3>
                                    <Card border="secondary" style = {{width:'23rem', marginBottom: 20}}>                                  
                                        <p>{question.optionOne.text}
                                            {myVoteOne
                                            ?<Badge pill variant="warning">Your vote</Badge>
                                            :null }                 
                                         </p>
                                        <ProgressBar now= {(voteOne/voteTotal*100)}
                                        label = {(voteOne/voteTotal)*100}/> 
                                        <p>{voteOne} out of {voteTotal} votes</p>
                                        
                                    </Card> 
                                       
                                    <Card border="secondary" style = {{width:'23rem', marginBottom: 20}}>    
                                        <p> {question.optionTwo.text}
                                            {myVoteOne
                                                ?null
                                                : <Badge pill variant="warning">Your vote</Badge>}</p>
                                        <ProgressBar now= {(voteTwo/voteTotal*100)}
                                            label = {(voteTwo/voteTotal)*100}/> 
                                            <p>{voteTwo} out of {voteTotal} votes</p>
                                    </Card>
                                </Col>
                            </Row>               
                        </Container>                  
                    <Button className="justify-content-md-center" onClick= {this.handleGoBack}>Back</Button> 
        
                    </Card>
                    
                </div>
            )
        }
        else{
            return(
                <div>
                    <Card border="secondary" style = {{width:'25rem'}}>
                        <Card.Title>{this.props.users[question.author].name} Asks</Card.Title>

                        <Container>
                            <Row>
                                <Col md="auto">
                                    <img
                                    src = {this.props.users[question.author].avatarURL}
                                    height="60px" width="60px"                                   
                                    alt={'Avatar of ${question.name}'}
                                    className = 'avatar'
                                    /> 
                                </Col>
                                <Col>
                                    <h3>Would you rather</h3>
                                    <Form.Group as={Row} onSubmit= {this.handleSaveAnswer}>
                                    
                                    <Col sm={10}>
                                        <Form.Check
                                        type="radio"
                                        label={`${question.optionOne.text}` }
                                        name="formHorizontalRadios"
                                        id={`optionOne`}
                                        value = {`optionOne`}
                                        onChange= {this.onOptionChange}
                                        />
                                        <Form.Check
                                        type="radio"
                                        label={`${question.optionTwo.text}` }
                                        name="formHorizontalRadios"
                                        id={`optionTwo`}
                                        value = {'optionTwo'}
                                        onChange= {this.onOptionChange}
                                        />
                                    </Col>
                                    </Form.Group>

                                    <Button className="btn btn-default" type="submit" id = "btn_submit" onClick = {this.handleSaveAnswer}>
                                        Answer</Button>
                                
                              </Col>  
                            
                        </Row>
                        </Container>
                   
                    </Card>
                    
                </div>
              )

        }
    }
}
function mapStateToProps({authedUser, questions, users}, props){
    const {id} = props.match.params

    return{
        id,
        users,
        questions,
        authedUser,
 
    }
}

export default connect(mapStateToProps)(QuestionPage);