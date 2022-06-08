import {
    GET_LIST_TEST_RESULT_REQUEST,
    GET_LIST_TEST_RESULT_SUCCESS,
    CREATE_ACTIVE,
    CREATE_ACTIVE_SUCCESS,
    GET_LIST_ACCTIVE,
    SAVE_LIST_ACCTIVE
} from '../Constants/history'

export function getListTestResultRequest(payload){
    return{
        type: GET_LIST_TEST_RESULT_REQUEST,
        payload
    }
}
export function getListTestResultSuccess(payload){
    return{
        type: GET_LIST_TEST_RESULT_SUCCESS,
        payload
    }
}
export function createActiveSuccess(payload){
    return{
        type: CREATE_ACTIVE_SUCCESS,
        payload
    }
}
export function getListAcctive(payload){
    return{
        type: GET_LIST_ACCTIVE,
        payload
    }
}
export function saveListAcctive(payload){
    return{
        type: SAVE_LIST_ACCTIVE,
        payload
    }
}
export const createActive=(dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: CREATE_ACTIVE,
            payload, resolve
        })
    )