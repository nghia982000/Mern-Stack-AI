import { INIT_STATE } from "../States/auth"
import {
    CHECKLOGINREQUEST,
    CHECKLOGINSUCCESS,
    CHECKLOGINFAILURE,
    GET_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT_SUCCESS,
    DETAIL_ACCOUNT,
    STATE_MONITOR
} from '../Constants/auth'
import {
    BUY_COURSE_SUCCESS
} from '../Constants/course'
import {
    CREATE_ACTIVE_SUCCESS
} from '../Constants/history'

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
        case DETAIL_ACCOUNT:
            return {
                ...state,
                detailAccount:state.listAccount.find((item) => (item._id === action.payload))
            }
        case STATE_MONITOR:
            return {
                ...state,
                stateMonitor:action.payload
            }
        case CREATE_ACTIVE_SUCCESS:
            return {
                ...state,
                user:{
                    ...state.user,
                    point:action.payload
                }
            }
        default:
            return state
    }
}