import {
    CREATE_COMMENT,
    GET_COMMENT,
    SAVE_COMMENT,
    CREATE_COMMENT_SUCCESS,
    GET_LIST_COMMENT,
    GET_LIST_COMMENT_SUCCESS,
    DELETE_COMMENT
} from '../Constants/comment'

export function createComment(payload){
    return{
        type: CREATE_COMMENT,
        payload
    }
}
export function getComment(payload){
    return{
        type: GET_COMMENT,
        payload
    }
}
export function saveComment(payload){
    return{
        type: SAVE_COMMENT,
        payload
    }
}
export function createCommentSuccess(payload){
    return{
        type: CREATE_COMMENT_SUCCESS,
        payload
    }
}
export function getListComment(payload){
    return{
        type: GET_LIST_COMMENT,
        payload
    }
}
export function getListCommentSuccess(payload){
    return{
        type: GET_LIST_COMMENT_SUCCESS,
        payload
    }
}
export function deleteComment(payload){
    return{
        type: DELETE_COMMENT,
        payload
    }
}