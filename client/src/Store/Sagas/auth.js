import { takeLatest, call, put } from 'redux-saga/effects'
import {
    LOGIN,
    REGISTER,
    CHECKLOGINREQUEST,
} from '../Constants/auth'
import {
    checkLoginFailure,
    checkLoginSuccess
} from '../Actions/auth'
import * as apiAuth from '../../Api/auth'
import setAuthToken from '../../Api/until'

function* fetchLoginSaga(action) {
    try {
        const response = yield call(apiAuth.fetchLogin, action.payload)
        console.log(response)
        if (response.data.success) {
            sessionStorage.setItem('token',response.data.accessToken)
            yield put(checkLoginSuccess(response.data.user))
            // if(response.data.role==='manager'){
            //     window.location.href='/admin/course'
            // }else{
            //     window.location.href='/'
            // }
        }

    } catch (err) {
        console.error(err)
        if(err.response){
            console.log(err.response.data)
            alert(err.response.data.message)
        }
        else{
            console.log({success:false,message:err.message})
            alert(err.message)
        }
    }
}
export function* sagaLogin() {
    yield takeLatest(LOGIN, fetchLoginSaga)
}

function* fetchRegisterSaga(action) {
    try {
        const response = yield call(apiAuth.fetchRegister, action.payload)
        console.log(response)
        if (response.data.success) {
            window.location.href='/login'
            alert('Account successfully created')
        }

    } catch (err) {
        console.error(err)
        if(err.response){
            console.log(err.response.data)
            alert(err.response.data.message)
        }
        else{
            console.log({success:false,message:err.message})
            alert(err.message)
        }
    }
}
export function* sagaRegister() {
    yield takeLatest(REGISTER, fetchRegisterSaga)
}

function* fetchCheckLoginSaga() {
    if(sessionStorage['token']){
        setAuthToken(sessionStorage['token'])
    }
    if(!sessionStorage['token']){
        setAuthToken(null)
    }
    try {
        const response = yield call(apiAuth.fetchCheckLogin)
        // console.log(response)
        yield put(checkLoginSuccess(response.data.user))
    } catch (err) {
        console.error(err.response)
        sessionStorage.removeItem('token')
        setAuthToken(null)
        yield put(checkLoginFailure())
    }
}
export function* sagaCheckLogin() {
    yield takeLatest(CHECKLOGINREQUEST, fetchCheckLoginSaga)
}