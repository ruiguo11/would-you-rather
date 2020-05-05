import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'
import {Redirect} from 'react-router-dom'
import {Card, Container, Col, Row, Button} from 'react-bootstrap'

class NewQuestion extends Component{

    state={
        optionOne: '',
        optionTwo: '',
        toHome: false,
    }

    handleOptionOneChange = (e)=>{
        const optionOne= e.target.value
        this.setState(() => ({       
               optionOne: optionOne,
            }));

    }
    handleOptionTwoChange=(e)=>{
        const optionTwo = e.target.value

        this.setState(() => ({
          optionTwo: optionTwo,
        }));

    }
    handleSubmit = (e) =>{
        e.preventDefault()
    
        
       
        console.log('handleSubmit', this.state.optionOne, this.state.optionTwo)
        this.props.dispatch(handleAddQuestion(this.props.authedUser, this.state.optionOne, this.state.optionTwo) )   
        this.setState(() => ({    
            optionOne: '', 
            optionTwo: '',
            toHome : true,
            
        }));
    }

    
    render(){
        if (this.state.toHome === true) {
            return <Redirect to='/' />
          }
        return(

            <div >
                <Card border="secondary" style = {{width:'25rem'}}>
                <Card.Header>Create a new Question</Card.Header>
                <Card.Body>
                    <Card.Title>Would you rather?</Card.Title>
                    <div>
                            <input
                                placeholder = "Option One"
                                value={this.state.optionOne}
                                onChange = {this.handleOptionOneChange}
                                className= 'textOne'/>
                            </div>
                        <div>
                            <label>
                                or
                            </label>
                        </div>
                        <div>
                            <input
                                placeholder = "Option Two"
                                value={this.state.optionTwo}
                                onChange = {this.handleOptionTwoChange}
                                className= 'textTwo'/>
                        </div>
                    <Button variant="primary" 
                    disabled ={this.state.optionOne ===''|| this.state.optionTwo===''}
                    onClick = {this.handleSubmit}>
                    SUBMIT</Button>
                </Card.Body>
                </Card>
            </div>
        )
    }
}
function mapStateToProps({ authedUser }) {
    return {
      authedUser
    };
  }
export default connect(mapStateToProps) (NewQuestion);


