import { takeLatest, call, put } from 'redux-saga/effects'
import {
    GET_LIST_TEST_RESULT_REQUEST,
    CREATE_ACTIVE,
    GET_LIST_ACCTIVE
} from '../Constants/history'
import{
    getListTestResultSuccess,
    createActiveSuccess,
    saveListAcctive
} from '../Actions/history'
import * as apiHistory from '../../Api/history'

function* fetchGetListTestResult(action) {
    try {
        const response = yield call(apiHistory.getListTestResult, action.payload)
        console.log(response)
        yield put(getListTestResultSuccess(response.data.listResult))
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
export function* sagaGetListTestResult() {
    yield takeLatest(GET_LIST_TEST_RESULT_REQUEST, fetchGetListTestResult)
}

function* fetchGetListAcctive() {
    try {
        const response = yield call(apiHistory.getListAcctive)
        console.log(response)
        yield put(saveListAcctive(response.data.listAcctive))
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
export function* sagaGetListAcctive() {
    yield takeLatest(GET_LIST_ACCTIVE, fetchGetListAcctive)
}
function* fetchCreateActive({payload,resolve}) {
    try {
        const response = yield call(apiHistory.createActive, payload)
        resolve(response)
        yield put(createActiveSuccess(response.data.newPoint))
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
export function* sagaCreateActive() {
    yield takeLatest(CREATE_ACTIVE, fetchCreateActive)
}
