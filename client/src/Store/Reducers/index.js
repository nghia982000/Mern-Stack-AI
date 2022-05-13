import { combineReducers } from "redux"
import authReducers from './auth'
import courseReducers from './course'
import videoReducers from './video'
import commentReducers from './comment'

export default combineReducers({
    authReducers,
    courseReducers,
    videoReducers,
    commentReducers
})