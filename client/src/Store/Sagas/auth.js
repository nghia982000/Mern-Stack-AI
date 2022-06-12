import { takeLatest, call, put } from 'redux-saga/effects'
import {
    LOGIN,
    REGISTER,
    CHECKLOGINREQUEST,
    GET_ACCOUNT,
    DELETE_ACCOUNT,
    CHANGE_PASSWORD,
    DETAIL_ACCOUNT
} from '../Constants/auth'
import {
    checkLoginFailure,
    checkLoginSuccess,
    getAccountSuccess,
    deleteAccountSuccess
} from '../Actions/auth'
import * as apiAuth from '../../Api/auth'
import setAuthToken from '../../Api/until'

function* fetchLoginSaga({ payload, resolve }) {
    try {
        const response = yield call(apiAuth.fetchLogin, payload)
        // console.log(response)
        if (response.data.success) {
            sessionStorage.setItem('token',response.data.accessToken)
            yield put(checkLoginSuccess(response.data.user))
        }

    } catch (err) {
        console.error(err)
        resolve(err.response.data)
    }
}
export function* sagaLogin() {
    yield takeLatest(LOGIN, fetchLoginSaga)
}
function* fetchDetailAccountSaga({ payload, resolve }) {
    try {
        const response = yield call(apiAuth.detailAccount, payload)
        resolve(response.data)
    } catch (err) {
        console.error(err)
        resolve(err.response.data)
    }
}
export function* sagaDetailAccount() {
    yield takeLatest(DETAIL_ACCOUNT, fetchDetailAccountSaga)
}

function* fetchRegisterSaga({ payload, resolve }) {
    try {
        const response = yield call(apiAuth.fetchRegister,payload)
        // console.log(response)
        resolve(response.data)

    } catch (err) {
        console.error(err)
        resolve(err.response.data)
    }
}
export function* sagaRegister() {
    yield takeLatest(REGISTER, fetchRegisterSaga)
}
function* fetchChangePasswordSaga({ payload, resolve }) {
    try {
        const response = yield call(apiAuth.changePassword,payload)
        resolve(response.data)

    } catch (err) {
        console.error(err)
        resolve(err.response.data)
        
    }
}
export function* sagaChangePassword() {
    yield takeLatest(CHANGE_PASSWORD, fetchChangePasswordSaga)
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

function* fetchGetAccount() {
    try {
        const response = yield call(apiAuth.getAccount)
        // console.log(response)
        yield put(getAccountSuccess(response.data.data))
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
export function* sagaGetAccount() {
    yield takeLatest(GET_ACCOUNT, fetchGetAccount)
}
function* fetchDeleteAccount(action) {
    try {
        const response = yield call(apiAuth.deleteAccount,action.payload)
        // console.log(response)
        yield put(deleteAccountSuccess(response.data.user))
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
export function* sagaDeleteAccount() {
    yield takeLatest(DELETE_ACCOUNT, fetchDeleteAccount)
}