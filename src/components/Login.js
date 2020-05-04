import React, {Component} from 'react'
import {handleInitialUser} from '../actions/shared'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {Card} from 'react-bootstrap'
import {handleInitialData} from '../actions/shared'




export class Login extends Component{
    state= {
        authedUser : '',
        loginUser : ''
    };
    
    /*
    componentDidMount(){
        this.props.dispatch(handleInitialUser())
    }
    */

    handleLogin = (e)=>{
        console.log('authed User: ', e)
        this.props.dispatch(setAuthedUser(e))
        this.setState(() =>({
            loginUser: e,
        }));
        
        
    }
    render(){       
        const users = this.props.users
        console.log('Login component users ', users)
        if( users === undefined){
        return <div/>}
      
        return(
            <div className ="login" >
                <Card style={{ width: '30em' }}>
                    <Card.Header>Would you rather</Card.Header>
                    <Card.Body>
                        <Card.Title>Please log into you account to continue</Card.Title>
                        <label >Choose your account:</label> <div/>
                        <select 
                            className='login-user-selection' 
                            onChange={(e) => this.handleLogin(e.target.value)}>
                            <option value=""> Select Your Username</option>
                                {
                                    Object.keys(users).map(user => 
                                    <option className='select-user' key={user} value={user}>
                                        {user}
                                    </option>)}
                            </select>  
                     </Card.Body>
               
                    </Card>
               </div>)
       
    }
}
function mapStateToProps({authedUser, users}){
    return{
        authedUser, 
        users
    };
}
export default connect (mapStateToProps)(Login)


  