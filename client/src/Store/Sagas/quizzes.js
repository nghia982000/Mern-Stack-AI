import { takeLatest, call, put } from 'redux-saga/effects'
import {
    CREATE_QUIZZES,
    UPDATE_QUIZZES_REQUEST,
    CREATE_QUESTION,
    UPDATE_QUESTION_REQUEST,
    GET_QUESTION_REQUEST,
    DELETE_QUESTION,
    TEST_RESULT
} from '../Constants/quizzes'
import {
    updateQuizzesSuccess,
    createQuizzesSuccess,
    updateQuestionSuccess,
    createQuestionSuccess,
    getQuestionSuccess,
    
} from '../Actions/quizzes'
import * as apiQuizzes from '../../Api/quizzes'

function* fetchCreateQuizzes({payload,resolve}) {
    try {
        const response = yield call(apiQuizzes.createQuizzes, payload)
        resolve(response.data)
        yield put(createQuizzesSuccess(response.data.quizzes))
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
export function* sagaCreateQuizzes() {
    yield takeLatest(CREATE_QUIZZES, fetchCreateQuizzes)
}
function* fetchUpdateQuizzes({payload,resolve}) {
    try {
        const response = yield call(apiQuizzes.updateQuizzes,payload)
        resolve(response.data)
        yield put(updateQuizzesSuccess(response.data.quizzes))
    } catch (err) {
        console.log(err)
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
export function* sagaUpdateQuizzes() {
    yield takeLatest(UPDATE_QUIZZES_REQUEST, fetchUpdateQuizzes)
}
function* fetchCreateQuestion({payload,resolve}) {
    try {
        const response = yield call(apiQuizzes.createQuestion, payload)
        resolve(response.data)
        yield put(createQuestionSuccess(response.data.quizzes))
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
export function* sagaCreateQuestion() {
    yield takeLatest(CREATE_QUESTION, fetchCreateQuestion)
}
function* fetchUpdateQuestion({payload,resolve}) {
    try {
        const response = yield call(apiQuizzes.updateQuestion,payload)
        resolve(response.data)
        yield put(updateQuestionSuccess(response.data.quizzes))
    } catch (err) {
        console.log(err)
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
export function* sagaUpdateQuestion() {
    yield takeLatest(UPDATE_QUESTION_REQUEST, fetchUpdateQuestion)
}
function* fetchGetQuestion(Actions) {
    try {
        console.log(Actions.payload)
        const response = yield call(apiQuizzes.getQuestion,Actions.payload)
        console.log(response)
        yield put(getQuestionSuccess(response.data.data))
    } catch (err) {
        console.log(err)
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
export function* sagaGetQuestion() {
    yield takeLatest(GET_QUESTION_REQUEST, fetchGetQuestion)
}
function* fetchDeleteQuestion(Actions) {
    try {
        console.log(Actions.payload)
        const response = yield call(apiQuizzes.deleteQuestion,Actions.payload)
        console.log(response)
    } catch (err) {
        console.log(err)
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
export function* sagaDeleteQuestion() {
    yield takeLatest(DELETE_QUESTION, fetchDeleteQuestion)
}
function* fetchTestResult({ payload, resolve }) {
    try {
        console.log(payload)
        const response = yield call(apiQuizzes.testResult,payload)
        resolve(response)
    } catch (err) {
        console.log(err)
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
export function* sagaTestResult() {
    yield takeLatest(TEST_RESULT, fetchTestResult)
}

