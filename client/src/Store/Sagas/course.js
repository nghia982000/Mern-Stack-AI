import { takeLatest, call, put } from 'redux-saga/effects'
import {
    LIST_COURSE,
    DELETE_COURSE,
    CREATE_COURSE,
    UPDATE_COURSE_REQUEST
} from '../Constants/course'
import {
    saveCourse,
    updateCourseSuccess
} from '../Actions/course'
import * as apiCourse from '../../Api/course'

function* fetchListCourse() {
    try {
        const response = yield call(apiCourse.fetchGetCourse)
        console.log(response)
        yield put(saveCourse(response.data))
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
export function* sagaListCourse() {
    yield takeLatest(LIST_COURSE, fetchListCourse)
}

function* fetchDeleteCourse(Actions) {
    try {
        const response = yield call(apiCourse.apiDeleteCourse,Actions.payload)
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
export function* sagaDeleteCourse() {
    yield takeLatest(DELETE_COURSE, fetchDeleteCourse)
}

function* fetchCreateCourse(Actions) {
    try {
        const response = yield call(apiCourse.apiCreateCourse,Actions.payload)
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
export function* sagaCreateCourse() {
    yield takeLatest(CREATE_COURSE, fetchCreateCourse)
}
function* fetchUpdateCourse(Actions) {
    try {
        const response = yield call(apiCourse.apiUpdateCourse,Actions.payload)
        console.log(response)
        yield put(updateCourseSuccess(response.data.course))
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
export function* sagaUpdateCourse() {
    yield takeLatest(UPDATE_COURSE_REQUEST, fetchUpdateCourse)
}