import { INIT_STATE } from "../States/history"
import {
    GET_LIST_TEST_RESULT_SUCCESS,
    SAVE_LIST_ACCTIVE
} from '../Constants/history'

export default function historyReducers(state=INIT_STATE,action){
    switch (action.type){
        case GET_LIST_TEST_RESULT_SUCCESS:
            return {
                ...state,
                listTestResult:action.payload
            }
        case SAVE_LIST_ACCTIVE:
            return {
                ...state,
                listAcctive:action.payload
            }
        default:
            return state
    }
}