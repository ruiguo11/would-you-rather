import {RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER} from '../actions/questions'

export default function questions(state={}, action){
    switch(action.type){
        
        case RECEIVE_QUESTIONS:
            return{
                ...state,
                ...action.questions
            };
        
        case ADD_QUESTION:
           const {question} = action;
                
             return{
                ...state,
                [question.id]: question,
            };
        case ADD_ANSWER:
            console.log("Save question ansser reducer state", state)
            const { authedUser,answer, qid } = action;
            console.log('save question anwer reducer [qid]',state[qid][answer])
            return{
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat(authedUser)
                
                    }
                }
                
            };
        default:
                return state
    }    
}

