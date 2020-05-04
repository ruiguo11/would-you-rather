import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
} from './_DATA.js'



  export function formatQuestion (question, user) {
    console.log('_api formateQuestion', question, user)
    return {
      author: {
        id: user.id,
        name: user.name,
      },
      avatarURL: user.avatarURL,
      timestamp: Date.now(),
      optionOne: {
        votes: [],
        text: question.optionOne.text,
      },
      optionTwo: {
        votes: [],
        text: question.optionTwo.text,
      }
    }
  }

  export function getInitialData () {
    return Promise.all([
      _getUsers(),
      _getQuestions(),
    ]).then(([users, questions]) => ({
      users,
      questions,
    }))
  }
export function saveQuestion(info){
  console.log("saveQuestion api", info)
  return _saveQuestion(info)
}
export function saveQuestionAnswer(info){
  console.log("saveQuestionAnswer", info)
  return _saveQuestionAnswer(info)
}
export function getInitialUsers(){
  return Promise.all([
    _getUsers()
  ]).then(([users])=>({
    users,
  }))
}