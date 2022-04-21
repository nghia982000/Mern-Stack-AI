import { combineReducers } from "redux"
import authReducers from './auth'
import courseReducers from './course'
import videoReducers from './video'
export default combineReducers({
    authReducers,
    courseReducers,
    videoReducers
})