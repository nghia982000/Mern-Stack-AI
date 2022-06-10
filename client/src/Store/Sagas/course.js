import { takeLatest, call, put } from 'redux-saga/effects'
import {
    LIST_COURSE,
    DELETE_COURSE,
    CREATE_COURSE,
    UPDATE_COURSE_REQUEST,
    FAVORITE_COURSE,
    GET_FAVORITE,
    DELETE_FAVORITE,
    BUY_COURSE_REQUEST,
    GET_BOUGHT_COURSE,
    SELECT_FIELD,
    SEARCH_COURSE
} from '../Constants/course'
import {
    saveCourse,
    updateCourseSuccess,
    saveFavorite,
    deleteFavoriteSuccess,
    favoriteCourseSuccess,
    buyCourseSuccess,
    saveBoughtCourse,
    createCourseSuccess
} from '../Actions/course'
import * as apiCourse from '../../Api/course'

function* fetchListCourse() {
    try {
        const response = yield call(apiCourse.fetchGetCourse)
        // console.log(response)
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
function* fetchSelectField(Actions) {
    try {
        const response = yield call(apiCourse.apiSelectField,Actions.payload)
        // console.log(response)
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
export function* sagaSelectField() {
    yield takeLatest(SELECT_FIELD, fetchSelectField)
}
function* fetchSearchCourse(Actions) {
    try {
        const response = yield call(apiCourse.apiSearchCourse,Actions.payload)
        // console.log(response)
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
export function* sagaSearchCourse() {
    yield takeLatest(SEARCH_COURSE, fetchSearchCourse)
}

function* fetchDeleteCourse(Actions) {
    try {
        const response = yield call(apiCourse.apiDeleteCourse,Actions.payload)
        // console.log(response)
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

function* fetchCreateCourse({payload,resolve}) {
    try {
        const response = yield call(apiCourse.apiCreateCourse,payload)
        resolve(response.data)
        yield put(createCourseSuccess(response.data.Course))
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
function* fetchUpdateCourse({payload,resolve}) {
    try {
        const response = yield call(apiCourse.apiUpdateCourse,payload)
        resolve(response.data)
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

function* fetchFavotiteCourse({ payload, resolve }) {
    try {
        const response = yield call(apiCourse.apiFavoriteCourse,payload)
        resolve(response.data)
        yield put(favoriteCourseSuccess(response.data.data))
    } catch (err) {
        console.log(err)
        if(err.response){
            console.log(err.response.data)
            resolve(err.response.data)
        }
        else{
            console.log({success:false,message:err.message})
            resolve(err.message)
        }
    }
}
export function* sagaFavoriteCourse() {
    yield takeLatest(FAVORITE_COURSE, fetchFavotiteCourse)
}

function* fetchGetFavotite(Actions) {
    try {
        const response = yield call(apiCourse.apiGetFavorite)
        // console.log(response)
        yield put(saveFavorite(response.data.data))
       
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
export function* sagaGetFavorite() {
    yield takeLatest(GET_FAVORITE, fetchGetFavotite)
}

function* fetchDeleteFavotite(Actions) {
    try {
        const response = yield call(apiCourse.apiDeleteFavorite,Actions.payload)
        // console.log(response.data.data)
        yield put(deleteFavoriteSuccess(response.data.data._id))
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
export function* sagaDeleteFavorite() {
    yield takeLatest(DELETE_FAVORITE, fetchDeleteFavotite)
}

function* fetchBuyCourse({ payload, resolve }) {
    try {
        const response = yield call(apiCourse.apiBuyCourse,payload)
        resolve(response.data)
        yield put(buyCourseSuccess(response.data))
    } catch (err) {
        console.log(err)
        if(err.response){
            console.log(err.response.data)
            resolve(err.response.data)
        }
        else{
            console.log({success:false,message:err.message})
            resolve(err.message)
        }
    }
}
export function* sagaBuyCourse() {
    yield takeLatest(BUY_COURSE_REQUEST, fetchBuyCourse)
}

function* fetchGetBoughtCourse(Actions) {
    try {
        const response = yield call(apiCourse.apiGetBoughtCourse)
        // console.log(response)
        yield put(saveBoughtCourse(response.data.data))
       
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
export function* sagaGetBoughtCourse() {
    yield takeLatest(GET_BOUGHT_COURSE, fetchGetBoughtCourse)
}