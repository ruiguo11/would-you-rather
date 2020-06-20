import React,  {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import { BrowserRouter as Router, Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {handleInitialData} from '../actions/shared'

import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Navigation from './Navigation '
import Leaderboard from './Leaderboard'
import PageNotFound from './PageNotFound'
import PrivateRoute from './PrivateRoute'


import LoadingBar from 'react-redux-loading'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
 

  componentDidMount(){
    this.props.dispatch(handleInitialData())  
  }




  render(){
    const authedUser = this.props.authedUser;
    return (
     console.log('before router', authedUser),
      
      <Router>
        <Fragment>
          <LoadingBar />
              <Navigation loggedInUser={this.props.authedUser}/>
          <div >
            {this.props.loading ===true
            ? null
            : <div>
              <Switch>
                    <PrivateRoute path='/' exact component = {Dashboard }/>                    
                    <PrivateRoute path='/question/:id' exact  component={QuestionPage}/>
                    <PrivateRoute path='/add' exact component={NewQuestion} />
                    <PrivateRoute path='/leaderboard' exact component={Leaderboard}  />
                    <Route path="/login" component={Login}/>
                    
                    <Route component={PageNotFound} />
        
                  </Switch>
                  </div>
                  
              }
             
          </div>
        </Fragment>
      </Router>
    ) 
  }}

function mapStateToProps({authedUser, users, questions}){
  console.log('app mapStateToPRops' , authedUser, users, questions)
  return{
    authedUser, 
  };
}
export default connect(mapStateToProps)(App)


