import { takeLatest, call, put } from 'redux-saga/effects'
import {
    CREATE_COMMENT,
    GET_COMMENT,
    GET_LIST_COMMENT,
    DELETE_COMMENT
} from '../Constants/comment'
import {
    saveComment,
    createCommentSuccess,
    getListCommentSuccess
} from '../Actions/comment'
import * as apiComment from '../../Api/comment'

function* fetchCreateComment(action) {
    try {
        const response = yield call(apiComment.createComment, action.payload)
        console.log(response)
        yield put(createCommentSuccess(response.data.comment))
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
export function* sagaCreateComment() {
    yield takeLatest(CREATE_COMMENT, fetchCreateComment)
}

function* fetchGetComment(action) {
    try {
        const response = yield call(apiComment.getComment, action.payload)
        console.log(response)
        yield put(saveComment(response.data.data))
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
export function* sagaGetComment() {
    yield takeLatest(GET_COMMENT, fetchGetComment)
}

function* fetchGetListComment() {
    try {
        const response = yield call(apiComment.getListComment)
        console.log(response)
        yield put(getListCommentSuccess(response.data.data))
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
export function* sagaGetListComment() {
    yield takeLatest(GET_LIST_COMMENT, fetchGetListComment)
}
function* fetchDeleteComment(action) {
    try {
        const response = yield call(apiComment.deleteComment,action.payload)
        console.log(response)
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
export function* sagaDeleteComment() {
    yield takeLatest(DELETE_COMMENT, fetchDeleteComment)
}