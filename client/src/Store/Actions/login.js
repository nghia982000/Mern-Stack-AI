import {
    LOGIN
} from '../Constants/login'
export function login(payload){
    return{
        type: LOGIN,
        payload,
    }
}