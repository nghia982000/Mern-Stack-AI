import { INIT_STATE } from "../States/auth"
import {
    CHECKLOGINREQUEST,
    CHECKLOGINSUCCESS,
    CHECKLOGINFAILURE
} from '../Constants/auth'
import {
    BUY_COURSE_SUCCESS
} from '../Constants/course'

export default function authReducers(state=INIT_STATE.auth,action){
    switch (action.type){
        case CHECKLOGINREQUEST:
            return {
                ...state,
                authLoading:false
            }
        case CHECKLOGINSUCCESS:
            // console.log(action.payload)
            return {
                ...state,
                authLoading:true,
                isAuthenticated:true,
                user:action.payload
            }
        case BUY_COURSE_SUCCESS:
            return {
                ...state,
                user:{...state.user,point:action.payload.point}
            }
        case CHECKLOGINFAILURE:
            return {
                ...state,
                authLoading:true,
                isAuthenticated:false,
                user:null
            }
        default:
            return state
    }
}