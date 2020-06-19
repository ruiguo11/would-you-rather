function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  
export  function formatQuestion (question, user,authedUser) {
  //console.log('formateQuestion user', user)
  //console.log('formateQuestion question', question)
  const {name, avatarURL } = user
    return {
      id : generateUID,
      timestamp: Date.now(),
      name,
      avatarURL,
      optionOne: question.optionOne,
      optionTwo: question.optionTwo
    }
  }