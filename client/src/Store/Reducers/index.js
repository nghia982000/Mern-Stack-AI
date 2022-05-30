import { combineReducers } from "redux"
import authReducers from './auth'
import courseReducers from './course'
import videoReducers from './video'
import commentReducers from './comment'
import exerciseReducers from './exercise'
import quizzesReducers from './quizzes'

export default combineReducers({
    authReducers,
    courseReducers,
    videoReducers,
    commentReducers,
    exerciseReducers,
    quizzesReducers
})