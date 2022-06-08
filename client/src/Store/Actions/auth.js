import {
    LOGIN,
    REGISTER,
    CHECKLOGINREQUEST,
    CHECKLOGINSUCCESS,
    CHECKLOGINFAILURE,
    GET_ACCOUNT,
    GET_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT,
    DELETE_ACCOUNT_SUCCESS,
    CHANGE_PASSWORD,
    DETAIL_ACCOUNT,
    STATE_MONITOR
} from '../Constants/auth'
export const register=(dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: REGISTER,
            payload, resolve
        })
    )
export const changePassword=(dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: CHANGE_PASSWORD,
            payload, resolve
        })
    )
export const login=(dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: LOGIN,
            payload, resolve
        })
    )
export const detailAccount=(dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: DETAIL_ACCOUNT,
            payload, resolve
        })
    )
export function stateMonitor(payload) {
    return {
        type: STATE_MONITOR,
        payload
    }
}
export function checkLoginRequest() {
    return {
        type: CHECKLOGINREQUEST
    }
}
export function checkLoginSuccess(payload) {
    return {
        type: CHECKLOGINSUCCESS,
        payload
    }
}
export function checkLoginFailure() {
    return {
        type: CHECKLOGINFAILURE
    }
}
export function getAccount() {
    return {
        type: GET_ACCOUNT
    }
}
export function getAccountSuccess(payload) {
    return {
        type: GET_ACCOUNT_SUCCESS,
        payload,
    }
}
export function deleteAccount(payload) {
    return {
        type: DELETE_ACCOUNT,
        payload,
    }
}
export function deleteAccountSuccess(payload) {
    return {
        type: DELETE_ACCOUNT_SUCCESS,
        payload,
    }
}