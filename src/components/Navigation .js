import React, {Component} from 'react'

import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import { Route , withRouter} from 'react-router-dom';


export  class  Navigation extends Component{
  
    handleLogout = (e) =>{    
        this.setState(() =>({
            authedUser: null,
        }));
        this.props.dispatch(setAuthedUser(null));
        this.props.history.push('/login');
    }
    render (){
        console.log('Navigation', this.props.authedUser);
        const authedUser = this.props.authedUser;
        console.log('Navigation authedUser', authedUser);
        if(authedUser === null){
            return(
                <p> Please sign in </p>
            )
        }
        
        return(
    
            <nav className="navBar" style={ {marginBottom: 50}}>
                <ul>
                        <ul>
                            < li>
                                <NavLink to ='/' exact activeClassName='active'>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to ='/add' exact activeClassName='active'>
                                    New Question
                            </NavLink>
                            </li>
                            <li>
                                <NavLink to ='/leaderboard' exact activeClassName='active'>
                                    LeaderBoard
                            </NavLink>
                            </li>  
                        </ul>

                        <h6 className="logInText" >Hello </h6>
                        <h6 className= "logInText">{this.props.authedUser}</h6>
                        <button className="btn-logout" 
                            onClick={(e) => this.handleLogout(e.target.value)}>
                            Logout</button>
                      
                </ul>     
        </nav>
        )
    }      
}

function mapStateToProps({authedUser, users}){
    return{
        authedUser,
        users
    }
}
export default withRouter(connect (mapStateToProps)(Navigation));