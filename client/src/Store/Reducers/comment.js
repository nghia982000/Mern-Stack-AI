import { INIT_STATE } from "../States/comment"
import {
    SAVE_COMMENT,
    CREATE_COMMENT_SUCCESS
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
        default:
            return state
    }
}