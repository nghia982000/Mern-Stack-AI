import { INIT_STATE } from "../States/auth"
import {
    CHECKLOGINREQUEST,
    CHECKLOGINSUCCESS,
    CHECKLOGINFAILURE,
    GET_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_SUCCESS
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
        case GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                listAccount:action.payload
            }
        case DELETE_ACCOUNT_SUCCESS:
            return {
                ...state,
                listAccount:state.listAccount.filter(account => account._id !== action.payload._id)
            }
        default:
            return state
    }
}