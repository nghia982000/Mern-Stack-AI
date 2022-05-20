import {
    LOGIN,
    REGISTER,
    CHECKLOGINREQUEST,
    CHECKLOGINSUCCESS,
    CHECKLOGINFAILURE
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