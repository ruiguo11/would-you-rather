import {getInitialData} from '../utils/api'
import {getInitialUsers} from '../utils/api'
import {receiveUsers} from '../actions/users'
import {receiveQuestions} from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData(){
    console.log('handleInitialData')
    return (dispatch)=>{
        dispatch(showLoading())
        return getInitialData()
        .then(({users, questions})=>{
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(hideLoading());
        })

    }
}

export function handleInitialUser(){
    console.log('handleInitialUsers')
    return(dispatch) =>{
        dispatch(showLoading());
        return getInitialUsers()
        .then((users) => {
            dispatch(receiveUsers(users));
            dispatch(hideLoading());
        })

    }   
}
