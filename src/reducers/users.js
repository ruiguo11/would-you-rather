import {RECEIVE_USERS, SAVE_ANSWER, SAVE_QUESTION} from '../actions/users'

export default function users(state={}, action){
    console.log('Users reducer', action)
    switch(action.type){
        
        case RECEIVE_USERS:
          return{    
                ...state,   
                ...action.users            
            };
        


         case SAVE_QUESTION:
            const { question } = action;   
            console.log("Save Question reducer", question)      
                return{
                    ...state,                   
                    [question.author]: {
                        ...state[question.author],
                        questions: [...state[question.author].questions, action.question.id]
                    }
                    
                };
        case SAVE_ANSWER:
            console.log("Save user answer reducer", state[action.authedUser]);
            return{
                ...state,   
                [action.authedUser]:{
                    ...state[action.authedUser],
                    answers:{
                        ...state[action.authedUser].answers,
                        [action.id]:action.answer
                       
                    }
                }
            };
            


        default:
            return state
    }
}

/*  ...users,
          [authedUser]: {
            ...users[authedUser],
            answers: {
              ...users[authedUser].answers,
              [qid]: answer
            }
          }
        }

        */

