import { takeLatest, call, put } from 'redux-saga/effects'
import {
    CREATE_VIDEO_REQUEST,
    GET_VIDEO,
    DELETE_VIDEO,
    UPDATE_VIDEO_REQUEST
} from '../Constants/video'
import {
    createVideoSuccess,
    saveVideo,
    updateVideoSuccess
} from '../Actions/video'
import * as apiVideo from '../../Api/video'

function* fetchCreateVideoSaga(action) {
    try {
        const response = yield call(apiVideo.apiCreateVideo, action.payload)
        console.log(response)
        yield put(createVideoSuccess(response.data))
    } catch (err) {
        console.error(err)
        if (err.response) {
            console.log(err.response.data)
            alert(err.response.data.message)
        }
        else {
            console.log({ success: false, message: err.message })
            alert(err.message)
        }
    }
}
export function* sagaCreateVideo() {
    yield takeLatest(CREATE_VIDEO_REQUEST, fetchCreateVideoSaga)
}
function* fetchGetVideoSaga(action) {
    try {
        const response = yield call(apiVideo.apiGetVideo,action.payload)
        console.log(response)
        yield put(saveVideo(response.data))
    } catch (err) {
        console.error(err)
        if (err.response) {
            console.log(err.response.data)
            alert(err.response.data.message)
        }
        else {
            console.log({ success: false, message: err.message })
            alert(err.message)
        }
    }
}
export function* sagaGetVideo() {
    yield takeLatest(GET_VIDEO, fetchGetVideoSaga)
}

function* fetchDeleteVideo(Actions) {
    try {
        const response = yield call(apiVideo.apiDeleteVideo,Actions.payload)
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
export function* sagaDeleteVideo() {
    yield takeLatest(DELETE_VIDEO, fetchDeleteVideo)
}
function* fetchUpdateVideo(Actions) {
    try {
        const response = yield call(apiVideo.apiUpdateVideo,Actions.payload)
        console.log(response)
        // yield put(updateVideoSuccess(response.data.video))
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
export function* sagaUpdateVideo() {
    yield takeLatest(UPDATE_VIDEO_REQUEST, fetchUpdateVideo)
}