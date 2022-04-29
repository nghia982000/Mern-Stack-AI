import { INIT_STATE } from "../States/course"
import {
    SAVE_COURSE,
    DELETE_COURSE,
    UPDATE_COURSE_SUCCESS,
    DETAIL_COURSE,
    CREATE_STATE,
    UPDATE_STATE,
} from '../Constants/course'
import produce from "immer"

export default function courseReducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SAVE_COURSE:
                draft.data = action.payload.data
                break
            case DELETE_COURSE:
                draft.data = state.data.filter(course => course._id !== action.payload)
                break
            case DETAIL_COURSE:
                draft.detailCourse = state.data.find((item) => (item._id === action.payload))
                break
            case UPDATE_COURSE_SUCCESS:
                draft.data = state.data.map(item => (
                    item._id === action.payload._id ? action.payload : item
                ))
                break
            case CREATE_STATE:
                draft.editState.create = action.payload
                break
            case UPDATE_STATE:
                draft.editState.update = action.payload
                break
            default:
                return state
        }
    })
}