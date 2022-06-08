import {
    CREATE_VIDEO_REQUEST,
    CREATE_VIDEO_SUCCESS,
    GET_VIDEO,
    SAVE_VIDEO,
    DELETE_VIDEO,
    DETAIL_VIDEO,
    UPDATE_VIDEO_REQUEST,
    UPDATE_VIDEO_SUCCESS,
    CREATE_STATE,
    UPDATE_STATE,
} from '../Constants/video'

export function updateState(payload){
    return{
        type: UPDATE_STATE,
        payload
    }
}
export function createState(payload){
    return{
        type: CREATE_STATE,
        payload
    }
}
export const createVideoRequest = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: CREATE_VIDEO_REQUEST,
            payload, resolve
        })
    )
export function updateVideoSuccess(payload){
    return{
        type: UPDATE_VIDEO_SUCCESS,
        payload
    }
}
export const updateVideoRequest = (dispatch) => (payload) =>
    new Promise((resolve) =>
        dispatch({
            type: UPDATE_VIDEO_REQUEST,
            payload, resolve
        })
    )
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