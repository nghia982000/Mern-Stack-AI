import { INIT_STATE } from "../States/course"
import {
    SAVE_COURSE,
    DELETE_COURSE,
    UPDATE_COURSE_SUCCESS,
    DETAIL_COURSE,
    CREATE_STATE,
    UPDATE_STATE,
    SAVE_FAVORITE,
    DELETE_FAVORITE_SUCCESS,
    FAVORITE_COURSE_SUCCESS,
    SAVE_BOUGHT_COURSE,
    BUY_COURSE_SUCCESS,
    CREATE_COURSE_SUCCESS,
    STATISTICAL_SUCCESS
} from '../Constants/course'
import {
    CHECKLOGINFAILURE
} from '../Constants/auth'
import produce from "immer"

export default function courseReducers(state = INIT_STATE, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case SAVE_COURSE:
                draft.data = action.payload.data
                draft.listField=action.payload.listField
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
            case SAVE_FAVORITE:
                draft.favorite = action.payload
                break
            case DELETE_FAVORITE_SUCCESS:
                draft.favorite = state.favorite.filter(course => course._id !== action.payload)
                break
            case FAVORITE_COURSE_SUCCESS:
                const newArr = [...state.favorite]
                newArr.push(action.payload)
                draft.favorite = newArr
                break
            case CHECKLOGINFAILURE:
                draft.favorite = []
                draft.course = []
                break
            case SAVE_BOUGHT_COURSE:
                draft.course = action.payload
                break
            case BUY_COURSE_SUCCESS:
                const newArrCourse = [...state.course]
                newArrCourse.push(action.payload.data)
                draft.course = newArrCourse
                break
            case CREATE_COURSE_SUCCESS:
                const newCourse = [action.payload,...state.data]
                console.log(newCourse)
                draft.data = newCourse
                break
            case STATISTICAL_SUCCESS:
                draft.statistical = action.payload
                break
            default:
                return state
        }
    })
}