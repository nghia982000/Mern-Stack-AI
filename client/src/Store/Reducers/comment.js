import { INIT_STATE } from "../States/comment"
import {
    SAVE_COMMENT,
    CREATE_COMMENT_SUCCESS,
    GET_LIST_COMMENT_SUCCESS,
    DELETE_COMMENT
} from '../Constants/comment'

export default function commentReducers(state=INIT_STATE,action){
    switch (action.type){
        case SAVE_COMMENT:
            return {
                ...state,
                listComment:action.payload.reverse()
            }
        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                listComment:[action.payload,...state.listComment]
            }
        case GET_LIST_COMMENT_SUCCESS:
            return {
                ...state,
                listCommentAll:action.payload
            }
        case DELETE_COMMENT:
            return {
                ...state,
                listCommentAll:state.listCommentAll.filter(comment => comment._id !== action.payload)
            }
        default:
            return state
    }
}