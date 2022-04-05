import { takeLatest, call, put } from 'redux-saga/effects'
import {
    LOGIN
} from '../Constants/login'
import * as apiLogin from '../../Api/login'

function* fetchLoginSaga(action) {
    try {
        const response = yield call(apiLogin.fetchLogin, action.payload)
        console.log(response)
        // if (response.data.success) {
        //     sessionStorage.setItem('token',response.data.accessToken)
        //     window.location.href='/'
        // }

    } catch (err) {
        console.error(err)
        // if(err.response){
        //     console.log(err.response.data)
        //     alert(err.response.data.message)
        // }
        // else{
        //     console.log({success:false,message:err.message})
        //     alert(err.message)
        // }
    }
}
export function* sagaLogin() {
    yield takeLatest(LOGIN, fetchLoginSaga)
}