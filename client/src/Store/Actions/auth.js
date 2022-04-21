import {
    LOGIN,
    REGISTER,
    CHECKLOGINREQUEST,
    CHECKLOGINSUCCESS,
    CHECKLOGINFAILURE
} from '../Constants/auth'
export function login(payload){
    return{
        type: LOGIN,
        payload,
    }
}
export function register(payload){
    return{
        type: REGISTER,
        payload,
    }
}
export function checkLoginRequest(){
    return{
        type: CHECKLOGINREQUEST
    }
}
export function checkLoginSuccess(payload){
    return{
        type: CHECKLOGINSUCCESS,
        payload
    }
}
export function checkLoginFailure(){
    return{
        type: CHECKLOGINFAILURE
    }
}