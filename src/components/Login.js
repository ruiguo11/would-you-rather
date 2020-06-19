import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import {Card} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import { withRouter } from 'react-router';


export class Login extends Component{
    state= {
        authedUser : '',
        loginUser : '',
        redirectToReferrer: false
    };
    

    handleLogin = (e)=>{
        console.log('authed User: ', e)
        this.props.dispatch(setAuthedUser(e))
        this.setState(() =>({
            loginUser: e,
            redirectToReferrer: true
        }));
    
        
    }
    render(){       
        const users = this.props.users
       
        const { authedUser,location } = this.props
        const { from } = location.state || { from: { pathname: '/' }}
    

        const { redirectToReferrer } = this.state
        console.log('Login component users from ',  redirectToReferrer, from, this.props, authedUser)

        console.log('props history', this.props.history, from)
       
        if (authedUser !==null){
            
            return <Redirect to= {from}/>
        }
      else{
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
}
function mapStateToProps({authedUser, users}){
    return{
        authedUser, 
        users
    };
}
export default withRouter( connect (mapStateToProps)(Login));


  