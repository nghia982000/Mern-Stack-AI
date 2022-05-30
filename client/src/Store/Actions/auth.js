import {
    LOGIN,
    REGISTER,
    CHECKLOGINREQUEST,
    CHECKLOGINSUCCESS,
    CHECKLOGINFAILURE,
    GET_ACCOUNT,
    GET_ACCOUNT_SUCCESS,
    DELETE_ACCOUNT,
    DELETE_ACCOUNT_SUCCESS
} from '../Constants/auth'
export function login(payload) {
    return {
        type: LOGIN,
        payload,
    }
}
export const register=(dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: REGISTER,
            payload, resolve
        })
    )
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