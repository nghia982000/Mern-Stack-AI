import {
    CREATE_COMMENT,
    GET_COMMENT,
    SAVE_COMMENT,
    CREATE_COMMENT_SUCCESS
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