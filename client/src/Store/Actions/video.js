import {
    CREATE_VIDEO_REQUEST,
    CREATE_VIDEO_SUCCESS,
    GET_VIDEO,
    SAVE_VIDEO,
    DELETE_VIDEO,
    DETAIL_VIDEO,
    UPDATE_VIDEO_REQUEST,
    UPDATE_VIDEO_SUCCESS
} from '../Constants/video'

export function createVideoRequest(payload){
    return{
        type: CREATE_VIDEO_REQUEST,
        payload
    }
}
export function updateVideoSuccess(payload){
    return{
        type: UPDATE_VIDEO_REQUEST,
        payload
    }
}
export function updateVideoRequest(payload){
    return{
        type: UPDATE_VIDEO_REQUEST,
        payload
    }
}
export function createVideoSuccess(payload){
    return{
        type: CREATE_VIDEO_SUCCESS,
        payload
    }
}
export function getVideo(payload){
    return{
        type: GET_VIDEO,
        payload
    }
}
export function saveVideo(payload){
    return{
        type: SAVE_VIDEO,
        payload
    }
}
export function deleteVideo(payload){
    return{
        type: DELETE_VIDEO,
        payload
    }
}
export function detailVideo(payload){
    return{
        type: DETAIL_VIDEO,
        payload
    }
}