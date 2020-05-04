export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SAVE_QUESTION= 'SAVE_QUESTION'
export const SAVE_ANSWER= 'SAVE_ANSWER'


export function receiveUsers(users){
    console.log('action receivedIsers', users)
    return{
        type: RECEIVE_USERS,
        users,      
    }
}



export function addUserQuestion (question) {
    console.log('addUserQuestion', question)
    return {
        type: SAVE_QUESTION,
        question,
    }
  }

export function addUserAnswer(authedUser, qid, answer){
    console.log('AddUSerAnswer action', authedUser, qid, answer)
    return{
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
        
       
    }
}
