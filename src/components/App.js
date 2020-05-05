import React,  {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {handleInitialData} from '../actions/shared'

import Dashboard from './Dashboard'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Navigation from './Navigation '
import Leaderboard from './Leaderboard'
import PageNotFound from './PageNotFound'


import LoadingBar from 'react-redux-loading'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
 

  componentDidMount(){
    this.props.dispatch(handleInitialData())  
  }

  render(){
    const {authedUser}  = this.props;
    return (
      console.log('before router', this.props),
      
      <Router>
        <Fragment>
          <LoadingBar />
          <div >
            <Navigation />
            <Switch>
              {authedUser === null
                ? <Route path='/' exact component={Login} />
                : <>
                  
                    <Route path='/' exact component = {Dashboard } />
                    
                    <Route path='/question/:id' exact component={QuestionPage} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' exact component={Leaderboard} />
                   
                  </>
                  
              }
              <Route component={PageNotFound} />
          </Switch>
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


