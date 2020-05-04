import {saveQuestion, saveQuestionAnswer} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
import {addUserQuestion, addUserAnswer} from '../actions/users'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'



export function addQuestion(question){
    console.log('action addQuestion', question)
    return{
        type: ADD_QUESTION,
        question,
    }

}

export function receiveQuestions (questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }
}
export function addAnswer(authedUser, qid, answer){
    return{
        type: ADD_ANSWER,
        authedUser,
        qid,
        answer

    }

}


export function handleAddQuestion(authedUser, optionOne, optionTwo){
    console.log('handleAddQuestion',authedUser,optionOne, optionTwo)
    return(dispatch) =>{
        
        dispatch(showLoading())

        return saveQuestion({
            author: authedUser,
            optionOne: optionOne,
            optionTwo: optionTwo
        })
        .then((question)=>{dispatch(addQuestion(question));
                dispatch(addUserQuestion( question)) ;
                dispatch(hideLoading())})

    }
}


export function handlSaveAnswer(authedUser, qid, answer,){
    console.log('handleSaveAnswer function', authedUser,qid, answer)
  
    return(dispatch) =>{
        dispatch(showLoading())
        
        return saveQuestionAnswer({
            authedUser: authedUser,
            answer: answer,
            qid: qid
        }). then(()=>{
            console.log('handleSaveAnswer', authedUser,qid ,answer, )
            
            dispatch(addAnswer(authedUser, qid, answer));
            dispatch(addUserAnswer(authedUser,qid, answer));
            dispatch(hideLoading())
        })
    }


}